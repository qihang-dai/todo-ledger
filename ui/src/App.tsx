import { useAppApi, useAppEvents, useNotify } from '@kirocrew/app-sdk'
import { Badge, Btn, Card, EmptyState, PageHeader, StatCard } from '@kirocrew/app-sdk/ui'
import { Clock, Plus, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { API_BASE, errText, relTime } from './api'
import type { LedgerMeta } from './api'
import { LedgerEditor } from './LedgerEditor'

/**
 * Todo Ledger — shared markdown todo lists.
 *
 * Single page, two views: the ledger LIST (stats + cards) and the EDITOR
 * (markdown view with interactive checkboxes / raw edit with CAS saves).
 */
export default function TodoLedgerApp() {
  const api = useAppApi()
  const notify = useNotify()

  const [ledgers, setLedgers] = useState<LedgerMeta[] | null>(null)
  const [listError, setListError] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  const openRef = useRef(openId)
  openRef.current = openId

  const refresh = useCallback(async () => {
    try {
      setLedgers(await api.get<LedgerMeta[]>(`${API_BASE}/ledgers`))
      setListError(null)
    } catch (e) {
      setListError(errText(e))
    }
  }, [api])

  // Freshness: poll the list every 5s while the list view is showing; the
  // editor polls its own ledger. 'update' events trigger an immediate refetch.
  useEffect(() => {
    if (openId !== null) return
    void refresh()
    const t = setInterval(() => void refresh(), 5000)
    return () => clearInterval(t)
  }, [openId, refresh])

  useAppEvents('update', () => {
    if (openRef.current === null) void refresh()
  })

  const createLedger = async () => {
    const name = window.prompt('New ledger name')?.trim()
    if (!name) return
    try {
      const meta = await api.post<LedgerMeta>(`${API_BASE}/ledgers`, { name })
      setOpenId(meta.id)
    } catch (e) {
      notify(errText(e), { type: 'error' })
    }
  }

  const deleteLedger = async (l: LedgerMeta) => {
    if (!window.confirm(`Delete ledger "${l.name}"? This cannot be undone.`)) return
    try {
      await api.del(`${API_BASE}/ledgers/${l.id}`)
      void refresh()
    } catch (e) {
      notify(errText(e), { type: 'error' })
    }
  }

  if (openId !== null) {
    return (
      <LedgerEditor
        id={openId}
        onBack={() => {
          setOpenId(null)
          void refresh()
        }}
      />
    )
  }

  const openItems = ledgers?.reduce((n, l) => n + (l.items_total - l.items_done), 0) ?? 0
  const doneItems = ledgers?.reduce((n, l) => n + l.items_done, 0) ?? 0

  return (
    <>
      <PageHeader
        title="Ledgers"
        subtitle="Shared markdown todo lists — humans and agents, one source of truth"
        actions={
          <Btn primary onClick={() => void createLedger()}>
            <Plus size={14} className="mr-1 inline align-[-2px]" />
            New ledger
          </Btn>
        }
      />
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-8">
        <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
          <StatCard label="Ledgers" value={ledgers ? ledgers.length : '…'} accent />
          <StatCard label="Open items" value={ledgers ? openItems : '…'} />
          <StatCard label="Done items" value={ledgers ? doneItems : '…'} />
        </div>

        {listError && (
          <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm">
            Failed to load ledgers: {listError}
          </div>
        )}

        {ledgers && ledgers.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No ledgers yet"
            subtitle="Create one to start a shared todo list"
            action={
              <Btn primary onClick={() => void createLedger()}>
                New ledger
              </Btn>
            }
          />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5">
            {(ledgers ?? []).map((l) => (
              <Card
                key={l.id}
                onClick={() => setOpenId(l.id)}
                className="cursor-pointer transition-colors hover:border-[var(--accent)]"
              >
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{l.name}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                      <span>
                        {l.items_done}/{l.items_total} done
                      </span>
                      {l.items_claimed > 0 && <Badge variant="warn">⛓ {l.items_claimed} claimed</Badge>}
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {relTime(l.updated_at)}
                      </span>
                    </div>
                    {(l.pinned_sessions ?? []).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {(l.pinned_sessions ?? []).map((s) => (
                          <span
                            key={s}
                            title={`Pinned to session ${s}`}
                            className="rounded border border-border px-1.5 py-px text-[10px] text-muted"
                          >
                            📌 {s.slice(0, 8)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    title="Delete ledger"
                    onClick={(e) => {
                      e.stopPropagation()
                      void deleteLedger(l)
                    }}
                    className="shrink-0 rounded p-1 text-muted transition-colors hover:text-red-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
