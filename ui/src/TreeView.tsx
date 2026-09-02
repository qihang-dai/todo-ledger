import { useEffect, useMemo, useRef, useState } from 'react'
import { CLAIM_RE } from './api'

/** Human verdict on an item, stored as an indented note line under it:
 *  `  - ✅ VALID (YYYY-MM-DD)` or `  - ❌ NOT-TRUE (YYYY-MM-DD): reason`.
 *  Living in the markdown keeps it visible in Doc view, greppable by agents,
 *  and leaves the item line itself byte-identical (claim markers safe). */
export const VERDICT_RE = /^-?\s*(✅ VALID|❌ NOT-TRUE)\s*\(([^)]*)\)\s*:?\s*(.*)$/

interface Verdict {
  kind: 'valid' | 'disputed'
  meta: string
  note: string
}

interface TItem {
  line0: number
  depth: number
  status: Status
  text: string
  claim?: string
  notes: string[]
  verdict?: Verdict
}

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
        const t = raw.trim()
        const v = VERDICT_RE.exec(t)
        if (v) {
          cur.verdict = { kind: v[1] === '✅ VALID' ? 'valid' : 'disputed', meta: v[2], note: v[3] }
        } else {
          cur.notes.push(t)
        }
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

// -- theme detection ---------------------------------------------------------------
//
// The host theme is a runtime toggle (not necessarily OS-linked), and status
// colors need different palettes per theme — pale ambers/blues that glow on
// dark are unreadable on white. Detect by resolving the actual background
// luminance and re-check when the host mutates the root element's class/style.

function bgIsLight(): boolean {
  try {
    let el: Element | null = document.body
    while (el) {
      const c = getComputedStyle(el).backgroundColor
      const m = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\)/.exec(c)
      if (m && (m[4] === undefined || parseFloat(m[4]) > 0.1)) {
        const [r, g, b] = [+m[1], +m[2], +m[3]]
        return 0.2126 * r + 0.7152 * g + 0.0722 * b > 128
      }
      el = el.parentElement
    }
  } catch {
    /* SSR / detached — fall through to dark */
  }
  return false
}

