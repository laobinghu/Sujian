// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    ignores: [
      '*.md',
      '*.json',
      '*.config.ts',
      '*.config.mjs',
      '.nuxt',
      'dist',
      'node_modules'
    ]
  }
)
