<script setup lang="ts">
import { useArticles } from '~/composables/useArticles'
import { useAggregate } from '~/composables/useAggregate'

const { getList: getArticleList } = useArticles()
const { getStats } = useAggregate()

const { data: articlesData } = await useAsyncData('home-articles', () =>
  getArticleList(1, 5)
)

const { data: statsData } = await useAsyncData('home-stats', () =>
  getStats()
)

interface ArticleItem {
  id: number
  title: string
  slug: string
  text: string
  created: string
}

const articles = computed<ArticleItem[]>(() => {
  const list = articlesData.value?.list || []
  return list.map(item => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    text: item.excerpt,
    created: item.date
  }))
})

const stats = computed(() => statsData.value)

const quickLinks = [
  { label: '文章', to: '/posts', icon: 'i-lucide-book-open' },
  { label: '日记', to: '/notes', icon: 'i-lucide-notebook' },
  { label: '项目', to: '/projects', icon: 'i-lucide-code' },
  { label: '友链', to: '/friends', icon: 'i-lucide-link' }
]

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-sujian-paper via-sujian-paper to-sujian-cyan/5">
    <!-- Hero Section -->
    <section class="px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h1 class="font-serif text-4xl font-bold text-sujian-ink-primary dark:text-sujian-ink-light">
          欢迎来到我的数字花园
        </h1>
        <p class="mt-4 text-lg text-sujian-ink-secondary">
          分享想法、记录生活、探索技术
        </p>
      </div>
    </section>

    <!-- Quick Links -->
    <section class="px-4 py-8 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <NuxtLink
            v-for="link in quickLinks"
            :key="link.to"
            :to="link.to"
            class="flex flex-col items-center gap-2 rounded-lg border border-sujian-ink-primary/10 bg-sujian-paper/50 px-4 py-6 transition-all hover:border-sujian-cinnabar hover:shadow-md"
          >
            <UIcon
              :name="link.icon"
              class="h-6 w-6 text-sujian-cinnabar"
            />
            <span class="text-sm font-medium text-sujian-ink-primary">{{ link.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      v-if="stats"
      class="px-4 py-8 sm:px-6 lg:px-8"
    >
      <div class="mx-auto max-w-4xl">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div
            v-for="(value, key) in stats"
            :key="key"
            class="rounded-lg bg-white/50 px-4 py-6 text-center dark:bg-sujian-ink-primary/5"
          >
            <div class="text-2xl font-bold text-sujian-cinnabar">
              {{ value }}
            </div>
            <div class="mt-2 text-sm text-sujian-ink-secondary">
              {{ key }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Articles -->
    <section class="px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-4xl">
        <h2 class="mb-8 font-serif text-2xl font-bold text-sujian-ink-primary">
          最新文章
        </h2>

        <div
          v-if="articles.length > 0"
          class="space-y-6"
        >
          <NuxtLink
            v-for="article in articles"
            :key="article.id"
            :to="`/posts/${article.slug}`"
            class="group block rounded-lg border border-sujian-ink-primary/10 bg-white/50 p-6 transition-all hover:border-sujian-cinnabar hover:shadow-md dark:bg-sujian-ink-primary/5"
          >
            <h3 class="font-serif text-xl font-semibold text-sujian-ink-primary group-hover:text-sujian-cinnabar">
              {{ article.title }}
            </h3>
            <p class="mt-2 line-clamp-2 text-sujian-ink-secondary">
              {{ article.text }}
            </p>
            <div class="mt-4 flex items-center justify-between text-sm text-sujian-ink-secondary">
              <span>{{ formatDate(article.created) }}</span>
              <span class="text-sujian-cinnabar">→</span>
            </div>
          </NuxtLink>
        </div>

        <div
          v-else
          class="rounded-lg bg-white/30 p-8 text-center"
        >
          <p class="text-sujian-ink-secondary">
            暂无文章
          </p>
        </div>

        <NuxtLink
          to="/posts"
          class="mt-8 inline-block rounded-lg bg-sujian-cinnabar px-6 py-3 font-medium text-white transition-all hover:shadow-lg"
        >
          查看全部文章 →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 页面特定样式 */
</style>
