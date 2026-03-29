import { defineConfig } from 'oxlint'
import { imports, typescript } from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, imports],
  rules: {
    'no-console': 'off',
    'no-await-in-loop': 'off'
  }
})
