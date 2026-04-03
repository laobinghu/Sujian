<script setup lang="ts">
import { computed } from 'vue'

interface Note {
  id: number
  nid: number
  content: string
  createdAt: string
  mood?: string
}

const notesData: Note[] = [
  {
    id: 1,
    nid: 1001,
    content: '今天完成了素笺主题的基础框架搭建，感觉离目标又近了一步。',
    createdAt: '2026-01-15T10:30:00',
    mood: '开心'
  },
  {
    id: 2,
    nid: 1002,
    content: '研究了 Tailwind CSS v4 的新特性，配置引擎的改动确实很大。',
    createdAt: '2026-01-14T15:20:00',
    mood: '专注'
  },
  {
    id: 3,
    nid: 1003,
    content: '周末在家整理了一下书架，发现了不少好书。',
    createdAt: '2026-01-13T09:00:00',
    mood: '惬意'
  }
]

const notes = computed(() => {
  return [...notesData].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useSeoMeta({
  title: '日记 - 素笺',
  description: '记录生活点滴与思考',
  ogTitle: '日记 - 素笺',
  ogDescription: '记录生活点滴与思考'
})
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">
        日记
      </h1>
      <p class="page-subtitle">
        记录生活点滴与思考
      </p>
      <div class="header-divider" />
    </header>

    <main class="notes-list">
      <SujianCard
        v-for="note in notes"
        :key="note.nid"
      >
        <NuxtLink
          :to="`/notes/${note.nid}`"
          class="note-item"
        >
          <div class="note-content">
            <p class="note-text">{{ note.content }}</p>
            <div class="note-meta">
              <time :datetime="note.createdAt">{{ formatDate(note.createdAt) }}</time>
              <span
                v-if="note.mood"
                class="note-mood"
              >
                · {{ note.mood }}
              </span>
            </div>
          </div>
        </NuxtLink>
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

.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.note-item {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
}

.note-item:hover {
  transform: translateX(4px);
}

.note-content {
  padding: 1.5rem;
}

.note-text {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--sujian-ink-primary);
  margin: 0 0 1rem 0;
  text-indent: 2em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.note-meta {
  font-size: 0.875rem;
  color: var(--sujian-ink-tertiary);
}

.note-mood {
  color: var(--sujian-cinnabar);
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
