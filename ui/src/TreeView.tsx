import { useMemo } from 'react'
import { CLAIM_RE } from './api'

/**
 * Tree view: the same ledger markdown rendered as a status-colored work tree.
 *
 * Structure preserved — every `## ` heading is a workstream node, every
 * checkbox line is a leaf in its workstream. Color carries state so pending
 * work pops and completed work recedes:
 *
 *   `[ ]` open        — amber (glowing: this needs a human)
 *   `[ ]` + ⛔ in text — purple "gated" (waiting on an external unblock)
 *   `[~]` in progress — blue
 *   `[!]` blocked     — red
 *   `[x]` done        — dimmed, small; workstreams with nothing pending
 *                        collapse to a single line
 *
 * Interactivity mirrors the Doc view: open/done leaves toggle through the
 * same exact-line-guarded API (`onToggle(line0)`). `[~]`/`[!]`/gated rows are
 * display-only here — those states are text conventions, edited in Doc/Edit
 * mode. Indented note lines fold behind a "+N notes" expander; non-checkbox
 * section prose (e.g. a hand-drawn ASCII map) folds behind "section notes".
 *
 * Parsing is line-exact and fence-aware so `## ` or `- [ ]` inside code
 * blocks never split sections or become phantom tasks — line0 indexes stay
 * valid for the toggle contract.
 */

type Status = 'open' | 'gate' | 'prog' | 'blk' | 'done'

interface TItem {
  line0: number
  depth: number
  status: Status
  text: string
  claim?: string
  notes: string[]
}

interface TSection {
  title: string
  items: TItem[]
  extra: string[]
}

const ITEM_RE = /^(\s*)- \[([x~! ])\] (.*)$/
const STATUS_OF: Record<string, Status> = { x: 'done', '~': 'prog', '!': 'blk' }

function cleanText(t: string): string {
  return t
    .replace(/<!--.*?-->/g, '')
    .replace(/\(released:[^)]*\)/g, '')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function parse(content: string): { pre: string[]; sections: TSection[] } {
  const lines = content.split('\n')
  // Fence-aware section boundaries.
  const starts: number[] = []
  let fence = false
  lines.forEach((l, i) => {
    if (/^\s*(```|~~~)/.test(l)) fence = !fence
    else if (!fence && l.startsWith('## ')) starts.push(i)
  })

  const parseRange = (from: number, to: number): { items: TItem[]; extra: string[] } => {
    const items: TItem[] = []
    const extra: string[] = []
    let cur: TItem | null = null
    let inFence = false
    for (let i = from; i < to; i++) {
      const raw = lines[i]
      if (/^\s*(```|~~~)/.test(raw)) {
        inFence = !inFence
        extra.push(raw)
        cur = null
        continue
      }
      const m = inFence ? null : ITEM_RE.exec(raw)
      if (m) {
        const depth = Math.floor(m[1].length / 2)
        let status = STATUS_OF[m[2]] ?? (m[3].includes('⛔') ? 'gate' : 'open')
        if (m[2] === ' ' && m[3].includes('⛔')) status = 'gate'
        cur = {
          line0: i,
          depth,
          status,
          text: cleanText(m[3]),
          claim: CLAIM_RE.exec(raw)?.[1],
          notes: [],
        }
        items.push(cur)
        continue
      }
      if (raw.trim() === '') {
        cur = null
        continue
      }
      if (cur && /^\s{2,}/.test(raw)) {
        cur.notes.push(raw.trim())
        continue
      }
      cur = null
      if (!raw.startsWith('---') && !raw.startsWith('# ')) extra.push(raw)
    }
    return { items, extra }
  }

  const preEnd = starts.length ? starts[0] : lines.length
  const pre = parseRange(0, preEnd).extra
  const sections: TSection[] = starts.map((s, idx) => {
    const end = idx + 1 < starts.length ? starts[idx + 1] : lines.length
    const { items, extra } = parseRange(s + 1, end)
    return { title: lines[s].slice(3).trim(), items, extra }
  })
  return { pre, sections }
}

