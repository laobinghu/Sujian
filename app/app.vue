<script setup lang="ts">
import { computed } from 'vue'
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

// 确保在客户端才访问 locale.value
const lang = computed(() => {
  const loc = locales[locale.value as keyof typeof locales]
  return loc?.code || 'zh-CN'
})

const dir = computed(() => {
  const loc = locales[locale.value as keyof typeof locales]
  return loc?.dir || 'ltr'
})

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;600;700&display=swap',
      rel: 'stylesheet'
    }
  ],
  htmlAttrs: {
    lang,
    dir
  }
})

const title = '素笺 Sujian - Mix Space Core 前端主题'
const description = '基于 Nuxt 4 的中式设计主题，融合传统美学与现代交互'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/og-image.jpg',
  twitterImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <!-- SVG 噪点滤镜定义 -->
  <svg
    width="0"
    height="0"
    style="position: absolute;"
  >
    <filter id="sujian-noise">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.65"
        numOctaves="3"
        stitchTiles="stitch"
      />
      <feColorMatrix
        type="saturate"
        values="0"
      />
    </filter>
  </svg>

  <UApp :locale="locales[locale.value as keyof typeof locales] || locales['zh_cn']">
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <SujianLogo class="sujian-logo" />
        </NuxtLink>

        <SujianNav />
      </template>

      <template #right>
        <UColorModeButton />

        <!-- 字体切换器 -->
        <FontSwitcher />

        <UButton
          to="https://github.com/mx-space/core"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <!-- 全局背景颗粒感 -->
      <div class="sujian-noise-bg">
        <NuxtPage />
      </div>
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          静以修身 · 俭以养德 • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/mx-space/core"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>

<style scoped>
.sujian-noise-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--sujian-paper-base);
  filter: url(#sujian-noise);
  opacity: 0.03;
  pointer-events: none;
  z-index: -1;
}
</style>
