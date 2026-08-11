# Todo Ledger

Shared markdown todo lists for KiroCrew — one source of truth that humans edit
in the dashboard and **agent sessions pick up and complete**.

> "a todo list and you can ask many sessions to pick them up"

- **Markdown-native** — every ledger is a plain `.md` file with GFM checkboxes.
  Portable, greppable, exportable; the file *is* the database.
- **Safe concurrency** — optimistic versioning (CAS) on edits, exact-line
  staleness guards on toggles, and atomic server-side claims: two sessions can
  never grab the same item.
- **Agents as workers** — a shipped skill + SOP teach any agent to `claim`
  items, do the work, and `done`/`release`/`blocked` them via a zero-dependency
  CLI. An optional (shipped-disabled) cron turns it into an autonomous worker
  pool.

## Install

Dashboard → Apps → Sources → local path, or:

```bash
curl -X POST http://localhost:PORT/api/apps/install -d '{"source": "/path/to/todo-ledger"}'
curl -X POST http://localhost:PORT/api/apps/todo-ledger/enable
```

The **Ledgers** page appears in the nav rail.

> **Legacy MeshClaw hosts:** the committed UI bundle targets the KiroCrew
> import map (`@kirocrew/app-sdk`). If your host serves `@meshclaw/app-sdk`,
> rebuild before installing: `cd ui && npm install && BUILD_TARGET=meshclaw npm run build`.

## Anatomy

```
app.json            # manifest: routes hook, UI page, skill, worker agent, pickup cron (disabled)
backend/store.py    # flock-guarded markdown store: CAS, toggle, claim, transition
backend/routes.py   # /api/apps/todo-ledger/* (gateway in-process routes)
cli/ledger.py       # agent-facing CLI — same store, same lock, no HTTP/auth needed
ui/                 # dashboard page (React ESM, host import map)
skills/todo-ledger/ # skill + pickup SOP for worker agents
agents/ledger-worker.json
```

## Agent quickstart

```bash
APP=~/.kiro/crew/apps/todo-ledger
python3 $APP/cli/ledger.py list
python3 $APP/cli/ledger.py claim <ledger_id> --worker my-session --max 3
python3 $APP/cli/ledger.py done <ledger_id> --line 4 --expected "- [ ] ship it <!-- claim:my-session -->" --note "shipped"
```

Claim markers live in the markdown itself (`<!-- claim:worker -->`), so claim
state is human-visible in the editor and survives export.

## Concurrency model

| Operation | Guard |
|---|---|
| Full-document save | `base_version` CAS → 409 with server-current content |
| Checkbox toggle | exact-line `expected` text → 409 on drift |
| Item claim | single flock critical section — atomic multi-item claim |
| Everything | one exclusive file lock shared by gateway routes **and** CLI processes |

## License / provenance

Built as a third-party app following `docs/app-kit/`. Design history:
[KiroCrew RFC #2641](https://github.com/kirodotdev/KiroCrew/issues/2641)
(core-feature proposal, redirected to the Apps platform by maintainers).
