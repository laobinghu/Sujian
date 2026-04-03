// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  site: { url: 'blog-dev.laobinghu.top' },

  // Nuxt UI 主题配置
  ui: {
    theme: {
      transitions: false,
      defaultVariants: {
        color: 'neutral',
        size: 'md'
      }
    }
  },

  compatibilityDate: '2025-01-15',

  // Vite 配置
  vite: {
    logLevel: 'error',
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        onwarn(warning, warn) {
          // 抑制动态导入冲突警告（Nuxt UI 组件的已知问题）
          if (warning.message.includes('dynamically imported')) return
          if (warning.plugin === 'nuxt:module-preload-polyfill') return
          if (warning.plugin === '@tailwindcss/vite:generate:build') return
          warn(warning)
        }
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // i18n 配置
  i18n: {
    locales: [
      { code: 'zh-cn', name: '简体中文' }
    ],
    defaultLocale: 'zh-cn',
    strategy: 'no_prefix'
  },

  ogImage: {
    zeroRuntime: true
  },

  // sitemap 配置
  sitemap: {
    sources: [
      '/api/sitemap-urls'
    ]
  }
})
