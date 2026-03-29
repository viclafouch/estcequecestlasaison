import { defineConfig } from 'oxlint'
import {
  hooks,
  imports,
  react,
  reactNative,
  typescript
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, reactNative, imports],
  ignorePatterns: [
    'metro.config.cjs',
    'uniwind-types.d.ts',
    'babel.config.cjs'
  ],
  rules: {
    'id-length': [
      'error',
      { exceptions: ['_', 'T', 'K', 'V', 'a', 'b', 'x', 'y'] }
    ],
    'react-native/no-raw-text': [
      'error',
      {
        skip: [
          'Button.Label',
          'Card.Title',
          'Card.Description',
          'Chip.Label',
          'Tabs.Label',
          'NativeTabs.Trigger.Label'
        ]
      }
    ]
  }
})
