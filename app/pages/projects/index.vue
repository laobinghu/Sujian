<script setup lang="ts">
interface Project {
  id: string
  name: string
  description: string
  url: string
  github?: string
  tags: string[]
  status: 'active' | 'archived' | 'wip'
  createdAt: string
}

const projects: Project[] = [
  {
    id: 'sujian',
    name: '素笺主题',
    description: '基于 Nuxt 4 的中式美学博客主题',
    url: '/',
    github: 'https://github.com/example/sujian',
    tags: ['Nuxt', 'Vue', 'Tailwind CSS'],
    status: 'active',
    createdAt: '2026-01-01'
  },
  {
    id: 'mx-core',
    name: 'Mix Space Core',
    description: '现代化的博客系统核心框架',
    url: 'https://mx-space.js.org',
    github: 'https://github.com/mx-space/core',
    tags: ['TypeScript', 'Node.js'],
    status: 'active',
    createdAt: '2025-06-15'
  }
]

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    active: '进行中',
    archived: '已归档',
    wip: '开发中'
  }
  return labels[status] || status
}

const getStatusClass = (status: string) => {
  return `status-${status}`
}

useSeoMeta({
  title: '项目 - 素笺',
  description: '我的项目列表',
  ogTitle: '项目 - 素笺',
  ogDescription: '我的项目列表'
})
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">
        项目
      </h1>
      <p class="page-subtitle">
        我参与或主导的项目
      </p>
      <div class="header-divider" />
    </header>

    <main class="projects-grid">
      <SujianCard
        v-for="project in projects"
        :key="project.id"
      >
        <article class="project-card">
          <header class="project-header">
            <h2 class="project-name">
              <NuxtLink
                :to="project.url"
                class="project-link"
              >
                {{ project.name }}
              </NuxtLink>
            </h2>
            <span
              class="project-status"
              :class="getStatusClass(project.status)"
            >
              {{ getStatusLabel(project.status) }}
            </span>
          </header>

          <p class="project-desc">
            {{ project.description }}
          </p>

          <div class="project-tags">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>

          <footer class="project-footer">
            <NuxtLink
              :to="project.url"
              class="project-action"
            >
              查看详情
            </NuxtLink>
            <a
              v-if="project.github"
              :href="project.github"
              class="project-action secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </footer>
        </article>
      </SujianCard>
    </main>
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.project-name {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  margin: 0;
  font-weight: 600;
}

.project-link {
  color: var(--sujian-ink-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.project-link:hover {
  color: var(--sujian-cinnabar);
}

.project-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: 3px;
  font-weight: 500;
  white-space: nowrap;
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

.project-desc {
  font-size: 0.9375rem;
  color: var(--sujian-ink-secondary);
  line-height: 1.6;
  margin: 0 0 1rem 0;
  flex: 1;
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

.project-footer {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.project-action {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--sujian-cinnabar);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.project-action:hover {
  background-color: var(--sujian-cinnabar-light);
}

.project-action.secondary {
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-primary);
}

.project-action.secondary:hover {
  background-color: var(--sujian-ink-tertiary);
  color: white;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
