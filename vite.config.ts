import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

const config = defineConfig({
  plugins: [
    ...(process.env.NODE_ENV === 'development' ? [devtools()] : []),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm] }) },
    tanstackStart(),
    viteReact(),
  ],
})

export default config
