#!/usr/bin/env python3
"""todo-ledger CLI — how agent sessions read, claim, and complete items.

Operates directly on the app's data directory through the same flock-guarded
:class:`backend.store.LedgerStore` the gateway routes use, so any number of
agent sessions and the dashboard UI can work one list concurrently without
races. No HTTP, no credentials — the safe concurrency lives in the store.

Usage (all output is JSON):
  ledger.py list
  ledger.py get <ledger_id>
  ledger.py create <name> [--content-file FILE]
  ledger.py add <ledger_id> "item text"
  ledger.py claim <ledger_id> --worker <session-or-agent-id> [--max 3]
  ledger.py done <ledger_id> --line N --expected "exact current line" [--note ...]
  ledger.py release <ledger_id> --line N --expected "..." [--note ...]
  ledger.py blocked <ledger_id> --line N --expected "..." --note "why"
  ledger.py toggle <ledger_id> --line N --expected "..."

Data dir resolution: $TODO_LEDGER_DATA_DIR, else the first existing of
~/.kiro/crew/apps/todo-ledger/data, ~/.meshclaw/apps/todo-ledger/data.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from backend.store import LedgerError, LedgerStore  # noqa: E402

_CANDIDATES = (
    "~/.kiro/crew/apps/todo-ledger/data",
    "~/.meshclaw/apps/todo-ledger/data",
)


def _data_dir() -> Path:
    env = os.environ.get("TODO_LEDGER_DATA_DIR")
    if env:
        return Path(env).expanduser()
    for cand in _CANDIDATES:
        p = Path(cand).expanduser()
        if p.is_dir():
            return p
    # default to the first convention; store creates it
    return Path(_CANDIDATES[0]).expanduser()


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(prog="ledger.py", description=__doc__)
    sub = ap.add_subparsers(dest="cmd", required=True)

    sub.add_parser("list")

    p = sub.add_parser("get")
    p.add_argument("ledger_id")

    p = sub.add_parser("create")
    p.add_argument("name")
    p.add_argument("--content-file", default=None)

    p = sub.add_parser("add")
    p.add_argument("ledger_id")
    p.add_argument("text")

    p = sub.add_parser("claim")
    p.add_argument("ledger_id")
    p.add_argument("--worker", required=True)
    p.add_argument("--max", type=int, default=3)

    for name in ("done", "release", "blocked", "toggle"):
        p = sub.add_parser(name)
        p.add_argument("ledger_id")
        p.add_argument("--line", type=int, required=True)
        p.add_argument("--expected", required=True)
        if name != "toggle":
            p.add_argument("--note", default="")

    args = ap.parse_args(argv)
    store = LedgerStore(_data_dir())

    try:
        if args.cmd == "list":
            out = store.list()
        elif args.cmd == "get":
            out = store.get(args.ledger_id)
        elif args.cmd == "create":
            content = ""
            if args.content_file:
                content = Path(args.content_file).read_text(encoding="utf-8")
            out = store.create(args.name, content)
        elif args.cmd == "add":
            out = store.append_item(args.ledger_id, args.text)
        elif args.cmd == "claim":
            out = store.claim(args.ledger_id, args.worker, args.max)
        elif args.cmd == "toggle":
            out = store.toggle(args.ledger_id, args.line, args.expected)
        else:  # done / release / blocked
            out = store.transition(
                args.ledger_id, args.line, args.expected, args.cmd, args.note
            )
    except LedgerError as exc:
        json.dump({"error": str(exc), "status": exc.status, **exc.payload}, sys.stdout)
        print()
        return 1

    json.dump(out, sys.stdout, indent=1)
    print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
