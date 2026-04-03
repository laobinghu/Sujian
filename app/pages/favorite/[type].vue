<script setup lang="ts">
import { computed } from 'vue'

interface FavoriteItem {
  id: number
  title: string
  description: string
  url: string
  image?: string
  tags: string[]
}

const route = useRoute()
const type = computed(() => route.params.type as string)

const favoritesMap: Record<string, FavoriteItem[]> = {
  websites: [
    {
      id: 1,
      title: 'Mix Space',
      description: '现代化的博客系统框架',
      url: 'https://mx-space.js.org',
      tags: ['博客', '框架']
    },
    {
      id: 2,
      title: 'Nuxt',
      description: '直观的 Vue 框架',
      url: 'https://nuxt.com',
      tags: ['框架', 'Vue']
    }
  ],
  tools: [
    {
      id: 1,
      title: 'VS Code',
      description: '强大的代码编辑器',
      url: 'https://code.visualstudio.com',
      tags: ['编辑器', '开发']
    }
  ],
  articles: [
    {
      id: 1,
      title: 'Tailwind CSS v4 新特性',
      description: '了解 Tailwind CSS v4 的重大更新',
      url: 'https://tailwindcss.com',
      tags: ['CSS', '前端']
    }
  ]
}

const favorites = computed(() => {
  return favoritesMap[type.value] || []
})

const typeName = computed(() => {
  const names: Record<string, string> = {
    websites: '网站收藏',
    tools: '工具收藏',
    articles: '文章收藏'
  }
  return names[type.value] || `${type.value}收藏`
})

useSeoMeta({
  title: computed(() => `${typeName.value} - 素笺`),
  description: computed(() => `${typeName.value}列表`),
  ogTitle: computed(() => `${typeName.value} - 素笺`),
  ogDescription: computed(() => `${typeName.value}列表`)
})
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">
        {{ typeName }}
      </h1>
      <div class="header-divider" />
    </header>

    <main
      v-if="favorites.length > 0"
      class="favorites-grid"
    >
      <SujianCard
        v-for="item in favorites"
        :key="item.id"
      >
        <a
          :href="item.url"
          class="favorite-card"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3 class="favorite-title">{{ item.title }}</h3>
          <p class="favorite-desc">{{ item.description }}</p>
          <div class="favorite-tags">
            <span
              v-for="tag in item.tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </a>
      </SujianCard>
    </main>

    <div
      v-else
      class="empty-state"
    >
      <SujianCard>
        <div class="empty-content">
          <p>暂无该类型的收藏。</p>
          <NuxtLink
            to="/"
            class="back-link"
          >返回首页</NuxtLink>
        </div>
      </SujianCard>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1000px;
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

.header-divider {
  width: 60px;
  height: 2px;
  background-color: var(--sujian-cinnabar);
  margin: 1.5rem auto 0;
  opacity: 0.3;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.favorite-card {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.favorite-card:hover {
  transform: translateY(-2px);
}

.favorite-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  color: var(--sujian-ink-primary);
  margin: 0 0 0.75rem 0;
  font-weight: 600;
}

.favorite-desc {
  font-size: 0.9375rem;
  color: var(--sujian-ink-secondary);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.favorite-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-secondary);
  border-radius: 3px;
}

.empty-content {
  text-align: center;
  padding: 3rem 2rem;
}

.empty-content p {
  color: var(--sujian-ink-secondary);
  margin: 0 0 2rem 0;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--sujian-cinnabar);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
}

.back-link:hover {
  background-color: var(--sujian-cinnabar-light);
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .favorites-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
