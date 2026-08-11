"""todo-ledger store — markdown ledgers with CAS versioning and item claims.

Design:
- Each ledger is a plain markdown file at ``<data_dir>/ledgers/<id>.md``.
- Metadata (name, version, timestamps, session pins) lives in
  ``<data_dir>/registry.json``.
- ALL read-modify-write goes through one ``flock``-guarded critical section so
  the gateway routes (in-process) and the agent CLI (separate process) can
  mutate concurrently without racing.
- Optimistic concurrency: every ledger carries a monotonic ``version``. Writes
  supply ``base_version``; a mismatch raises :class:`VersionConflict` carrying
  the current server state (HTTP layer maps it to 409).
- Items are GFM task-list lines (``- [ ] text`` / ``- [x] text``). Agent claims
  annotate the line with an HTML comment marker ``<!-- claim:<worker> -->`` so
  the claim state lives *in the markdown itself* (portable, human-visible,
  survives export).

Pure stdlib; compatible with Python 3.8+.
"""
from __future__ import annotations

import fcntl
import json
import os
import re
import time
import uuid
from pathlib import Path
from typing import Any, Dict, List, Optional

MAX_NAME_LEN = 500
MAX_CONTENT_LEN = 50_000
ID_RE = re.compile(r"^[0-9a-f]{12}$")
# GFM task-list item: optional indent, -/*/+ bullet, [ ]/[x]/[X]
CHECKBOX_RE = re.compile(r"^(\s*[-*+]\s+)\[( |x|X)\]\s?(.*)$")
CLAIM_RE = re.compile(r"\s*<!--\s*claim:([A-Za-z0-9._\-]{1,120})\s*-->\s*$")


class LedgerError(Exception):
    """Base class; ``status`` maps to the HTTP layer."""

    status = 400

    def __init__(self, message: str, payload: Optional[Dict[str, Any]] = None):
        super().__init__(message)
        self.payload = payload or {}


class NotFound(LedgerError):
    status = 404


class VersionConflict(LedgerError):
    status = 409


class StaleLine(LedgerError):
    status = 409


def _now() -> float:
    return time.time()


def _new_id() -> str:
    return uuid.uuid4().hex[:12]


