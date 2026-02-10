import {
  hooksConfig,
  importsConfig,
  prettierConfig,
  reactConfig,
  reactNativeConfig,
  typescriptConfig
} from '@viclafouch/eslint-config-viclafouch'

/**
 * @type {import("eslint").Linter.Config}
 */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.expo/**',
      '**/ios/**',
      '**/android/**',
      '**/dist/**',
      'metro.config.cjs',
      'uniwind-types.d.ts',
      'expo-env.d.ts'
    ]
  },
  ...typescriptConfig,
  ...reactConfig,
  ...hooksConfig,
  ...reactNativeConfig,
  ...importsConfig,
  ...prettierConfig,
  {
    files: ['**/*.tsx'],
    rules: {
      'import/no-default-export': 'error',
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
  },
  {
    files: ['app/**/*.tsx'],
    rules: {
      'import/no-default-export': 'off'
    }
  }
]
