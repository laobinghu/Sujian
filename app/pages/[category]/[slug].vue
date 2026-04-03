<script setup lang="ts">
import { computed } from 'vue'

interface Article {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
  tags: string[]
}

const articlesData: Article[] = [
  {
    id: 1,
    title: '素笺主题设计理念',
    excerpt: '探索中式美学在现代Web设计中的运用，以"素笺"为载体，传承传统文化精髓。',
    date: '2026-01-15',
    readTime: '5 min',
    category: 'design',
    slug: 'sujian-design-philosophy',
    tags: ['设计', '主题', '中式']
  },
  {
    id: 2,
    title: 'Nuxt 4 开发实践',
    excerpt: '基于 Nuxt 4 构建高性能网站的最佳实践，包括性能优化、SEO配置等。',
    date: '2026-01-10',
    readTime: '8 min',
    category: 'frontend',
    slug: 'nuxt-4-practices',
    tags: ['Nuxt', 'Vue', '前端']
  },
  {
    id: 3,
    title: 'Mix Space Core 前端架构',
    excerpt: '深入解析 Mix Space Core 的前端架构设计，了解模块化和组件化实践。',
    date: '2026-01-05',
    readTime: '12 min',
    category: 'architecture',
    slug: 'mix-space-core-architecture',
    tags: ['Mix Space', '架构', 'TypeScript']
  },
  {
    id: 4,
    title: 'CSS 变量与主题系统',
    excerpt: '使用 CSS 自定义属性构建灵活的主题系统，实现一键切换配色和字体。',
    date: '2025-12-28',
    readTime: '6 min',
    category: 'design',
    slug: 'css-variables-theme-system',
    tags: ['CSS', '主题', '设计系统']
  }
]

const route = useRoute()
const category = computed(() => route.params.category as string)
const slug = computed(() => route.params.slug as string)

const article = computed(() => {
  return articlesData.find(a => a.category === category.value && a.slug === slug.value) || null
})

if (article.value) {
  navigateTo(`/posts/${category.value}/${slug.value}`, { redirectCode: 302 })
}

useSeoMeta({
  title: '重定向中...',
  description: '正在跳转到文章详情页'
})
</script>

<template>
  <div class="redirect-container">
    <p>正在跳转到文章详情页...</p>
    <NuxtLink
      v-if="article"
      :to="`/posts/${category}/${slug}`"
      class="redirect-link"
    >
      如果没有自动跳转，请点击这里
    </NuxtLink>
  </div>
</template>

<style scoped>
.redirect-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: 2rem;
}

.redirect-container p {
  font-size: 1.125rem;
  color: var(--sujian-ink-secondary);
  margin: 0 0 1.5rem 0;
}

.redirect-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--sujian-cinnabar);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
}

.redirect-link:hover {
  background-color: var(--sujian-cinnabar-light);
}
</style>
