import {
  importsConfig,
  jsxA11yConfig,
  prettierConfig,
  reactConfig,
  typescriptConfig
} from '@viclafouch/eslint-config-viclafouch'

/**
 * @type {import("eslint").Linter.Config}
 */
export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.output/**',
      '**/.tanstack/**',
      '**/dist/**',
      '**/vercel/**'
    ]
  },
  ...typescriptConfig,
  ...reactConfig,
  ...jsxA11yConfig,
  ...importsConfig,
  ...prettierConfig,
  {
    files: ['**/*.tsx'],
    rules: {
      'import/no-default-export': 'error'
    }
  }
]
