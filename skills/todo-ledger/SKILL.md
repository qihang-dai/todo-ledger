# Todo Ledger

Shared markdown todo lists that humans and agent sessions work on together.
Each ledger is a plain markdown file with GFM checkboxes (`- [ ]` / `- [x]`).
Any number of sessions can safely work the same ledger concurrently — the
store serializes every mutation with a file lock and item claims are atomic.

## The CLI (your interface)

All operations go through the app's CLI (JSON output). Find it at
`~/.kiro/crew/apps/todo-ledger/cli/ledger.py` (or `$TODO_LEDGER_APP_DIR/cli/ledger.py`):

```bash
python3 <app>/cli/ledger.py list                        # all ledgers + progress
python3 <app>/cli/ledger.py get <id>                    # full content + version
python3 <app>/cli/ledger.py add <id> "new todo text"    # append an item
python3 <app>/cli/ledger.py claim <id> --worker <you> --max 3
python3 <app>/cli/ledger.py done <id> --line N --expected "<exact line>" --note "what you did"
python3 <app>/cli/ledger.py release <id> --line N --expected "<exact line>" --note "why"
python3 <app>/cli/ledger.py blocked <id> --line N --expected "<exact line>" --note "why"
```

## Rules

1. **Claim before you work.** `claim` atomically marks items with
   `<!-- claim:<worker> -->` — items already claimed or checked are never
   returned to you, so two sessions can't do the same work twice.
2. **Use your session/agent id as `--worker`** so a human can see who holds what.
3. **`--expected` is the exact current line text** (as returned by `claim`/`get`).
   If the line changed since you read it you get a 409-style error with fresh
   content — re-read and retry. Never force.
4. **Always transition every item you claimed** — `done`, `release`, or
   `blocked`. Never leave claims dangling at the end of your run.
5. **If `claim` returns no items, stop and produce NO output.** Silence is the
   correct result for "nothing to do".
6. Freeform markdown around the checkboxes is human context — read it before
   working an item; it usually contains links, constraints, and acceptance notes.
