import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Dual-target SDK naming.
 *
 * Source imports use the upstream-canonical `@kirocrew/app-sdk` specifiers,
 * and the DEFAULT build keeps them — correct for the open-source KiroCrew
 * host. Legacy MeshClaw hosts serve the SDK through their import map as
 * `@meshclaw/app-sdk` / `@meshclaw/app-sdk/ui`; build with
 * BUILD_TARGET=meshclaw to alias the `@kirocrew/*` specifiers accordingly.
 *
 * react / react-dom / react/jsx-runtime / lucide-react / the app SDK are ALL
 * provided by the host at runtime via the import map — they MUST stay rollup
 * externals and never be bundled. react-markdown + remark-gfm are normal
 * dependencies bundled into dist/index.mjs.
 *
 * NOTE on externals vs alias ordering: rollup consults `external` on the RAW
 * import specifier BEFORE the alias plugin resolves it. If `@kirocrew/*` were
 * listed as external on the meshclaw target, the alias would never run and
 * the bundle would ship the wrong specifier. So each target externalizes only
 * the prefixes that can actually appear in its output; the aliased result
 * (`@meshclaw/*`) is itself external, so no SDK code is ever bundled either
 * way (verified by grepping dist/index.mjs after each build).
 */
const target = process.env.BUILD_TARGET === 'meshclaw' ? 'meshclaw' : 'kirocrew'

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'lucide-react',
  '@meshclaw/app-sdk',
  '@meshclaw/app-sdk/ui',
  // Only externalize the @kirocrew/* prefix when it is the intended output —
  // on the meshclaw target it must reach the alias plugin instead.
  ...(target === 'kirocrew' ? ['@kirocrew/app-sdk', '@kirocrew/app-sdk/ui'] : []),
]

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:
      target === 'meshclaw'
        ? [
            // Order matters: map the /ui subpath before the base specifier.
            { find: '@kirocrew/app-sdk/ui', replacement: '@meshclaw/app-sdk/ui' },
            { find: '@kirocrew/app-sdk', replacement: '@meshclaw/app-sdk' },
          ]
        : [],
  },
  build: {
    lib: {
      entry: 'src/App.tsx',
      formats: ['es'],
      fileName: () => 'index.mjs',
    },
    outDir: 'dist',
    rollupOptions: {
      external,
    },
  },
})