function useLightTheme(): boolean {
  const [light, setLight] = useState(bgIsLight)
  useEffect(() => {
    const recheck = () => setLight(bgIsLight())
    recheck()
    const obs = new MutationObserver(recheck)
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'style', 'data-theme'],
    })
    obs.observe(document.body, { attributes: true, attributeFilter: ['class', 'style'] })
    return () => obs.disconnect()
  }, [])
  return light
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
  onVerdict,
}: {
  item: TItem
  pendingLine: number | null
  onToggle: (line0: number) => void
  onVerdict: (line0: number, kind: 'valid' | 'disputed', note: string) => void
}) {
  const toggleable = item.status === 'open' || item.status === 'done' || item.status === 'gate'
  const busy = pendingLine !== null
  return (
    <li
      className={`tlt-it tlt-${item.status}${item.verdict?.kind === 'disputed' ? ' tlt-disputed' : ''}${pendingLine === item.line0 ? ' tlt-busy' : ''}`}
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
      {item.verdict ? (
        <span
          className={`tlt-vchip tlt-vchip-${item.verdict.kind === 'valid' ? 'valid' : 'disp'}`}
          title={`${item.verdict.kind === 'valid' ? 'Confirmed valid' : 'Marked NOT TRUE'} (${item.verdict.meta})${item.verdict.note ? `: ${item.verdict.note}` : ''}`}
        >
          {item.verdict.kind === 'valid' ? '✓ valid' : '✗ not true'}
        </span>
      ) : null}
      <span className="tlt-acts">
        <button
          type="button"
          className="tlt-abtn"
          disabled={busy}
          title="Confirm: this item is valid"
          onClick={() => onVerdict(item.line0, 'valid', '')}
        >
          ✓
        </button>
        <button
          type="button"
          className="tlt-abtn"
          disabled={busy}
          title="Dispute: this item is not true"
          onClick={() => {
            const note = window.prompt('Why is this not true? (stored on the item)')
            if (note === null) return
            onVerdict(item.line0, 'disputed', note.trim())
          }}
        >
          ✗
        </button>
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
.tlt {
  font-size: 13px; line-height: 1.5;
  --t-amber: #f0a020; --t-amber-tx: #ffd27d; --t-amber-pill-tx: #14100a;
  --t-blue: #58a6ff;  --t-blue-tx: #a5cfff;
  --t-purple: #bc8cff; --t-purple-tx: #c9a8ff;
  --t-red: #f85149;   --t-red-tx: #ff9d97;
  --t-green: #3fb950;
  --t-glow: 0 0 10px rgba(240,160,32,.4);
  --t-line: var(--border, rgba(128,128,128,.25));
  --t-dim: var(--muted, #8b949e);
}
.tlt.tlt-light {
  --t-amber: #b45309; --t-amber-tx: #92400e; --t-amber-pill-tx: #fff;
  --t-blue: #0969da;  --t-blue-tx: #0a4f9e;
  --t-purple: #6f42c1; --t-purple-tx: #5e35a8;
  --t-red: #cf222e;   --t-red-tx: #a40e26;
  --t-green: #1a7f37;
  --t-glow: none;
  --t-line: var(--border, rgba(0,0,0,.14));
  --t-dim: var(--muted, #57606a);
}
.tlt a { color: var(--accent, #7c9cff); text-decoration: underline; text-underline-offset: 2px; }
.tlt-stats { display: flex; gap: 8px; flex-wrap: wrap; margin: 4px 0 14px; }
.tlt-st { padding: 3px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 600; border: 1px solid; }
.tlt-st-open { color: var(--t-amber); border-color: color-mix(in srgb, var(--t-amber) 45%, transparent); background: color-mix(in srgb, var(--t-amber) 9%, transparent); }
.tlt-st-prog { color: var(--t-blue); border-color: color-mix(in srgb, var(--t-blue) 45%, transparent); background: color-mix(in srgb, var(--t-blue) 9%, transparent); }
.tlt-st-gate { color: var(--t-purple); border-color: color-mix(in srgb, var(--t-purple) 45%, transparent); background: color-mix(in srgb, var(--t-purple) 9%, transparent); }
.tlt-st-blk  { color: var(--t-red); border-color: color-mix(in srgb, var(--t-red) 45%, transparent); background: color-mix(in srgb, var(--t-red) 9%, transparent); }
.tlt-st-done { color: var(--t-dim); border-color: var(--t-line); }
.tlt-sec { margin: 0 0 6px; border-left: 2px solid var(--t-line); }
.tlt-sec > summary { cursor: pointer; list-style: none; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; padding: 6px 10px; border-radius: 0 8px 8px 0; user-select: none; }
.tlt-sec > summary::-webkit-details-marker { display: none; }
.tlt-sec > summary::before { content: '▸'; opacity: .5; font-size: 10px; transition: transform .15s; }
.tlt-sec[open] > summary::before { transform: rotate(90deg); }
.tlt-hot { border-left-color: var(--t-amber); }
.tlt-hot > summary { background: linear-gradient(90deg, color-mix(in srgb, var(--t-amber) 7%, transparent), transparent 60%); }
.tlt-title { font-weight: 700; font-size: 12.5px; }
.tlt-cold { opacity: .75; }
.tlt-cold .tlt-title { font-weight: 500; color: var(--t-dim); }
.tlt-pill { font-size: 10px; font-weight: 700; padding: 1px 8px; border-radius: 99px; }
.tlt-pill-open { background: var(--t-amber); color: var(--t-amber-pill-tx); box-shadow: var(--t-glow); }
.tlt-pill-prog { color: var(--t-blue); border: 1px solid color-mix(in srgb, var(--t-blue) 40%, transparent); }
.tlt-pill-gate { color: var(--t-purple); border: 1px solid color-mix(in srgb, var(--t-purple) 40%, transparent); }
.tlt-pill-blk  { color: var(--t-red); border: 1px solid color-mix(in srgb, var(--t-red) 40%, transparent); }
.tlt-pill-done { color: var(--t-dim); border: 1px solid var(--t-line); }
.tlt-its { list-style: none; margin: 2px 0 8px; padding: 0 0 0 24px; position: relative; }
.tlt-its::before { content: ''; position: absolute; left: 12px; top: 0; bottom: 8px; width: 1px; background: var(--t-line); }
.tlt-it { position: relative; padding: 3px 8px 3px 4px; margin: 2px 0; border-radius: 6px; display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px; }
.tlt-it::before { content: ''; position: absolute; left: -12px; top: 50%; width: 10px; height: 1px; background: var(--t-line); }
.tlt-tx { flex: 1 1 auto; min-width: 0; }
.tlt-ic { font-size: 11px; flex: none; }
.tlt-ic-inline { font-size: 11px; }
.tlt-check { width: 13px; height: 13px; flex: none; align-self: center; cursor: pointer; accent-color: var(--t-amber); }
.tlt-open { background: color-mix(in srgb, var(--t-amber) 8%, transparent); border: 1px solid color-mix(in srgb, var(--t-amber) 25%, transparent); }
.tlt-open .tlt-tx { color: var(--t-amber-tx); font-weight: 600; }
.tlt-gate { background: color-mix(in srgb, var(--t-purple) 6%, transparent); border: 1px solid color-mix(in srgb, var(--t-purple) 20%, transparent); }
.tlt-gate .tlt-tx { color: var(--t-purple-tx); }
.tlt-gate .tlt-check { accent-color: var(--t-purple); }
.tlt-prog { background: color-mix(in srgb, var(--t-blue) 6%, transparent); border: 1px solid color-mix(in srgb, var(--t-blue) 20%, transparent); }
.tlt-prog .tlt-ic { color: var(--t-blue); }
.tlt-prog .tlt-tx { color: var(--t-blue-tx); }
.tlt-blk { background: color-mix(in srgb, var(--t-red) 6%, transparent); border: 1px solid color-mix(in srgb, var(--t-red) 20%, transparent); }
.tlt-blk .tlt-ic { color: var(--t-red); }
.tlt-blk .tlt-tx { color: var(--t-red-tx); }
.tlt-done { opacity: .55; font-size: 12px; }
.tlt-done .tlt-check { accent-color: var(--t-green); }
.tlt-busy { opacity: .5; }
.tlt-claim { flex: none; display: inline-flex; align-items: center; gap: 3px; padding: 0 5px; border: 1px solid var(--t-line); border-radius: 4px; font-size: 10.5px; opacity: .7; }
.tlt-notes { flex: 1 0 100%; margin-left: 20px; }
.tlt-notes > summary { cursor: pointer; list-style: none; font-size: 10.5px; opacity: .55; user-select: none; }
.tlt-notes > summary::-webkit-details-marker { display: none; }
.tlt-notes-body { margin: 3px 0 4px; padding: 6px 8px; border-left: 2px solid var(--t-line); font-size: 11.5px; opacity: .8; overflow-wrap: anywhere; }
.tlt-donefold { margin: 0 0 8px 24px; }
.tlt-donefold > summary { cursor: pointer; list-style: none; font-size: 11px; color: var(--t-dim); user-select: none; padding: 2px 0; }
.tlt-donefold > summary::-webkit-details-marker { display: none; }
.tlt-donefold .tlt-its { margin-top: 0; }
.tlt-extra { margin: 2px 0 8px 24px; }
.tlt-extra > summary { cursor: pointer; list-style: none; font-size: 10.5px; opacity: .55; user-select: none; }
.tlt-extra > summary::-webkit-details-marker { display: none; }
.tlt { position: relative; }
.tlt-acts { display: none; gap: 4px; flex: none; }
.tlt-it:hover .tlt-acts { display: inline-flex; }
.tlt-abtn { border: 1px solid var(--t-line); background: transparent; color: var(--t-dim); border-radius: 4px; font-size: 10px; line-height: 16px; padding: 0 5px; cursor: pointer; }
.tlt-abtn:hover { color: inherit; border-color: var(--t-dim); }
.tlt-abtn:disabled { opacity: .4; cursor: default; }
.tlt-vchip { flex: none; font-size: 10px; font-weight: 700; padding: 0 6px; border-radius: 99px; }
.tlt-vchip-valid { color: var(--t-green); border: 1px solid color-mix(in srgb, var(--t-green) 45%, transparent); }
.tlt-vchip-disp { color: var(--t-red); border: 1px solid color-mix(in srgb, var(--t-red) 50%, transparent); background: color-mix(in srgb, var(--t-red) 10%, transparent); }
.tlt-it.tlt-disputed { border-color: color-mix(in srgb, var(--t-red) 45%, transparent); background: color-mix(in srgb, var(--t-red) 5%, transparent); }
.tlt-selbtn { position: absolute; z-index: 6; border: none; border-radius: 6px; background: var(--accent, #7c9cff); color: #fff; font-size: 11px; font-weight: 600; padding: 3px 9px; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,.35); }
.tlt-extra pre { margin: 4px 0; padding: 8px 10px; border: 1px solid var(--t-line); border-radius: 6px; font-size: 11px; line-height: 1.45; overflow-x: auto; }
`

export function TaskTree({
  content,
  pendingLine,
  onToggle,
  onVerdict,
  onInvestigate,
}: {
  content: string
  pendingLine: number | null
  onToggle: (line0: number) => void
  onVerdict: (line0: number, kind: 'valid' | 'disputed', note: string) => void
  onInvestigate: (text: string) => void
}) {
  const { pre, sections } = useMemo(() => parse(content), [content])
  const light = useLightTheme()

  // Text selection → floating "New session" affordance. Position is relative
  // to the wrapper; cleared on outside click / empty selection.
  const wrapRef = useRef<HTMLDivElement>(null)
  const [sel, setSel] = useState<{ x: number; y: number; text: string } | null>(null)
  const handleMouseUp = (e: React.MouseEvent) => {
    const s = window.getSelection()
    const text = s?.toString().trim() ?? ''
    if (
      text.length >= 3 &&
      s &&
      s.anchorNode &&
      wrapRef.current &&
      wrapRef.current.contains(s.anchorNode)
    ) {
      const rect = wrapRef.current.getBoundingClientRect()
      setSel({ x: e.clientX - rect.left, y: e.clientY - rect.top + 16, text })
    } else {
      setSel(null)
    }
  }

  const totals: Record<Status, number> = { open: 0, gate: 0, prog: 0, blk: 0, done: 0 }
  for (const s of sections) for (const it of s.items) totals[it.status]++

  return (
    <div
      ref={wrapRef}
      className={`tlt${light ? ' tlt-light' : ''}`}
      onMouseUp={handleMouseUp}
    >
      <style>{TLT_CSS}</style>
      {sel ? (
        <button
          type="button"
          className="tlt-selbtn"
          style={{ left: Math.max(0, sel.x - 40), top: sel.y }}
          onMouseDown={(e) => e.preventDefault() /* keep the selection */}
          onClick={() => {
            onInvestigate(sel.text)
            setSel(null)
          }}
        >
          ⚡ New session
        </button>
      ) : null}
      <div className="tlt-stats">
        <span className="tlt-st tlt-st-open">● {totals.open} open — needs action</span>
        <span className="tlt-st tlt-st-prog">◐ {totals.prog} in flight</span>
        <span className="tlt-st tlt-st-gate">⛔ {totals.gate} gated</span>
        {totals.blk > 0 ? <span className="tlt-st tlt-st-blk">✕ {totals.blk} blocked</span> : null}
        <span className="tlt-st tlt-st-done">✓ {totals.done} done</span>
      </div>
      <ExtraBlock label="header notes" lines={pre} />
      {sections.map((s, i) => {
        const pendingRows = s.items.filter((it) => it.status !== 'done')
        const doneRows = s.items.filter((it) => it.status === 'done')
        const hot = pendingRows.length > 0
        const counts: Record<string, number> = {}
        for (const it of s.items) counts[it.status] = (counts[it.status] ?? 0) + 1
        const doneList =
          doneRows.length > 0 ? (
            <ul className="tlt-its">
              {doneRows.map((it) => (
                <ItemRow key={it.line0} item={it} pendingLine={pendingLine} onToggle={onToggle} onVerdict={onVerdict} />
              ))}
            </ul>
          ) : null
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
              {doneRows.length > 0 ? (
                <span className="tlt-pill tlt-pill-done">
                  {hot ? `${doneRows.length} done` : `✓ all ${doneRows.length} done`}
                </span>
              ) : null}
            </summary>
            {pendingRows.length > 0 ? (
              <ul className="tlt-its">
                {pendingRows.map((it) => (
                  <ItemRow key={it.line0} item={it} pendingLine={pendingLine} onToggle={onToggle} onVerdict={onVerdict} />
                ))}
              </ul>
            ) : null}
            {/* Done rows: folded away inside active workstreams, plainly listed
                inside all-done workstreams (the section itself is collapsed). */}
            {doneRows.length > 0 ? (
              hot ? (
                <details className="tlt-donefold">
                  <summary>✓ {doneRows.length} done — expand</summary>
                  {doneList}
                </details>
              ) : (
                doneList
              )
            ) : null}
            <ExtraBlock label="section notes" lines={s.extra} />
          </details>
        )
      })}
    </div>
  )
}
