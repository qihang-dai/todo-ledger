import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import ReactMarkdown, { type Components, type ExtraProps } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CLAIM_RE } from './api'

/**
 * Markdown view with INTERACTIVE task-list checkboxes and LOCAL FILE links.
 *
 * Styling: the host dashboard's Tailwind stylesheet only contains classes the
 * host's own build scanned — an app bundle cannot rely on arbitrary utility
 * classes existing. All markdown typography therefore ships as scoped plain
 * CSS under `.tl-md` (theme-token driven via CSS variables with fallbacks).
 *
 * Checkbox line resolution: react-markdown passes the hast `node`; for a task
 * `li`, `node.position.start.line` is the 1-based source line. We provide it
 * via context to the `input` override, which toggles with
 * `{line, expected: exactCurrentLineText}` — a mismapped line can only 409.
 *
 * Local documents: absolute paths (`/…` or `~/…`) are clickable — as bare
 * text (linkified by a line-count-preserving preprocessor), as `inline code`,
 * or as markdown links. Clicks open an in-app viewer backed by the
 * dashboard's `GET /api/file-read?path=` (same-origin cookie auth, host-side
 * path validation + credential redaction).
 */

/** 0-based source line of the enclosing task-list item. */
const LineCtx = createContext<number | null>(null)

interface MdState {
  lines: string[]
  pendingLine: number | null
  onToggle: (line0: number) => void
  onOpenFile: (path: string) => void
}

const MdCtx = createContext<MdState>({
  lines: [],
  pendingLine: null,
  onToggle: () => {},
  onOpenFile: () => {},
})

// -- bare-path autolink (line-count preserving) --------------------------------

// Absolute or ~ path with at least one interior slash; stops before
// whitespace/quotes/brackets/backticks; trims trailing punctuation.
const BARE_PATH_RE = /(^|[\s([{])((?:~\/|\/)[\w.\-]+(?:\/[\w.\-]+)+\/?)(?=[\s)\]},;:!?'"]|$)/g

/** Wrap bare absolute paths in markdown links. Pure in-line substitution:
 * never adds/removes lines, so checkbox line indexes stay valid. Skips fenced
 * code blocks and inline-code segments (those are handled by the `code`
 * component override instead). */
export function linkifyPaths(content: string): string {
  let inFence = false
  return content
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence
        return line
      }
      if (inFence) return line
      // Split out inline-code segments; only transform the plain segments.
      return line
        .split(/(`[^`]*`)/)
        .map((seg) =>
          seg.startsWith('`')
            ? seg
            : seg.replace(BARE_PATH_RE, (_m, pre: string, path: string) => `${pre}[${path}](${path})`),
        )
        .join('')
    })
    .join('\n')
}

const isLocalPath = (s: string | undefined): s is string =>
  !!s && (s.startsWith('/') || s.startsWith('~/')) && s.includes('/')

// -- file viewer modal ----------------------------------------------------------

function FileViewer({ path, onClose }: { path: string; onClose: () => void }) {
  const [state, setState] = useState<{ loading: boolean; error?: string; content?: string }>({
    loading: true,
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let alive = true
    setState({ loading: true })
    fetch(`/api/file-read?path=${encodeURIComponent(path)}`, { credentials: 'same-origin' })
      .then(async (r) => {
        const text = await r.text()
        if (!alive) return
        if (!r.ok) {
          let msg = `HTTP ${r.status}`
          try {
            msg = (JSON.parse(text) as { error?: string }).error ?? msg
          } catch {
            /* raw text error */
          }
          setState({ loading: false, error: msg })
        } else {
          setState({ loading: false, content: text })
        }
      })
      .catch((e: unknown) => {
        if (alive) setState({ loading: false, error: String(e) })
      })
    return () => {
      alive = false
    }
  }, [path])

  return (
    <div className="tl-modal-overlay" onClick={onClose} role="presentation">
      <div
        className="tl-modal"
        role="dialog"
        aria-label={path}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tl-modal-head">
          <span className="tl-modal-title" title={path}>
            {path}
          </span>
          <button
            type="button"
            className="tl-btn"
            onClick={() => {
              void navigator.clipboard.writeText(path).then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 1500)
              })
            }}
          >
            {copied ? 'Copied ✓' : 'Copy path'}
          </button>
          <button type="button" className="tl-btn" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="tl-modal-body">
          {state.loading ? (
            <div className="tl-dim">Loading…</div>
          ) : state.error ? (
            <div className="tl-dim">Could not open: {state.error}</div>
          ) : (
            <pre className="tl-file-pre">{state.content}</pre>
          )}
        </div>
      </div>
    </div>
  )
}

