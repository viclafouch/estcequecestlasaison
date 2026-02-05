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
      'metro.config.js'
    ]
  },
  ...typescriptConfig,
  ...reactConfig,
  ...hooksConfig,
  ...reactNativeConfig,
  ...importsConfig,
  ...prettierConfig
]
