import { useAppApi, useAppEvents, useNotify } from '@kirocrew/app-sdk'
import { Btn, Input } from '@kirocrew/app-sdk/ui'
import { AlertTriangle, ArrowLeft, Loader2, Plus } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { API_BASE, errText, rawJson, relTime } from './api'
import type { LedgerDetail } from './api'
import { TaskMarkdown } from './Markdown'
import { TaskTree, VERDICT_RE } from './TreeView'

const VIEW_KEY = 'todo-ledger:view'

function initialView(): 'tree' | 'doc' {
  try {
    return localStorage.getItem(VIEW_KEY) === 'doc' ? 'doc' : 'tree'
  } catch {
    return 'tree'
  }
}

/**
 * Editor view for one ledger. `detail` is the last-known SERVER state
 * (content + meta); `detail.version` is the CAS base_version for every PUT.
 * The edit buffer is only synced from server state while it is CLEAN — a
 * dirty buffer (or an open conflict) blocks polling/event refreshes so the
 * user's edit is never clobbered.
 */
export function LedgerEditor({ id, onBack }: { id: string; onBack: () => void }) {
  const api = useAppApi()
  const notify = useNotify()

  const [detail, setDetail] = useState<LedgerDetail | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [view, setViewState] = useState<'tree' | 'doc'>(initialView)
  const setView = (v: 'tree' | 'doc') => {
    setViewState(v)
    try {
      localStorage.setItem(VIEW_KEY, v)
    } catch {
      /* persistence is best-effort */
    }
  }
  const [buffer, setBuffer] = useState('')
  const [dirty, setDirty] = useState(false)
  const [conflict, setConflict] = useState<{ content: string; version: number } | null>(null)
  const [saving, setSaving] = useState(false)
  const [pendingLine, setPendingLine] = useState<number | null>(null)
  const [renaming, setRenaming] = useState(false)
  const [nameDraft, setNameDraft] = useState('')
  const [quickText, setQuickText] = useState('')
  const [quickBusy, setQuickBusy] = useState(false)

  // "Do not clobber" guard, readable from async callbacks/intervals.
  const holdRef = useRef(false)
  holdRef.current = dirty || conflict !== null

  const load = useCallback(async () => {
    try {
      const d = await api.get<LedgerDetail>(`${API_BASE}/ledgers/${id}`)
      if (holdRef.current) return // dirty buffer or open conflict — never clobber
      setDetail(d)
      setLoadError(null)
    } catch (e) {
      setLoadError(errText(e))
    }
  }, [api, id])

  // Keep a clean buffer mirroring server content (view mode + clean edit mode).
  useEffect(() => {
    if (detail && !dirty && !conflict) setBuffer(detail.content)
  }, [detail, dirty, conflict])

  // Freshness: 5s polling is the guarantee; 'update' events trigger immediate
  // refetch when they fire. Both skip while the buffer is dirty.
  useEffect(() => {
    void load()
    const t = setInterval(() => {
      if (!holdRef.current) void load()
    }, 5000)
    return () => clearInterval(t)
  }, [load])

  useAppEvents('update', (data) => {
    const evId = (data as { id?: string } | null)?.id
    if ((evId === undefined || evId === id) && !holdRef.current) void load()
  })

  const toggle = async (line0: number) => {
    if (!detail || pendingLine !== null) return
    const expected = detail.content.split('\n')[line0]
    if (expected === undefined) return
    setPendingLine(line0)
    try {
      const { status, data } = await rawJson('POST', `${API_BASE}/ledgers/${id}/toggle`, {
        line: line0,
        expected,
      })
      if (status === 409 && data && typeof data.content === 'string') {
        // Stale view — adopt server-current content immediately (view is clean).
        setDetail((d) => (d ? { ...d, content: data.content, version: data.version } : d))
        notify('List changed elsewhere — refreshed', { type: 'info' })
        return
      }
      if (status >= 400 || !data) {
        notify(data?.error ? String(data.error) : `Toggle failed (HTTP ${status})`, { type: 'error' })
        return
      }
      // Success: meta + {line, new_text} — apply the flip locally, no refetch.
      const { line, new_text, ...meta } = data
      setDetail((d) => {
        if (!d) return d
        const lines = d.content.split('\n')
        if (typeof line === 'number' && typeof new_text === 'string') lines[line] = new_text
        return { ...d, ...meta, content: lines.join('\n') }
      })
    } catch (e) {
      notify(errText(e), { type: 'error' })
    } finally {
      setPendingLine(null)
    }
  }

  /** Verdict: write `✅ VALID` / `❌ NOT-TRUE` as an indented note directly
   * under the item. The item line stays byte-identical (claim markers safe);
   * one verdict per item — a new one replaces any previous verdict note.
   * Plain CAS content PUT; a 409 adopts server state, user retries. */
  const verdict = async (line0: number, kind: 'valid' | 'disputed', note: string) => {
    if (!detail || pendingLine !== null || holdRef.current) return
    const lines = detail.content.split('\n')
    const itemLine = lines[line0]
    if (itemLine === undefined || !/^\s*- \[/.test(itemLine)) return
    setPendingLine(line0)
    try {
      const indent = /^(\s*)/.exec(itemLine)![1]
      // The item's note block: subsequent lines indented deeper than the item.
      let end = line0 + 1
      while (end < lines.length && lines[end].trim() && lines[end].startsWith(`${indent}  `)) end++
      const keptNotes = lines.slice(line0 + 1, end).filter((l) => !VERDICT_RE.test(l.trim()))
      const day = new Date().toISOString().slice(0, 10)
      const tag = kind === 'valid' ? `✅ VALID (${day})` : `❌ NOT-TRUE (${day})`
      const vline = `${indent}  - ${tag}${note ? `: ${note}` : ''}`
      const next = [
        ...lines.slice(0, line0 + 1),
        vline,
        ...keptNotes,
        ...lines.slice(end),
      ].join('\n')
      const { status, data } = await rawJson('PUT', `${API_BASE}/ledgers/${id}`, {
        base_version: detail.version,
        content: next,
      })
      if (status === 409 && data && typeof data.content === 'string') {
        setDetail((d) => (d ? { ...d, content: data.content, version: data.version } : d))
        notify('List changed elsewhere — refreshed, try again', { type: 'info' })
        return
      }
      if (status >= 400 || !data) {
        notify(data?.error ? String(data.error) : `Verdict failed (HTTP ${status})`, {
          type: 'error',
        })
        return
      }
      setDetail((d) => (d ? { ...d, ...data, content: next } : d))
    } catch (e) {
      notify(errText(e), { type: 'error' })
    } finally {
      setPendingLine(null)
    }
  }

  /** Selection → new agent session: create a dashboard chat slot, send an
   * investigation prompt carrying the selected text + ledger context, and
   * open the chat in a new tab. The turn runs server-side on the slot, so it
   * survives this tab regardless of the SSE consumer. */
  const investigate = async (text: string) => {
    if (!detail) return
    try {
      const snippet = text.length > 900 ? `${text.slice(0, 900)}…` : text
      const created = await rawJson('POST', '/api/chat/slots', {
        title: `Ledger: ${snippet.replace(/\s+/g, ' ').slice(0, 60)}`,
      })
      const key = created.data?.key
      if (created.status >= 400 || typeof key !== 'string' || !key) {
        notify(created.data?.error ? String(created.data.error) : 'Could not create session', {
          type: 'error',
        })
        return
      }
      const message =
        `Investigate this selected text from the todo-ledger "${detail.name}" (ledger id ${id}):\n\n` +
        `${snippet}\n\n` +
        `Get full ledger context with: python3 ~/.meshclaw/apps/todo-ledger/cli/ledger.py get ${id}\n` +
        `Verify the claim(s) against real evidence (CRs, tickets, code, session history). Report findings. ` +
        `If the ledger item needs a status change, apply it via the CLI with the exact-line guard; otherwise leave the ledger untouched.`
      void fetch('/api/chat', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot: key, message }),
      }).catch(() => {
        /* SSE consumer is best-effort; the turn runs on the slot server-side */
      })
      window.open(`/chat/investigate?sid=${encodeURIComponent(key)}`, '_blank', 'noopener')
      notify('Investigation session started in a new tab', { type: 'info' })
    } catch (e) {
      notify(errText(e), { type: 'error' })
    }
  }

  const save = async (baseVersion?: number) => {
    if (!detail || saving) return
    setSaving(true)
    try {
      const { status, data } = await rawJson('PUT', `${API_BASE}/ledgers/${id}`, {
        base_version: baseVersion ?? detail.version,
        content: buffer,
      })
      if (status === 409 && data && typeof data.content === 'string') {
        setConflict({ content: data.content, version: data.version })
        return
      }
      if (status >= 400 || !data) {
        notify(data?.error ? String(data.error) : `Save failed (HTTP ${status})`, { type: 'error' })
        return
      }
      const saved = buffer
      setConflict(null)
      setDirty(false)
      setDetail((d) => (d ? { ...d, ...data, content: saved } : d))
      setMode('view')
    } catch (e) {
      notify(errText(e), { type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const takeTheirs = () => {
    if (!conflict) return
    const c = conflict
    setConflict(null)
    setDirty(false)
    setDetail((d) => (d ? { ...d, content: c.content, version: c.version } : d))
    setBuffer(c.content)
  }

  const enterEdit = () => {
    if (!detail) return
    setBuffer(detail.content)
    setDirty(false)
    setMode('edit')
  }

  const cancelEdit = () => {
    setConflict(null)
    setDirty(false)
    if (detail) setBuffer(detail.content)
    setMode('view')
  }

  const startRename = () => {
    if (!detail || holdRef.current) return
    setNameDraft(detail.name)
    setRenaming(true)
  }

  const commitRename = async () => {
    setRenaming(false)
    const name = nameDraft.trim()
    if (!detail || !name || name === detail.name) return
    try {
      let res = await rawJson('PUT', `${API_BASE}/ledgers/${id}`, {
        base_version: detail.version,
        name,
      })
      if (res.status === 409 && typeof res.data?.version === 'number') {
        // Name-only PUT leaves content untouched — retry once at server version.
        res = await rawJson('PUT', `${API_BASE}/ledgers/${id}`, {
          base_version: res.data.version,
          name,
        })
      }
      if (res.status >= 400 || !res.data) {
        notify(res.data?.error ? String(res.data.error) : `Rename failed (HTTP ${res.status})`, {
          type: 'error',
        })
        return
      }
      await load() // resync meta + any concurrent content change
    } catch (e) {
      notify(errText(e), { type: 'error' })
    }
  }

  const quickDisabled = dirty || conflict !== null
  const quickAdd = async () => {
    const text = quickText.trim()
    if (!text || quickBusy || quickDisabled) return
    setQuickBusy(true)
    try {
      await api.post(`${API_BASE}/ledgers/${id}/items`, { text })
      setQuickText('')
      await load()
    } catch (e) {
      notify(errText(e), { type: 'error' })
    } finally {
      setQuickBusy(false)
    }
  }

  const handleBack = () => {
    if (holdRef.current && !window.confirm('Discard unsaved changes?')) return
    onBack()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Header: back + name (click to rename) + view/edit toggle */}
      <div className="flex items-center gap-3 px-6 pb-3 pt-5">
        <Btn onClick={handleBack} title="Back to ledgers">
          <ArrowLeft size={14} />
        </Btn>
        {renaming ? (
          <Input
            autoFocus
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={() => void commitRename()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void commitRename()
              if (e.key === 'Escape') setRenaming(false)
            }}
            className="max-w-xs"
          />
        ) : (
          <button
            type="button"
            onClick={startRename}
            title={quickDisabled ? 'Save or cancel your edit first' : 'Click to rename'}
            className="min-w-0 truncate bg-transparent text-lg font-semibold decoration-dotted underline-offset-4 hover:underline"
          >
            {detail?.name ?? '…'}
          </button>
        )}
        {detail && (
          <span className="hidden shrink-0 text-xs text-muted sm:inline">
            {detail.items_done}/{detail.items_total} done · v{detail.version} · updated{' '}
            {relTime(detail.updated_at)}
          </span>
        )}
        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          {mode === 'edit' ? (
            <>
              <Btn onClick={cancelEdit} disabled={saving}>
                Cancel
              </Btn>
              <Btn primary onClick={() => void save()} disabled={saving || !dirty}>
                {saving ? 'Saving…' : 'Save'}
              </Btn>
            </>
          ) : (
            <>
              <Btn primary={view === 'tree'} onClick={() => setView('tree')}>
                Tree
              </Btn>
              <Btn primary={view === 'doc'} onClick={() => setView('doc')}>
                Doc
              </Btn>
              <Btn onClick={enterEdit} disabled={!detail}>
                Edit
              </Btn>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={
          mode === 'view'
            ? 'min-h-0 flex-1 overflow-y-auto px-6 pb-4'
            : 'flex min-h-0 flex-1 flex-col px-6 pb-4'
        }
      >
        {mode === 'edit' && conflict && (
          <div className="mb-3 flex items-center gap-3 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm">
            <AlertTriangle size={16} className="shrink-0 text-amber-500" />
            <span className="min-w-0 flex-1">
              Changed elsewhere (now v{conflict.version}) — your save was rejected.
            </span>
            <Btn onClick={takeTheirs}>Take theirs</Btn>
            <Btn danger onClick={() => void save(conflict.version)} disabled={saving}>
              Overwrite
            </Btn>
          </div>
        )}
        {!detail ? (
          <div className="flex flex-1 items-center justify-center py-16 text-muted">
            {loadError ? (
              <span className="text-sm">Failed to load: {loadError}</span>
            ) : (
              <Loader2 size={20} className="animate-spin" />
            )}
          </div>
        ) : mode === 'view' ? (
          <div className="max-w-3xl text-sm">
            {detail.content.trim() === '' ? (
              <p className="py-8 text-muted">Empty ledger — add an item below.</p>
            ) : view === 'tree' ? (
              <TaskTree
                content={detail.content}
                pendingLine={pendingLine}
                onToggle={toggle}
                onVerdict={verdict}
                onInvestigate={investigate}
              />
            ) : (
              <TaskMarkdown content={detail.content} pendingLine={pendingLine} onToggle={toggle} />
            )}
          </div>
        ) : (
          <textarea
            value={buffer}
            onChange={(e) => {
              setBuffer(e.target.value)
              setDirty(true)
            }}
            spellCheck={false}
            className="min-h-0 w-full flex-1 resize-none rounded border border-border bg-transparent p-3 font-mono text-sm outline-none focus:border-[var(--accent)]"
          />
        )}
      </div>

      {/* Quick-add (both modes) */}
      <div className="border-t border-border px-6 py-3">
        <form
          className="flex max-w-3xl items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            void quickAdd()
          }}
        >
          <Plus size={14} className="shrink-0 text-muted" />
          <Input
            value={quickText}
            onChange={(e) => setQuickText(e.target.value)}
            placeholder={
              quickDisabled
                ? 'Save or cancel your edit to add items'
                : 'Add a todo item — Enter to append'
            }
            disabled={quickDisabled || quickBusy || !detail}
            className="flex-1"
          />
        </form>
      </div>
    </div>
  )
}
