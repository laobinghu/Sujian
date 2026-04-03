<script setup lang="ts">
import { computed } from 'vue'

interface Note {
  id: number
  nid: number
  content: string
  createdAt: string
  mood?: string
  weather?: string
  images?: string[]
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

const route = useRoute()
const nid = computed(() => Number(route.params.nid))

const note = computed(() => {
  return notesData.find(n => n.nid === nid.value) || null
})

useSeoMeta({
  title: computed(() => note.value ? `日记 #${note.value.nid} - 素笺` : '日记未找到'),
  description: computed(() => note.value?.content?.slice(0, 160) || ''),
  ogTitle: computed(() => note.value ? `日记 #${note.value.nid}` : '素笺'),
  ogDescription: computed(() => note.value?.content?.slice(0, 160) || ''),
  ogType: 'article'
})

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div
    v-if="note"
    class="note-detail"
  >
    <header class="note-header">
      <div class="header-container">
        <h1 class="note-id">
          日记 #{{ note.nid }}
        </h1>
        <div class="note-meta">
          <time :datetime="note.createdAt">{{ formatDate(note.createdAt) }}</time>
          <span
            v-if="note.mood"
            class="note-mood"
          >
            · {{ note.mood }}
          </span>
        </div>
        <div class="title-divider" />
      </div>
    </header>

    <main class="note-content">
      <SujianCard>
        <div class="content-wrapper">
          <p class="note-text">
            {{ note.content }}
          </p>
          <div
            v-if="note.images && note.images.length > 0"
            class="note-images"
          >
            <img
              v-for="(img, index) in note.images"
              :key="index"
              :src="img"
              :alt="`日记图片 ${index + 1}`"
              class="note-image"
            >
          </div>
        </div>
      </SujianCard>
    </main>

    <footer class="note-footer">
      <NuxtLink
        to="/notes"
        class="back-link"
      >
        ← 返回日记列表
      </NuxtLink>
    </footer>
  </div>

  <div
    v-else
    class="not-found"
  >
    <SujianCard>
      <div class="not-found-content">
        <h1>日记未找到</h1>
        <p>抱歉，您访问的日记不存在或已被删除。</p>
        <NuxtLink
          to="/notes"
          class="back-link"
        >返回日记列表</NuxtLink>
      </div>
    </SujianCard>
  </div>
</template>

<style scoped>
.note-detail {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.note-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-container {
  display: inline-block;
  text-align: left;
}

.note-id {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
}

.note-meta {
  font-size: 0.875rem;
  color: var(--sujian-ink-tertiary);
  margin-bottom: 1rem;
}

.note-mood {
  color: var(--sujian-cinnabar);
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

.note-content {
  margin-bottom: 3rem;
}

.content-wrapper {
  padding: 2rem 1.5rem;
}

.note-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--sujian-ink-primary);
  text-indent: 2em;
}

.note-images {
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.note-image {
  max-width: 100%;
  border-radius: 4px;
  box-shadow: var(--sujian-shadow-sm);
}

.note-footer {
  display: flex;
  justify-content: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-primary);
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.back-link:hover {
  background-color: var(--sujian-cinnabar);
  color: white;
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

.not-found-content .back-link {
  background-color: var(--sujian-cinnabar);
  color: white;
}

@media (max-width: 768px) {
  .note-detail {
    padding: 1.5rem 1rem 3rem;
  }

  .note-id {
    font-size: 1.5rem;
  }

  .content-wrapper {
    padding: 1.5rem 1.25rem;
  }
}
</style>