// -- inline linkifier: URLs, bare CR ids, bare ticket ids -------------------------
//
// CRs are the currency of workstreams — every CR mentioned in an item belongs
// to that item's workstream, so bare `CR-123456789` ids link straight to the
// review. Bare P/V ticket ids link to t.corp. Full URLs always win the match
// so an id inside a pasted URL is never double-linked.

const LINK_SPLIT = /(https?:\/\/[^\s)\]]+|CR-\d{6,}|\b[PV]\d{8,}\b)/g

function hrefFor(token: string): string {
  if (token.startsWith('http')) return token
  if (token.startsWith('CR-')) return `https://code.amazon.com/reviews/${token}`
  return `https://t.corp.amazon.com/${token}`
}

function Linked({ text }: { text: string }) {
  const parts = text.split(LINK_SPLIT)
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={hrefFor(p)}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {p}
          </a>
        ) : (
          p
        ),
      )}
    </>
  )
}

// -- presentation -----------------------------------------------------------------

const ICON: Record<Status, string> = { open: '●', gate: '⛔', prog: '◐', blk: '✕', done: '✓' }
const PILL_LABEL: Record<Exclude<Status, 'done'>, string> = {
  open: 'open',
  prog: 'in flight',
  gate: 'gated',
  blk: 'blocked',
}

function ItemRow({
  item,
  pendingLine,
  onToggle,
}: {
  item: TItem
  pendingLine: number | null
  onToggle: (line0: number) => void
}) {
  const toggleable = item.status === 'open' || item.status === 'done' || item.status === 'gate'
  const busy = pendingLine !== null
  return (
    <li
      className={`tlt-it tlt-${item.status}${pendingLine === item.line0 ? ' tlt-busy' : ''}`}
      style={item.depth ? { marginLeft: item.depth * 16 } : undefined}
    >
      {toggleable ? (
        <input
          type="checkbox"
          className="tlt-check"
          checked={item.status === 'done'}
          disabled={busy}
          title={item.status === 'done' ? 'Reopen' : 'Mark done'}
          onChange={() => onToggle(item.line0)}
        />
      ) : (
        <span className="tlt-ic">{ICON[item.status]}</span>
      )}
      <span className="tlt-tx">
        {item.status === 'gate' ? <span className="tlt-ic-inline">⛔ </span> : null}
        <Linked text={item.text} />
      </span>
      {item.claim ? (
        <span className="tlt-claim" title={`Claimed by ${item.claim}`}>
          ⛓ {item.claim}
        </span>
      ) : null}
      {item.notes.length > 0 ? (
        <details className="tlt-notes">
          <summary>+{item.notes.length} notes</summary>
          <div className="tlt-notes-body">
            {item.notes.map((n, i) => (
              <div key={i}>
                <Linked text={n} />
              </div>
            ))}
          </div>
        </details>
      ) : null}
    </li>
  )
}

function ExtraBlock({ label, lines }: { label: string; lines: string[] }) {
  if (lines.length === 0) return null
  return (
    <details className="tlt-extra">
      <summary>
        {label} ({lines.length} lines)
      </summary>
      <pre>{lines.join('\n')}</pre>
    </details>
  )
}

