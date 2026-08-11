/**
 * Ambient declarations for host-provided modules. These are NOT npm packages:
 * the dashboard host serves them at runtime through its import map
 * (`@meshclaw/app-sdk*` on the internal MeshClaw host, `@kirocrew/app-sdk*`
 * on the open-source host, plus react / lucide-react). vite.config.ts marks
 * them all as rollup externals; the default (meshclaw) build additionally
 * aliases the canonical `@kirocrew/*` source imports to `@meshclaw/*`.
 *
 * Only hooks/components verified to exist in BOTH hosts' vendored SDK copies
 * are declared here (MeshClaw 3.3.7 static/dist/vendor stubs and KiroCrew
 * website/src/app-sdk + src/kirocrew-ui).
 */
declare module '@kirocrew/app-sdk' {
  export interface AppApi {
    get<T = unknown>(path: string, init?: RequestInit): Promise<T>
    post<T = unknown>(path: string, body?: unknown): Promise<T>
    put<T = unknown>(path: string, body?: unknown): Promise<T>
    patch<T = unknown>(path: string, body?: unknown): Promise<T>
    del<T = unknown>(path: string): Promise<T>
  }
  export function useAppApi(): AppApi
  export function useAppEvents(event: string, callback: (data: unknown) => void): void
  export function useNotify(): (message: string, opts?: { type?: 'info' | 'success' | 'error' }) => void
  export function useNavBadge(): (count: number) => void
}

declare module '@kirocrew/app-sdk/ui' {
  import * as React from 'react'
  export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>
  export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>
  export const Btn: React.ForwardRefExoticComponent<
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      danger?: boolean
      primary?: boolean
    } & React.RefAttributes<HTMLButtonElement>
  >
  export const Input: React.ForwardRefExoticComponent<
    React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>
  >
  export const Badge: React.FC<{
    variant: 'ok' | 'err' | 'warn'
    children: React.ReactNode
    className?: string
  }>
  export const StatCard: React.FC<{
    label: string
    value?: string | number | null
    accent?: boolean
    onClick?: () => void
    active?: boolean
    title?: string
    className?: string
  }>
  export const EmptyState: React.FC<{
    icon: React.ReactNode
    title: string
    subtitle?: string
    action?: React.ReactNode
  }>
  export const PageHeader: React.FC<{
    title: React.ReactNode
    subtitle?: string
    actions?: React.ReactNode
  }>
}

declare module 'lucide-react' {
  import * as React from 'react'
  export type LucideIcon = React.FC<React.SVGProps<SVGSVGElement> & { size?: number | string }>
  // Only icons present in the MeshClaw 3.3.7 vendor stub's named-export list
  // are declared (and used) — the stub does not re-export every lucide icon.
  export const AlertTriangle: LucideIcon
  export const ArrowLeft: LucideIcon
  export const Check: LucideIcon
  export const Clock: LucideIcon
  export const Loader2: LucideIcon
  export const Plus: LucideIcon
  export const RefreshCw: LucideIcon
  export const Trash2: LucideIcon
  export const X: LucideIcon
}
