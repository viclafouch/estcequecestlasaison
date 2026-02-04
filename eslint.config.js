import {
  importsConfig,
  prettierConfig,
  typescriptConfig
} from '@viclafouch/eslint-config-viclafouch'

/**
 * @type {import("eslint").Linter.Config}
 */
export default [
  {
    ignores: ['**/node_modules/**', 'apps/**', 'packages/**']
  },
  ...typescriptConfig,
  ...importsConfig,
  ...prettierConfig,
  {
    files: ['scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
      'no-await-in-loop': 'off'
    }
  }
]
