import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

export default defineConfig({
  ...oxfmtConfig,
  ignorePatterns: [
    'apps/web/src/routeTree.gen.ts',
    'apps/web/.tanstack/**',
    '.claude/**',
    '.agents/**'
  ]
})
