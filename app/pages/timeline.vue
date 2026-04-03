<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">
        时间线
      </h1>
      <p class="page-subtitle">
        按时间顺序浏览所有文章
      </p>
      <div class="header-divider" />
    </header>

    <main class="timeline-content">
      <SujianCard>
        <div class="content-wrapper">
          <div
            v-for="(group, year) in articlesByYear"
            :key="year"
            class="timeline-year"
          >
            <h2 class="year-title">
              {{ year }}
            </h2>
            <div class="timeline-articles">
              <NuxtLink
                v-for="article in group"
                :key="article.slug"
                :to="`/posts/${article.category}/${article.slug}`"
                class="timeline-item"
              >
                <div class="timeline-dot" />
                <div class="timeline-card">
                  <time class="timeline-date">{{ formatDate(article.date) }}</time>
                  <h3 class="timeline-title">{{ article.title }}</h3>
                  <span class="timeline-category">{{ getCategoryName(article.category) }}</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </SujianCard>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Article {
  title: string
  date: string
  category: string
  slug: string
}

const articlesData: Article[] = [
  { title: '素笺主题设计理念', date: '2026-01-15', category: 'design', slug: 'sujian-design-philosophy' },
  { title: 'Nuxt 4 开发实践', date: '2026-01-10', category: 'frontend', slug: 'nuxt-4-practices' },
  { title: 'Mix Space Core 前端架构', date: '2026-01-05', category: 'architecture', slug: 'mix-space-core-architecture' },
  { title: 'CSS 变量与主题系统', date: '2025-12-28', category: 'design', slug: 'css-variables-theme-system' }
]

const articlesByYear = computed(() => {
  const grouped: Record<string, Article[]> = {}
  articlesData.forEach((article) => {
    const year = article.date.split('-')[0]
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(article)
  })

  const sorted: Record<string, Article[]> = {}
  Object.keys(grouped)
    .sort((a, b) => Number(b) - Number(a))
    .forEach((key) => {
      sorted[key] = grouped[key].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    })

  return sorted
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' })
}

const getCategoryName = (slug: string) => {
  const names: Record<string, string> = {
    design: '设计',
    frontend: '前端开发',
    architecture: '架构'
  }
  return names[slug] || slug
}

useSeoMeta({
  title: '时间线 - 素笺',
  description: '按时间顺序浏览所有文章',
  ogTitle: '时间线 - 素笺',
  ogDescription: '按时间顺序浏览所有文章'
})
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  color: var(--sujian-ink-primary);
  margin: 0 0 0.5rem 0;
  font-weight: 600;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--sujian-ink-secondary);
  margin: 0;
}

.header-divider {
  width: 60px;
  height: 2px;
  background-color: var(--sujian-cinnabar);
  margin: 1.5rem auto 0;
  opacity: 0.3;
}

.content-wrapper {
  padding: 2rem 1.5rem;
}

.timeline-year {
  margin-bottom: 2.5rem;
}

.timeline-year:last-child {
  margin-bottom: 0;
}

.year-title {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--sujian-ink-primary);
  margin: 0 0 1.5rem 0;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--sujian-paper-dark);
}

.timeline-articles {
  position: relative;
  padding-left: 2rem;
}

.timeline-articles::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--sujian-paper-dark);
}

.timeline-item {
  position: relative;
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1rem 0 1rem 1.5rem;
  transition: all 0.2s ease;
}

.timeline-item:hover {
  transform: translateX(4px);
}

.timeline-dot {
  position: absolute;
  left: -1.5rem;
  top: 1.25rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--sujian-cinnabar);
  border: 3px solid var(--sujian-paper-light);
  z-index: 1;
}

.timeline-card {
  padding: 1rem 1.25rem;
  background-color: var(--sujian-paper-dark);
  border-radius: 4px;
}

.timeline-date {
  font-size: 0.875rem;
  color: var(--sujian-ink-tertiary);
}

.timeline-title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  color: var(--sujian-ink-primary);
  margin: 0.5rem 0;
  font-weight: 600;
}

.timeline-category {
  display: inline-block;
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  background-color: var(--sujian-paper-base);
  color: var(--sujian-ink-secondary);
  border-radius: 3px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .content-wrapper {
    padding: 1.5rem 1rem;
  }
}
</style>
