<script setup lang="ts">
import { computed } from 'vue'

interface Project {
  id: string
  name: string
  description: string
  url: string
  github?: string
  tags: string[]
  status: 'active' | 'archived' | 'wip'
  createdAt: string
  content: string
}

const projectsData: Record<string, Project> = {
  'sujian': {
    id: 'sujian',
    name: '素笺主题',
    description: '基于 Nuxt 4 的中式美学博客主题',
    url: '/',
    github: 'https://github.com/example/sujian',
    tags: ['Nuxt', 'Vue', 'Tailwind CSS'],
    status: 'active',
    createdAt: '2026-01-01',
    content: `
## 素笺主题

素笺是一个基于 Nuxt 4 的中式美学博客主题。

### 设计理念

汲取中国传统文房四宝的灵感，将"纸、墨、笔、砚"的元素转化为现代Web界面语言。

### 技术栈

- Nuxt 4
- Vue 3 Composition API
- Tailwind CSS v4
- Nuxt UI v4
- TypeScript

### 特色功能

- 宣纸质感背景
- 墨色分级文字系统
- 字体切换支持
- 响应式设计
`
  },
  'mx-core': {
    id: 'mx-core',
    name: 'Mix Space Core',
    description: '现代化的博客系统核心框架',
    url: 'https://mx-space.js.org',
    github: 'https://github.com/mx-space/core',
    tags: ['TypeScript', 'Node.js'],
    status: 'active',
    createdAt: '2025-06-15',
    content: `
## Mix Space Core

现代化的博客系统核心框架，提供完整的 API 服务。

### 特性

- RESTful API
- 权限管理
- 插件系统
- 高性能
`
  }
}

const route = useRoute()
const id = computed(() => route.params.id as string)

const project = computed(() => {
  return projectsData[id.value] || null
})

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: '进行中',
    archived: '已归档',
    wip: '开发中'
  }
  return labels[status] || status
}

useSeoMeta({
  title: computed(() => project.value ? `${project.value.name} - 项目详情` : '项目未找到'),
  description: computed(() => project.value?.description || ''),
  ogTitle: computed(() => project.value?.name || '素笺'),
  ogDescription: computed(() => project.value?.description || '')
})
</script>

<template>
  <div
    v-if="project"
    class="project-detail"
  >
    <header class="project-header">
      <div class="header-container">
        <h1 class="project-title">
          {{ project.name }}
        </h1>
        <div class="project-meta">
          <span
            class="project-status"
            :class="`status-${project.status}`"
          >
            {{ getStatusLabel(project.status) }}
          </span>
          <time class="project-date">{{ project.createdAt }}</time>
        </div>
        <div class="title-divider" />
      </div>
    </header>

    <main class="project-content">
      <SujianCard>
        <div class="content-wrapper">
          <div class="project-tags">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
          <p class="project-desc">
            {{ project.description }}
          </p>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div
            class="markdown-body"
            v-html="project.content"
          />
        </div>
      </SujianCard>
    </main>

    <footer class="project-footer">
      <NuxtLink
        :to="project.url"
        class="action-btn"
      >
        访问项目
      </NuxtLink>
      <a
        v-if="project.github"
        :href="project.github"
        class="action-btn secondary"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <NuxtLink
        to="/projects"
        class="action-btn back"
      >
        ← 返回列表
      </NuxtLink>
    </footer>
  </div>

  <div
    v-else
    class="not-found"
  >
    <SujianCard>
      <div class="not-found-content">
        <h1>项目未找到</h1>
        <p>抱歉，您访问的项目不存在或已被删除。</p>
        <NuxtLink
          to="/projects"
          class="back-link"
        >返回项目列表</NuxtLink>
      </div>
    </SujianCard>
  </div>
</template>

<style scoped>
.project-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.project-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-container {
  display: inline-block;
  text-align: left;
}

.project-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.project-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.project-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: 3px;
  font-weight: 500;
}

.status-active {
  background-color: #d4edda;
  color: #155724;
}

.status-archived {
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-secondary);
}

.status-wip {
  background-color: #fff3cd;
  color: #856404;
}

.project-date {
  font-size: 0.875rem;
  color: var(--sujian-ink-tertiary);
}

.title-divider {
  width: 100%;
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    var(--sujian-cinnabar) 0,
    var(--sujian-cinnabar) 8px,
    transparent 8px,
    transparent 16px
  );
  opacity: 0.3;
}

.project-content {
  margin-bottom: 3rem;
}

.content-wrapper {
  padding: 2.5rem 2rem;
}

.project-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-secondary);
  border-radius: 3px;
}

.project-desc {
  font-size: 1.0625rem;
  color: var(--sujian-ink-secondary);
  line-height: 1.7;
  margin: 0 0 2rem 0;
}

.markdown-body {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--sujian-ink-primary);
}

.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4) {
  font-family: var(--font-serif);
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-body :deep(h2) {
  font-size: 1.75rem;
  border-bottom: 1px solid var(--sujian-paper-dark);
  padding-bottom: 0.5rem;
}

.markdown-body :deep(h3) {
  font-size: 1.375rem;
}

.markdown-body :deep(p) {
  margin: 1rem 0;
  text-indent: 2em;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-body :deep(li) {
  margin: 0.5rem 0;
  line-height: 1.7;
}

.project-footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--sujian-cinnabar);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background-color: var(--sujian-cinnabar-light);
}

.action-btn.secondary {
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-primary);
}

.action-btn.secondary:hover {
  background-color: var(--sujian-ink-tertiary);
  color: white;
}

.action-btn.back {
  background-color: var(--sujian-paper-base);
  color: var(--sujian-ink-secondary);
}

.action-btn.back:hover {
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-primary);
}

.not-found-content {
  text-align: center;
  padding: 3rem 2rem;
}

.not-found-content h1 {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  margin: 0 0 1rem 0;
}

.not-found-content p {
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
  .project-detail {
    padding: 1.5rem 1rem 3rem;
  }

  .project-title {
    font-size: 1.8rem;
  }

  .content-wrapper {
    padding: 1.5rem 1.25rem;
  }
}
</style>
