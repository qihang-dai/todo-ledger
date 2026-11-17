import { Btn, Card, Input } from '@kirocrew/app-sdk/ui'
import { useCallback, useState } from 'react'

/**
 * In-page replacements for window.prompt / window.confirm.
 *
 * The host renders app pages in an iframe sandboxed WITHOUT `allow-modals`,
 * where the native dialogs never appear: prompt() returns null and confirm()
 * returns false. These render inside the page instead and resolve a promise,
 * so call sites read like the native ones:
 *
 *   const { dialog, prompt, confirm } = useDialog()
 *   const name = await prompt('New ledger name')   // string | null
 *   if (!(await confirm('Delete?'))) return
 *   ...
 *   return <>{page}{dialog}</>
 *
 * Enter submits, Escape or a click on the backdrop cancels.
 */

interface DialogOpts {
  /** Label of the submit button (default "OK"). */
  confirmLabel?: string
  /** Style the submit button as destructive. */
  danger?: boolean
  /** prompt only: disable submit while the trimmed value is empty. */
  required?: boolean
}

interface Request extends DialogOpts {
  kind: 'prompt' | 'confirm'
  message: string
  resolve: (value: string | null) => void
}

export function useDialog() {
  const [req, setReq] = useState<Request | null>(null)

  const ask = useCallback(
    (kind: Request['kind'], message: string, opts?: DialogOpts) =>
      new Promise<string | null>((resolve) => {
        setReq((prev) => {
          prev?.resolve(null) // a newer request cancels an unanswered one
          return { ...opts, kind, message, resolve }
        })
      }),
    [],
  )
  const prompt = useCallback(
    (message: string, opts?: DialogOpts) => ask('prompt', message, opts),
    [ask],
  )
  const confirm = useCallback(
    async (message: string, opts?: DialogOpts) => (await ask('confirm', message, opts)) !== null,
    [ask],
  )

  const close = (value: string | null) => {
    req?.resolve(value)
    setReq(null)
  }
  const dialog = req ? <DialogView req={req} onClose={close} /> : null
  return { dialog, prompt, confirm }
}

function DialogView({ req, onClose }: { req: Request; onClose: (value: string | null) => void }) {
  const [value, setValue] = useState('')
  const blocked = req.kind === 'prompt' && req.required === true && value.trim() === ''
  const submit = () => {
    if (!blocked) onClose(req.kind === 'prompt' ? value : '')
  }

  return (
    <div
      role="presentation"
      onClick={() => onClose(null)}
      // Keep events from reaching page-level handlers behind the dialog
      // (e.g. the tree view's text-selection affordance).
      onMouseUp={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.stopPropagation()
          onClose(null)
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,.45)',
      }}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-label={req.message}
        onClick={(e) => e.stopPropagation()}
        style={{ width: 'min(420px, calc(100vw - 32px))' }}
      >
        {/* No <form>: the sandbox also lacks allow-forms, which blocks submit
            events, so Enter is handled on the input directly. */}
        <div className="mb-3 text-sm">{req.message}</div>
        {req.kind === 'prompt' && (
          <Input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                submit()
              }
            }}
            className="mb-3 w-full"
          />
        )}
        <div className="flex justify-end gap-2">
          <Btn type="button" onClick={() => onClose(null)}>
            Cancel
          </Btn>
          <Btn
            type="button"
            primary={!req.danger}
            danger={req.danger}
            disabled={blocked}
            autoFocus={req.kind === 'confirm'}
            onClick={submit}
          >
            {req.confirmLabel ?? 'OK'}
          </Btn>
        </div>
      </Card>
    </div>
  )
}