// -- component overrides ----------------------------------------------------------

function MdLi({ node, className, children, ...rest }: ComponentProps<'li'> & ExtraProps) {
  const { lines } = useContext(MdCtx)
  const line = node?.position?.start.line
  const isTask = typeof className === 'string' && className.includes('task-list-item')
  if (isTask && typeof line === 'number') {
    const line0 = line - 1
    const claim = CLAIM_RE.exec(lines[line0] ?? '')?.[1]
    return (
      <LineCtx.Provider value={line0}>
        <li className={`${className} tl-task`} {...rest}>
          {children}
          {claim ? (
            <span title={`Claimed by ${claim}`} className="tl-claim">
              ⛓ {claim}
            </span>
          ) : null}
        </li>
      </LineCtx.Provider>
    )
  }
  return (
    <li className={className} {...rest}>
      {children}
    </li>
  )
}

function MdInput(props: ComponentProps<'input'> & ExtraProps) {
  const { node: _node, ...rest } = props
  const line0 = useContext(LineCtx)
  const { pendingLine, onToggle } = useContext(MdCtx)
  if (rest.type !== 'checkbox') return <input {...rest} />
  const busy = pendingLine !== null
  return (
    <input
      type="checkbox"
      checked={!!rest.checked}
      disabled={line0 === null || busy}
      onChange={() => {
        if (line0 !== null) onToggle(line0)
      }}
      className={`tl-check${pendingLine === line0 ? ' tl-check-busy' : ''}`}
    />
  )
}

function MdA({ node: _n, href, children, ...rest }: ComponentProps<'a'> & ExtraProps) {
  const { onOpenFile } = useContext(MdCtx)
  if (isLocalPath(href)) {
    return (
      <a
        href={href}
        className="tl-filelink"
        title={`Open ${href}`}
        onClick={(e) => {
          e.preventDefault()
          onOpenFile(href)
        }}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  )
}

function MdCode({ node: _n, className, children, ...rest }: ComponentProps<'code'> & ExtraProps) {
  const { onOpenFile } = useContext(MdCtx)
  const text =
    typeof children === 'string'
      ? children
      : Array.isArray(children) && children.length === 1 && typeof children[0] === 'string'
        ? children[0]
        : undefined
  if (isLocalPath(text)) {
    return (
      <code
        className={`${className ?? ''} tl-filelink`}
        title={`Open ${text}`}
        role="link"
        tabIndex={0}
        onClick={() => onOpenFile(text)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onOpenFile(text)
        }}
        {...rest}
      >
        {children}
      </code>
    )
  }
  return (
    <code className={className} {...rest}>
      {children}
    </code>
  )
}

const components: Components = {
  li: MdLi,
  input: MdInput,
  a: MdA,
  code: MdCode,
}

// -- scoped CSS (host tailwind cannot be relied on for app-authored classes) --------