class LedgerStore:
    """Filesystem-backed ledger store. One instance per data_dir; safe to
    instantiate per-request (all state is on disk, guarded by flock)."""

    def __init__(self, data_dir: Path):
        self.data_dir = Path(data_dir)
        self.ledgers_dir = self.data_dir / "ledgers"
        self.registry_path = self.data_dir / "registry.json"
        self.lock_path = self.data_dir / ".lock"
        self.ledgers_dir.mkdir(parents=True, exist_ok=True)

    # -- locking ------------------------------------------------------------

    def _locked(self):
        store = self

        class _Lock:
            def __enter__(self_inner):
                self_inner.fh = open(store.lock_path, "a+")
                fcntl.flock(self_inner.fh.fileno(), fcntl.LOCK_EX)
                return self_inner

            def __exit__(self_inner, *exc):
                fcntl.flock(self_inner.fh.fileno(), fcntl.LOCK_UN)
                self_inner.fh.close()
                return False

        return _Lock()

    # -- registry / files ---------------------------------------------------

    def _read_registry(self) -> Dict[str, Any]:
        try:
            with open(self.registry_path, encoding="utf-8") as f:
                data = json.load(f)
            return data if isinstance(data, dict) else {}
        except (FileNotFoundError, json.JSONDecodeError):
            return {}

    def _write_registry(self, reg: Dict[str, Any]) -> None:
        tmp = self.registry_path.with_suffix(".json.tmp")
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(reg, f, indent=1, sort_keys=True)
        os.replace(tmp, self.registry_path)

    def _md_path(self, ledger_id: str) -> Path:
        if not ID_RE.match(ledger_id):
            raise LedgerError("invalid ledger id")
        p = (self.ledgers_dir / (ledger_id + ".md")).resolve()
        if self.ledgers_dir.resolve() not in p.parents:
            raise LedgerError("invalid ledger path")
        return p

    def _read_md(self, ledger_id: str) -> str:
        try:
            with open(self._md_path(ledger_id), encoding="utf-8") as f:
                return f.read()
        except FileNotFoundError:
            raise NotFound("ledger not found")

    def _write_md(self, ledger_id: str, content: str) -> None:
        p = self._md_path(ledger_id)
        tmp = p.with_suffix(".md.tmp")
        with open(tmp, "w", encoding="utf-8") as f:
            f.write(content)
        os.replace(tmp, p)

    # -- derived stats --------------------------------------------------------

    @staticmethod
    def stats(content: str) -> Dict[str, int]:
        total = done = claimed = 0
        for line in content.split("\n"):
            m = CHECKBOX_RE.match(line)
            if not m:
                continue
            total += 1
            if m.group(2) in ("x", "X"):
                done += 1
            elif CLAIM_RE.search(m.group(3)):
                claimed += 1
        return {"items_total": total, "items_done": done, "items_claimed": claimed}

    def _meta(self, ledger_id: str, entry: Dict[str, Any], content: str) -> Dict[str, Any]:
        out = {
            "id": ledger_id,
            "name": entry.get("name", "Untitled ledger"),
            "version": int(entry.get("version", 1)),
            "created_at": entry.get("created_at"),
            "updated_at": entry.get("updated_at"),
            "pinned_sessions": list(entry.get("pinned_sessions", [])),
        }
        out.update(self.stats(content))
        return out

    # -- public API -----------------------------------------------------------

    def list(self) -> List[Dict[str, Any]]:
        with self._locked():
            reg = self._read_registry()
            out = []
            for lid, entry in reg.items():
                try:
                    content = self._read_md(lid)
                except NotFound:
                    continue
                out.append(self._meta(lid, entry, content))
            out.sort(key=lambda m: m.get("updated_at") or 0, reverse=True)
            return out

    def create(self, name: str, content: str = "") -> Dict[str, Any]:
        name = (name or "").strip() or "Untitled ledger"
        if len(name) > MAX_NAME_LEN:
            raise LedgerError("name too long")
        if len(content) > MAX_CONTENT_LEN:
            raise LedgerError("content too long")
        with self._locked():
            reg = self._read_registry()
            lid = _new_id()
            while lid in reg:  # pragma: no cover — uuid collision
                lid = _new_id()
            now = _now()
            reg[lid] = {
                "name": name,
                "version": 1,
                "created_at": now,
                "updated_at": now,
                "pinned_sessions": [],
            }
            self._write_md(lid, content)
            self._write_registry(reg)
            return self._meta(lid, reg[lid], content)

    def get(self, ledger_id: str) -> Dict[str, Any]:
        with self._locked():
            reg = self._read_registry()
            if ledger_id not in reg:
                raise NotFound("ledger not found")
            content = self._read_md(ledger_id)
            meta = self._meta(ledger_id, reg[ledger_id], content)
            meta["content"] = content
            return meta

    def update(
        self,
        ledger_id: str,
        base_version: int,
        content: Optional[str] = None,
        name: Optional[str] = None,
    ) -> Dict[str, Any]:
        if content is not None and len(content) > MAX_CONTENT_LEN:
            raise LedgerError("content too long")
        if name is not None:
            name = name.strip()
            if not name or len(name) > MAX_NAME_LEN:
                raise LedgerError("invalid name")
        with self._locked():
            reg = self._read_registry()
            if ledger_id not in reg:
                raise NotFound("ledger not found")
            entry = reg[ledger_id]
            cur = self._read_md(ledger_id)
            if int(base_version) != int(entry.get("version", 1)):
                raise VersionConflict(
                    "version conflict",
                    {"content": cur, "version": int(entry.get("version", 1))},
                )
            if content is not None:
                self._write_md(ledger_id, content)
                cur = content
            if name is not None:
                entry["name"] = name
            entry["version"] = int(entry.get("version", 1)) + 1
            entry["updated_at"] = _now()
            self._write_registry(reg)
            return self._meta(ledger_id, entry, cur)

    def delete(self, ledger_id: str) -> None:
        with self._locked():
            reg = self._read_registry()
            if ledger_id not in reg:
                raise NotFound("ledger not found")
            del reg[ledger_id]
            try:
                os.unlink(self._md_path(ledger_id))
            except FileNotFoundError:
                pass
            self._write_registry(reg)

    def append_item(self, ledger_id: str, text: str) -> Dict[str, Any]:
        """Append ``- [ ] text`` (capture-from-anywhere hot path)."""
        text = (text or "").strip()
        if not text or "\n" in text or len(text) > 1000:
            raise LedgerError("invalid item text")
        with self._locked():
            reg = self._read_registry()
            if ledger_id not in reg:
                raise NotFound("ledger not found")
            cur = self._read_md(ledger_id)
            new = (cur.rstrip("\n") + "\n" if cur.strip() else "") + "- [ ] " + text + "\n"
            if len(new) > MAX_CONTENT_LEN:
                raise LedgerError("content too long")
            self._write_md(ledger_id, new)
            entry = reg[ledger_id]
            entry["version"] = int(entry.get("version", 1)) + 1
            entry["updated_at"] = _now()
            self._write_registry(reg)
            return self._meta(ledger_id, entry, new)

    # -- line-level ops (toggle / claim / transition) ---------------------------

    def _edit_line(self, ledger_id: str, line_idx: int, expected: str, fn) -> Dict[str, Any]:
        """Atomically rewrite one line. ``expected`` is the staleness guard:
        the current line must match exactly, else StaleLine(409)."""
        with self._locked():
            reg = self._read_registry()
            if ledger_id not in reg:
                raise NotFound("ledger not found")
            cur = self._read_md(ledger_id)
            lines = cur.split("\n")
            if not (0 <= line_idx < len(lines)):
                raise LedgerError("line out of range")
            if lines[line_idx] != expected:
                raise StaleLine(
                    "line changed",
                    {"content": cur, "version": int(reg[ledger_id].get("version", 1))},
                )
            new_line = fn(lines[line_idx])
            lines[line_idx] = new_line
            new = "\n".join(lines)
            self._write_md(ledger_id, new)
            entry = reg[ledger_id]
            entry["version"] = int(entry.get("version", 1)) + 1
            entry["updated_at"] = _now()
            self._write_registry(reg)
            meta = self._meta(ledger_id, entry, new)
            meta["line"] = line_idx
            meta["new_text"] = new_line
            return meta

    def toggle(self, ledger_id: str, line_idx: int, expected: str) -> Dict[str, Any]:
        def _flip(line: str) -> str:
            m = CHECKBOX_RE.match(line)
            if not m:
                raise LedgerError("line is not a checkbox item")
            mark = " " if m.group(2) in ("x", "X") else "x"
            return "%s[%s] %s" % (m.group(1), mark, m.group(3))

        return self._edit_line(ledger_id, line_idx, expected, _flip)

    def claim(self, ledger_id: str, worker: str, max_items: int = 3) -> Dict[str, Any]:
        """Atomically claim up to ``max_items`` unclaimed, unchecked items for
        ``worker``. Server-side claim = two sessions can never grab the same
        item. Returns the claimed items (line index + text)."""
        worker = (worker or "").strip()
        if not re.match(r"^[A-Za-z0-9._\-]{1,120}$", worker):
            raise LedgerError("invalid worker id")
        max_items = max(1, min(int(max_items or 3), 10))
        with self._locked():
            reg = self._read_registry()
            if ledger_id not in reg:
                raise NotFound("ledger not found")
            cur = self._read_md(ledger_id)
            lines = cur.split("\n")
            claimed = []
            for i, line in enumerate(lines):
                if len(claimed) >= max_items:
                    break
                m = CHECKBOX_RE.match(line)
                if not m or m.group(2) in ("x", "X") or CLAIM_RE.search(m.group(3)):
                    continue
                lines[i] = line.rstrip() + " <!-- claim:%s -->" % worker
                claimed.append({"line": i, "text": lines[i], "item": m.group(3).strip()})
            if claimed:
                new = "\n".join(lines)
                self._write_md(ledger_id, new)
                entry = reg[ledger_id]
                entry["version"] = int(entry.get("version", 1)) + 1
                entry["updated_at"] = _now()
                self._write_registry(reg)
            meta = self._meta(ledger_id, reg[ledger_id], "\n".join(lines))
            meta["claimed"] = claimed
            return meta

    def transition(
        self, ledger_id: str, line_idx: int, expected: str, action: str, note: str = ""
    ) -> Dict[str, Any]:
        """done: check the box and drop the claim marker.
        release: drop the claim marker (back to unclaimed).
        blocked: keep claim, append a ⛔ note."""
        if action not in ("done", "release", "blocked"):
            raise LedgerError("invalid action")
        note = (note or "").strip().replace("\n", " ")[:300]

        def _apply(line: str) -> str:
            m = CHECKBOX_RE.match(line)
            if not m:
                raise LedgerError("line is not a checkbox item")
            body = CLAIM_RE.sub("", m.group(3)).rstrip()
            if action == "done":
                out = "%s[x] %s" % (m.group(1), body)
                if note:
                    out += " — %s" % note
                return out
            if action == "release":
                out = "%s[ ] %s" % (m.group(1), body)
                if note:
                    out += " (released: %s)" % note
                return out
            # blocked — keep the claim marker so nobody else grabs it
            keep = CLAIM_RE.search(m.group(3))
            out = "%s[ ] %s ⛔ %s" % (m.group(1), body, note or "blocked")
            if keep:
                out += " <!-- claim:%s -->" % keep.group(1)
            return out

        return self._edit_line(ledger_id, line_idx, expected, _apply)

    def set_pin(self, ledger_id: str, session: str, pinned: bool) -> Dict[str, Any]:
        session = (session or "").strip()[:200]
        if not session:
            raise LedgerError("invalid session")
        with self._locked():
            reg = self._read_registry()
            if pinned:
                if ledger_id not in reg:
                    raise NotFound("ledger not found")
                # a session pins at most one ledger — unpin it everywhere else
                for entry in reg.values():
                    pins = entry.setdefault("pinned_sessions", [])
                    if session in pins:
                        pins.remove(session)
                reg[ledger_id].setdefault("pinned_sessions", []).append(session)
            else:
                for entry in reg.values():
                    pins = entry.setdefault("pinned_sessions", [])
                    if session in pins:
                        pins.remove(session)
            self._write_registry(reg)
            if ledger_id in reg:
                content = self._read_md(ledger_id)
                return self._meta(ledger_id, reg[ledger_id], content)
            return {"ok": True}
