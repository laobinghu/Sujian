<script setup lang="ts">
interface Activity {
  id: number
  type: 'post' | 'note' | 'project' | 'other'
  title: string
  description: string
  date: string
  link?: string
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'post',
    title: '发布新文章',
    description: '《素笺主题设计理念》已发布',
    date: '2026-01-15',
    link: '/posts/design/sujian-design-philosophy'
  },
  {
    id: 2,
    type: 'note',
    title: '更新日记',
    description: '今天完成了素笺主题的基础框架搭建',
    date: '2026-01-14',
    link: '/notes/1001'
  },
  {
    id: 3,
    type: 'project',
    title: '新建项目',
    description: '素笺 Nuxt UI 主题项目启动',
    date: '2026-01-10',
    link: '/projects/sujian'
  }
]

const getTypeIcon = (type: string) => {
  const icons: Record<string, string> = {
    post: '📝',
    note: '📔',
    project: '🚀',
    other: '💡'
  }
  return icons[type] || '💡'
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useSeoMeta({
  title: '动态 - 素笺',
  description: '站点最新动态',
  ogTitle: '动态 - 素笺',
  ogDescription: '站点最新动态'
})
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">
        动态
      </h1>
      <p class="page-subtitle">
        站点最新动态
      </p>
      <div class="header-divider" />
    </header>

    <main class="activities-list">
      <SujianCard
        v-for="activity in activities"
        :key="activity.id"
      >
        <component
          :is="activity.link ? 'NuxtLink' : 'div'"
          :to="activity.link"
          class="activity-item"
          :class="{ 'is-link': !!activity.link }"
        >
          <div class="activity-icon">
            {{ getTypeIcon(activity.type) }}
          </div>
          <div class="activity-content">
            <div class="activity-header">
              <h3 class="activity-title">
                {{ activity.title }}
              </h3>
              <time class="activity-date">{{ formatDate(activity.date) }}</time>
            </div>
            <p class="activity-desc">
              {{ activity.description }}
            </p>
          </div>
        </component>
      </SujianCard>
    </main>
  </div>
</template>

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

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
}

.activity-item.is-link {
  transition: all 0.2s ease;
}

.activity-item.is-link:hover {
  transform: translateX(4px);
}

.activity-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--sujian-paper-dark);
  border-radius: 50%;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.activity-title {
  font-family: var(--font-serif);
  font-size: 1.125rem;
  color: var(--sujian-ink-primary);
  margin: 0;
  font-weight: 600;
}

.activity-date {
  font-size: 0.875rem;
  color: var(--sujian-ink-tertiary);
}

.activity-desc {
  font-size: 0.9375rem;
  color: var(--sujian-ink-secondary);
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }
}
</style>
