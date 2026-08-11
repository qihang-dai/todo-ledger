#!/usr/bin/env python3
"""One-shot importer: MeshClaw core-patch ledgers → todo-ledger app store.

Reads ``~/.meshclaw/ledgers/registry.json`` + ``<id>.md`` files (the format of
the feat/ledgers core patch) and creates equivalent ledgers in the app store.
Idempotent by name: skips any ledger whose name already exists in the app.

Usage: python3 tools/import_meshclaw_ledgers.py [--src DIR] [--dry-run]
Target dir resolution matches the CLI ($TODO_LEDGER_DATA_DIR or conventions).
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from backend.store import LedgerStore  # noqa: E402
from cli.ledger import _data_dir  # noqa: E402


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default="~/.meshclaw/ledgers")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    src = Path(args.src).expanduser()
    reg_path = src / "registry.json"
    if not reg_path.exists():
        print("no source registry at %s — nothing to import" % reg_path)
        return 0
    try:
        raw = json.loads(reg_path.read_text(encoding="utf-8"))
    except ValueError as exc:
        print("cannot parse %s: %s" % (reg_path, exc))
        return 1
    # core-patch format: list of {id, title, ...}; accept dict form too
    if isinstance(raw, list):
        reg = {e["id"]: e for e in raw if isinstance(e, dict) and e.get("id")}
    else:
        reg = raw

    store = LedgerStore(_data_dir())
    existing = {m["name"] for m in store.list()}
    imported = skipped = 0
    for lid, entry in reg.items():
        name = (entry.get("title") or entry.get("name") or "Untitled ledger").strip()
        md = src / (lid + ".md")
        if not md.exists():
            print("skip %s (%s): missing md file" % (lid, name))
            continue
        if name in existing:
            print("skip %-30s — already imported" % name)
            skipped += 1
            continue
        content = md.read_text(encoding="utf-8")
        if args.dry_run:
            print("would import %-30s (%d bytes)" % (name, len(content)))
        else:
            meta = store.create(name, content)
            print("imported %-30s → %s (%d items, %d done)" % (
                name, meta["id"], meta["items_total"], meta["items_done"]))
        imported += 1
    print("\n%d imported, %d skipped (target: %s)" % (imported, skipped, _data_dir()))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