const TLT_CSS = `
.tlt { font-size: 13px; line-height: 1.5; }
.tlt a { color: var(--accent, #7c9cff); text-decoration: underline; text-underline-offset: 2px; }
.tlt-stats { display: flex; gap: 8px; flex-wrap: wrap; margin: 4px 0 14px; }
.tlt-st { padding: 3px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 600; border: 1px solid; }
.tlt-st-open { color: #f0a020; border-color: rgba(240,160,32,.4); background: rgba(240,160,32,.08); }
.tlt-st-prog { color: #58a6ff; border-color: rgba(88,166,255,.4); background: rgba(88,166,255,.08); }
.tlt-st-gate { color: #bc8cff; border-color: rgba(188,140,255,.4); background: rgba(188,140,255,.08); }
.tlt-st-blk  { color: #f85149; border-color: rgba(248,81,73,.4);  background: rgba(248,81,73,.08); }
.tlt-st-done { color: var(--muted, #8b949e); border-color: var(--border, rgba(128,128,128,.3)); }
.tlt-sec { margin: 0 0 6px; border-left: 2px solid var(--border, rgba(128,128,128,.25)); }
.tlt-sec > summary { cursor: pointer; list-style: none; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; padding: 6px 10px; border-radius: 0 8px 8px 0; user-select: none; }
.tlt-sec > summary::-webkit-details-marker { display: none; }
.tlt-sec > summary::before { content: '▸'; opacity: .5; font-size: 10px; transition: transform .15s; }
.tlt-sec[open] > summary::before { transform: rotate(90deg); }
.tlt-hot { border-left-color: #f0a020; }
.tlt-hot > summary { background: linear-gradient(90deg, rgba(240,160,32,.06), transparent 60%); }
.tlt-title { font-weight: 700; font-size: 12.5px; }
.tlt-cold { opacity: .75; }
.tlt-cold .tlt-title { font-weight: 500; color: var(--muted, #8b949e); }
.tlt-pill { font-size: 10px; font-weight: 700; padding: 1px 8px; border-radius: 99px; }
.tlt-pill-open { background: #f0a020; color: #14100a; box-shadow: 0 0 10px rgba(240,160,32,.4); }
.tlt-pill-prog { color: #58a6ff; border: 1px solid rgba(88,166,255,.35); }
.tlt-pill-gate { color: #bc8cff; border: 1px solid rgba(188,140,255,.35); }
.tlt-pill-blk  { color: #f85149; border: 1px solid rgba(248,81,73,.35); }
.tlt-pill-done { color: var(--muted, #8b949e); border: 1px solid var(--border, rgba(128,128,128,.3)); }
.tlt-its { list-style: none; margin: 2px 0 8px; padding: 0 0 0 24px; position: relative; }
.tlt-its::before { content: ''; position: absolute; left: 12px; top: 0; bottom: 8px; width: 1px; background: var(--border, rgba(128,128,128,.25)); }
.tlt-it { position: relative; padding: 3px 8px 3px 4px; margin: 2px 0; border-radius: 6px; display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px; }
.tlt-it::before { content: ''; position: absolute; left: -12px; top: 50%; width: 10px; height: 1px; background: var(--border, rgba(128,128,128,.25)); }
.tlt-tx { flex: 1 1 auto; min-width: 0; }
.tlt-ic { font-size: 11px; flex: none; }
.tlt-ic-inline { font-size: 11px; }
.tlt-check { width: 13px; height: 13px; flex: none; align-self: center; cursor: pointer; accent-color: #f0a020; }
.tlt-open { background: rgba(240,160,32,.07); border: 1px solid rgba(240,160,32,.22); }
.tlt-open .tlt-tx { color: #ffd27d; font-weight: 600; }
.tlt-gate { background: rgba(188,140,255,.05); border: 1px solid rgba(188,140,255,.16); }
.tlt-gate .tlt-tx { color: #c9a8ff; }
.tlt-gate .tlt-check { accent-color: #bc8cff; }
.tlt-prog { background: rgba(88,166,255,.05); border: 1px solid rgba(88,166,255,.16); }
.tlt-prog .tlt-ic { color: #58a6ff; }
.tlt-prog .tlt-tx { color: #a5cfff; }
.tlt-blk { background: rgba(248,81,73,.05); border: 1px solid rgba(248,81,73,.16); }
.tlt-blk .tlt-ic { color: #f85149; }
.tlt-blk .tlt-tx { color: #ff9d97; }
.tlt-done { opacity: .45; font-size: 12px; }
.tlt-done .tlt-check { accent-color: #3fb950; }
.tlt-busy { opacity: .5; }
.tlt-claim { flex: none; display: inline-flex; align-items: center; gap: 3px; padding: 0 5px; border: 1px solid var(--border, rgba(128,128,128,.3)); border-radius: 4px; font-size: 10.5px; opacity: .7; }
.tlt-notes { flex: 1 0 100%; margin-left: 20px; }
.tlt-notes > summary { cursor: pointer; list-style: none; font-size: 10.5px; opacity: .55; user-select: none; }
.tlt-notes > summary::-webkit-details-marker { display: none; }
.tlt-notes-body { margin: 3px 0 4px; padding: 6px 8px; border-left: 2px solid var(--border, rgba(128,128,128,.25)); font-size: 11.5px; opacity: .8; overflow-wrap: anywhere; }
.tlt-extra { margin: 2px 0 8px 24px; }
.tlt-extra > summary { cursor: pointer; list-style: none; font-size: 10.5px; opacity: .55; user-select: none; }
.tlt-extra > summary::-webkit-details-marker { display: none; }
.tlt-extra pre { margin: 4px 0; padding: 8px 10px; border: 1px solid var(--border, rgba(128,128,128,.25)); border-radius: 6px; font-size: 11px; line-height: 1.45; overflow-x: auto; }
`

