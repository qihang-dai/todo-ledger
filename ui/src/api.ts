/** Shared types + helpers for the todo-ledger API (contract is frozen). */

export const API_BASE = '/api/apps/todo-ledger'

export interface LedgerMeta {
  id: string
  name: string
  version: number
  /** Epoch seconds (backend uses time.time()). */
  created_at: number | string
  updated_at: number | string
  pinned_sessions: string[]
  items_total: number
  items_done: number
  items_claimed: number
}

export interface LedgerDetail extends LedgerMeta {
  content: string
}

/** `<!-- claim:worker -->` marker on a checkbox source line. */
export const CLAIM_RE = /<!--\s*claim:(.+?)\s*-->/

/**
 * Plain fetch for PUT + toggle: the SDK api client throws a bare Error on
 * non-2xx, but CAS conflict handling needs the 409 response BODY
 * ({error, content, version} — the server-current state). Same origin, so
 * gateway cookies apply.
 */
export async function rawJson(
  method: 'PUT' | 'POST',
  path: string,
  body: unknown,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ status: number; data: any }> {
  const res = await fetch(path, {
    method,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let data: any = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { error: text }
    }
  }
  return { status: res.status, data }
}

export function errText(e: unknown): string {
  return e instanceof Error ? e.message : String(e)
}

/** "just now" / "5m ago" / "3h ago" / "2d ago" from epoch seconds or ISO. */
export function relTime(ts: number | string | null | undefined): string {
  if (ts == null) return ''
  const ms = typeof ts === 'number' ? ts * 1000 : Date.parse(ts)
  if (!Number.isFinite(ms)) return ''
  const diff = Date.now() - ms
  if (diff < 45_000) return 'just now'
  const mins = Math.round(diff / 60_000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}
