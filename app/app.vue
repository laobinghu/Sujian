<script setup lang="ts">
import { ref, computed } from 'vue'
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

const navItems = [
  { label: '首页', to: '/' },
  { label: '文章', to: '/posts' },
  { label: '日记', to: '/notes' },
  { label: '友链', to: '/friends' },
  { label: '项目', to: '/projects' },
  { label: '动态', to: '/recently' },
  { label: '时间线', to: '/timeline' },
  { label: '一言', to: '/says' },
  { label: '站点地图', to: '/sitemap' }
]

const isMobileMenuOpen = ref(false)
</script>

<template>
  <UApp :locale="locales[locale as keyof typeof locales] || locales['zh_cn']">
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <SujianLogo class="sujian-logo" />
        </NuxtLink>

        <SujianNav />
      </template>

      <template #right>
        <UColorModeButton />

        <FontSwitcher />

        <!-- 移动端菜单按钮 -->
        <UButton
          icon="i-lucide-menu"
          variant="ghost"
          color="neutral"
          class="md:hidden"
          aria-label="菜单"
          @click="isMobileMenuOpen = true"
        />

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

    <!-- 移动端菜单抽屉 -->
    <USlideover
      v-model:open="isMobileMenuOpen"
      title="导航菜单"
    >
      <template #body>
        <nav class="mobile-nav">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="mobile-nav-link"
            @click="isMobileMenuOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </template>
    </USlideover>

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

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--sujian-ink-secondary);
  text-decoration: none;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.mobile-nav-link:hover {
  background-color: var(--sujian-paper);
}

.mobile-nav-link.router-link-active {
  color: var(--sujian-cinnabar);
  background-color: rgba(211, 66, 60, 0.1);
}
</style>
