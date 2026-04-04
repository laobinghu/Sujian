<script setup lang="ts">
import { computed } from 'vue'
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()

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
  <UApp :locale="locales[locale as keyof typeof locales] || locales['zh_cn']">
    <SujianHeader />

    <UMain>
      <NuxtPage />
    </UMain>

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

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.2s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>