const TL_MD_CSS = `
.tl-md { line-height: 1.55; font-size: 14px; }
.tl-md h1 { font-size: 1.35em; font-weight: 600; margin: 0.9em 0 0.45em; }
.tl-md h2 { font-size: 1.2em;  font-weight: 600; margin: 0.8em 0 0.4em; }
.tl-md h3 { font-size: 1.05em; font-weight: 600; margin: 0.7em 0 0.35em; }
.tl-md p { margin: 0.4em 0; }
.tl-md ul { margin: 0.35em 0; padding-left: 1.4em; list-style: disc; }
.tl-md ol { margin: 0.35em 0; padding-left: 1.4em; list-style: decimal; }
.tl-md ul.contains-task-list { list-style: none; padding-left: 0.35em; }
.tl-md li { margin: 0.18em 0; }
.tl-md li.tl-task { list-style: none; }
.tl-md a { color: var(--accent, #7c9cff); text-decoration: underline; text-underline-offset: 2px; }
.tl-md code { background: rgba(128,128,128,0.16); border-radius: 4px; padding: 0.1em 0.35em; font-size: 0.92em; }
.tl-md pre { background: rgba(128,128,128,0.10); border: 1px solid var(--border, rgba(128,128,128,0.25)); border-radius: 6px; padding: 0.7em 0.9em; overflow-x: auto; margin: 0.5em 0; }
.tl-md pre code { background: none; padding: 0; }
.tl-md blockquote { border-left: 3px solid var(--border, rgba(128,128,128,0.35)); margin: 0.5em 0; padding: 0.1em 0 0.1em 0.8em; opacity: 0.85; }
.tl-md hr { border: none; border-top: 1px solid var(--border, rgba(128,128,128,0.25)); margin: 0.9em 0; }
.tl-md table { border-collapse: collapse; margin: 0.5em 0; font-size: 0.95em; }
.tl-md th, .tl-md td { border: 1px solid var(--border, rgba(128,128,128,0.3)); padding: 0.3em 0.6em; text-align: left; }
.tl-md th { font-weight: 600; background: rgba(128,128,128,0.10); }
.tl-md img { max-width: 100%; }
.tl-check { width: 14px; height: 14px; margin-right: 0.45em; vertical-align: -2px; cursor: pointer; accent-color: var(--accent, #7c9cff); }
.tl-check:disabled { cursor: default; }
.tl-check-busy { opacity: 0.5; }
.tl-claim { display: inline-flex; align-items: center; gap: 3px; margin-left: 0.5em; padding: 0 5px; border: 1px solid var(--border, rgba(128,128,128,0.3)); border-radius: 4px; font-size: 11px; opacity: 0.75; vertical-align: middle; }
.tl-filelink { cursor: pointer; color: var(--accent, #7c9cff); text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 2px; }
.tl-modal-overlay { position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; padding: 4vh 4vw; }
.tl-modal { background: var(--bg, #17171b); color: inherit; border: 1px solid var(--border, rgba(128,128,128,0.3)); border-radius: 8px; width: min(900px, 100%); max-height: 88vh; display: flex; flex-direction: column; box-shadow: 0 12px 40px rgba(0,0,0,0.45); }
.tl-modal-head { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--border, rgba(128,128,128,0.25)); }
.tl-modal-title { flex: 1; font-family: ui-monospace, monospace; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tl-modal-body { overflow: auto; padding: 12px; }
.tl-file-pre { margin: 0; white-space: pre-wrap; word-break: break-word; font-size: 12.5px; line-height: 1.5; font-family: ui-monospace, monospace; }
.tl-btn { border: 1px solid var(--border, rgba(128,128,128,0.35)); background: transparent; color: inherit; border-radius: 5px; padding: 3px 9px; font-size: 12px; cursor: pointer; }
.tl-btn:hover { background: rgba(128,128,128,0.15); }
.tl-dim { opacity: 0.7; font-size: 13px; }
`

export function TaskMarkdown({
  content,
  pendingLine,
  onToggle,
}: {
  content: string
  pendingLine: number | null
  onToggle: (line0: number) => void
}) {
  const [openPath, setOpenPath] = useState<string | null>(null)
  const value = useMemo<MdState>(
    () => ({ lines: content.split('\n'), pendingLine, onToggle, onOpenFile: setOpenPath }),
    [content, pendingLine, onToggle],
  )
  const rendered = useMemo(() => linkifyPaths(content), [content])
  return (
    <MdCtx.Provider value={value}>
      <style>{TL_MD_CSS}</style>
      <div className="tl-md">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {rendered}
        </ReactMarkdown>
      </div>
      {openPath ? <FileViewer path={openPath} onClose={() => setOpenPath(null)} /> : null}
    </MdCtx.Provider>
  )
}
