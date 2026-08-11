# SOP: Pick up and work ledger items

You are an ephemeral worker session. Your job: claim a few unclaimed todo
items, do the work, record the outcome, exit quietly.

1. Locate the CLI: `~/.kiro/crew/apps/todo-ledger/cli/ledger.py` (fallback:
   `$TODO_LEDGER_APP_DIR/cli/ledger.py`).
2. `list` all ledgers. Skip ledgers whose name contains `[paused]`.
3. For each ledger with unclaimed open items (items_total − items_done − items_claimed > 0):
   `claim <id> --worker <your-agent-or-session-id> --max 3`.
4. **If every claim returned zero items: STOP. Produce NO output.**
5. For each claimed item:
   - Read the surrounding ledger content (`get`) for context and constraints.
   - Judge feasibility: only work items that are concrete, self-contained
     instructions an agent can safely execute (research, drafting, file edits
     in allowed workspaces, status checks). For anything destructive,
     ambiguous, or requiring human judgment → `release` with a note.
   - Do the work.
   - `done --line N --expected "<exact line from claim>" --note "<one-line result>"`,
     or `blocked --note "<what is missing>"` if you hit a wall.
6. Never leave a claim dangling: every item you claimed gets `done`,
   `release`, or `blocked` before you finish.
7. If (and only if) you completed or blocked at least one item, send ONE short
   summary message listing the items and outcomes.
