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
      'metro.config.cjs'
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
      'import/no-default-export': 'error'
    }
  },
  {
    files: ['app/**/*.tsx'],
    rules: {
      'import/no-default-export': 'off'
    }
  }
]
