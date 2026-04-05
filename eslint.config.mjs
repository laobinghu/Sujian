// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: [
    '*.md',
    '*.json',
    '*.config.ts',
    '*.config.mjs',
    '.nuxt',
    'dist',
    'node_modules',
    'PLAN.md',
    'README.md'
  ],
  rules: {
    '@stylistic/comma-dangle': 'off',
    '@stylistic/member-delimiter-style': 'off',
    '@stylistic/eol-last': 'off',
    'nuxt/nuxt-config-keys-order': 'off'
  }
})