export function TaskTree({
  content,
  pendingLine,
  onToggle,
}: {
  content: string
  pendingLine: number | null
  onToggle: (line0: number) => void
}) {
  const { pre, sections } = useMemo(() => parse(content), [content])

  const totals: Record<Status, number> = { open: 0, gate: 0, prog: 0, blk: 0, done: 0 }
  for (const s of sections) for (const it of s.items) totals[it.status]++

  return (
    <div className="tlt">
      <style>{TLT_CSS}</style>
      <div className="tlt-stats">
        <span className="tlt-st tlt-st-open">● {totals.open} open — needs action</span>
        <span className="tlt-st tlt-st-prog">◐ {totals.prog} in flight</span>
        <span className="tlt-st tlt-st-gate">⛔ {totals.gate} gated</span>
        {totals.blk > 0 ? <span className="tlt-st tlt-st-blk">✕ {totals.blk} blocked</span> : null}
        <span className="tlt-st tlt-st-done">✓ {totals.done} done</span>
      </div>
      <ExtraBlock label="header notes" lines={pre} />
      {sections.map((s, i) => {
        const pending = s.items.filter((it) => it.status !== 'done').length
        const done = s.items.length - pending
        const hot = pending > 0
        const counts: Record<string, number> = {}
        for (const it of s.items) counts[it.status] = (counts[it.status] ?? 0) + 1
        return (
          <details key={i} className={`tlt-sec ${hot ? 'tlt-hot' : 'tlt-cold'}`} open={hot}>
            <summary>
              <span className="tlt-title">{s.title}</span>
              {(Object.keys(PILL_LABEL) as Array<Exclude<Status, 'done'>>).map((st) =>
                counts[st] ? (
                  <span key={st} className={`tlt-pill tlt-pill-${st}`}>
                    {counts[st]} {PILL_LABEL[st]}
                  </span>
                ) : null,
              )}
              {done > 0 ? (
                <span className="tlt-pill tlt-pill-done">
                  {hot ? `${done} done` : `✓ all ${done} done`}
                </span>
              ) : null}
            </summary>
            {s.items.length > 0 ? (
              <ul className="tlt-its">
                {s.items.map((it) => (
                  <ItemRow key={it.line0} item={it} pendingLine={pendingLine} onToggle={onToggle} />
                ))}
              </ul>
            ) : null}
            <ExtraBlock label="section notes" lines={s.extra} />
          </details>
        )
      })}
    </div>
  )
}
