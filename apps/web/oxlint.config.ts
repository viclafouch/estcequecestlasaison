import { defineConfig } from 'oxlint'
import { imports, jsxA11y, react, typescript } from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, jsxA11y, imports],
  ignorePatterns: [
    '.tanstack/**',
    'oxlint.config.ts',
    'vite.config.ts',
    'src/routeTree.gen.ts'
  ]
})
