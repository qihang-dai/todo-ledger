#!/usr/bin/env python3
"""Smoke test for todo-ledger store + CLI. Run: python3 tests/smoke.py"""
from __future__ import annotations

import concurrent.futures
import json
import subprocess
import sys
import tempfile
from pathlib import Path

APP = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(APP))
from backend.store import LedgerStore, StaleLine, VersionConflict  # noqa: E402

CHECKS = []


def check(name, cond):
    CHECKS.append((name, bool(cond)))
    print(("PASS " if cond else "FAIL ") + name)


def main():
    tmp = Path(tempfile.mkdtemp(prefix="todo-ledger-smoke-"))
    s = LedgerStore(tmp)

    # create / list / get
    m = s.create("Smoke ledger", "# Smoke\n\n- [ ] alpha\n- [ ] beta\n- [x] gamma\n")
    lid = m["id"]
    check("create returns stats", m["items_total"] == 3 and m["items_done"] == 1)
    check("list has 1", len(s.list()) == 1)
    g = s.get(lid)
    check("get content roundtrip", "- [ ] alpha" in g["content"] and g["version"] == 1)

    # CAS update: ok then conflict
    m2 = s.update(lid, 1, content=g["content"] + "- [ ] delta\n")
    check("update bumps version", m2["version"] == 2 and m2["items_total"] == 4)
    try:
        s.update(lid, 1, content="clobber")
        check("stale update rejected", False)
    except VersionConflict as e:
        check("stale update rejected", "delta" in e.payload["content"] and e.payload["version"] == 2)

    # toggle with staleness guard
    cur = s.get(lid)["content"].split("\n")
    idx = next(i for i, l in enumerate(cur) if l == "- [ ] alpha")
    t = s.toggle(lid, idx, "- [ ] alpha")
    check("toggle flips", t["new_text"] == "- [x] alpha" and t["items_done"] == 2)
    try:
        s.toggle(lid, idx, "- [ ] alpha")
        check("stale toggle rejected", False)
    except StaleLine:
        check("stale toggle rejected", True)

    # claim atomicity: two workers race, no overlap
    s2 = LedgerStore(tmp)
    with concurrent.futures.ThreadPoolExecutor(2) as ex:
        r1 = ex.submit(s.claim, lid, "worker-A", 10)
        r2 = ex.submit(s2.claim, lid, "worker-B", 10)
        c1, c2 = r1.result(), r2.result()
    got1 = {c["line"] for c in c1["claimed"]}
    got2 = {c["line"] for c in c2["claimed"]}
    check("claims don't overlap", not (got1 & got2))
    check("all open items claimed once", len(got1 | got2) == 2)  # beta + delta open

    # re-claim finds nothing
    check("re-claim empty", s.claim(lid, "worker-C", 10)["claimed"] == [])

    # transition: done strips claim + checks box
    any_claim = (c1["claimed"] or c2["claimed"])[0]
    d = s.transition(lid, any_claim["line"], any_claim["text"], "done", "did it")
    check("done strips claim", "claim:" not in d["new_text"] and d["new_text"].lstrip().startswith("- [x]"))

    # transition: release restores unclaimed
    other = (c2["claimed"] or c1["claimed"])
    other = [c for c in other if c["line"] != any_claim["line"]][0] if len(got1 | got2) > 1 else None
    if other:
        r = s.transition(lid, other["line"], other["text"], "release", "not safe")
        check("release restores [ ] unclaimed", "claim:" not in r["new_text"] and "- [ ]" in r["new_text"])
        check("released is re-claimable", len(s.claim(lid, "worker-D", 10)["claimed"]) == 1)

    # pin exclusivity
    s.set_pin(lid, "chat-1", True)
    m3 = s.create("Second", "")
    s.set_pin(m3["id"], "chat-1", True)
    check("pin moves (one ledger per session)",
          "chat-1" not in s.get(lid)["pinned_sessions"] and "chat-1" in s.get(m3["id"])["pinned_sessions"])

    # append + delete
    a = s.append_item(m3["id"], "quick capture")
    check("append", a["items_total"] == 1)
    s.delete(m3["id"])
    check("delete", len(s.list()) == 1)

    # bad ids rejected (traversal)
    for bad in ("../../etc", "abc", "ABCDEF123456"):
        try:
            s.get(bad)
            check("bad id rejected: " + bad, False)
        except Exception:
            check("bad id rejected: " + bad, True)

    # CLI end-to-end against the same dir
    env = {"TODO_LEDGER_DATA_DIR": str(tmp), "PATH": "/usr/bin:/bin"}
    out = subprocess.run(
        [sys.executable, str(APP / "cli" / "ledger.py"), "list"],
        capture_output=True, text=True, env=env,
    )
    check("CLI list works", out.returncode == 0 and json.loads(out.stdout)[0]["id"] == lid)
    out = subprocess.run(
        [sys.executable, str(APP / "cli" / "ledger.py"), "add", lid, "from the CLI"],
        capture_output=True, text=True, env=env,
    )
    check("CLI add works", out.returncode == 0 and json.loads(out.stdout)["items_total"] == 5)

    failed = [n for n, ok in CHECKS if not ok]
    print("\n%d/%d passed" % (len(CHECKS) - len(failed), len(CHECKS)))
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
