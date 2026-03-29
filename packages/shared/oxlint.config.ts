import { defineConfig } from 'oxlint'
import { imports, typescript } from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, imports],
  rules: {
    'id-length': ['error', { exceptions: ['_', 'T', 'K', 'V'] }]
  }
})
