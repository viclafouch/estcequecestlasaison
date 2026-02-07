import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

const IMMUTABLE_CACHE = {
  'Cache-Control': 'public, max-age=31536000, immutable'
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
}

export default defineConfig({
  envDir: '../../',
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json']
    }),
    tailwindcss(),
    devtools({ injectSource: { enabled: false } }),
    tanstackStart(),
    nitro({
      routeRules: {
        '/**': { headers: SECURITY_HEADERS },
        '/images/**': { headers: { ...SECURITY_HEADERS, ...IMMUTABLE_CACHE } },
        '/fonts/**': { headers: { ...SECURITY_HEADERS, ...IMMUTABLE_CACHE } },
        '/.well-known/apple-app-site-association': {
          headers: { ...SECURITY_HEADERS, 'Content-Type': 'application/json' }
        },
        '/.well-known/assetlinks.json': {
          headers: { ...SECURITY_HEADERS, 'Content-Type': 'application/json' }
        }
      },
      rollupConfig: {
        external: ['ws']
      }
    }),
    viteReact()
  ]
})
