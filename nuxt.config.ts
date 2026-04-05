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
  plugins: ['app/plugins/mx-space.ts'],

  devtools: {
    enabled: true
  },

  // 页面过渡动画
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://cdn.jsdmirror.cn/npm/lxgw-wenkai-webfont@1.1.0/style.css' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],
  site: { url: 'blog-dev.laobinghu.top' },

  // Nuxt UI 主题配置
  ui: {
    theme: {
      transitions: true,
      defaultVariants: {
        color: 'neutral',
        size: 'md'
      }
    }
  },

  // 运行时配置（环境变量）
  runtimeConfig: {
    public: {
      mxSpaceEndpoint: process.env.NUXT_PUBLIC_MX_SPACE_ENDPOINT || 'https://mx1.647382.xyz/api/v2'
    }
  },

  experimental: {
    inlineRouteRules: true
  },

  compatibilityDate: '2025-01-15',

  // Nitro 服务器配置
  nitro: {
    // 服务器构建配置
    serverAssets: [
      // 可以在这里指定需要复制到 server 目录的静态资源
    ],

    // 确保生成所有必要的入口文件
    preset: 'node-server'
  },

  // Vite 配置
  vite: {
    optimizeDeps: {
      include: [
        '@mx-space/api-client',
        '@mx-space/api-client/dist/adaptors/fetch'
      ]
    },
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
