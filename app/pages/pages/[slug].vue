<script setup lang="ts">
import { computed } from 'vue'

interface Page {
  id: number
  title: string
  slug: string
  content: string
  createdAt: string
  updatedAt: string
}

const pagesData: Record<string, Page> = {
  about: {
    id: 1,
    title: '关于本站',
    slug: 'about',
    content: `
## 关于本站

这是一个基于 Nuxt 4 和素笺主题构建的个人站点。

### 技术栈

- Nuxt 4
- Vue 3
- Tailwind CSS v4
- Nuxt UI

### 设计理念

素笺主题汲取中国传统文房四宝的灵感，将"纸、墨、笔、砚"的元素转化为现代Web界面语言。
`,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-15'
  },
  links: {
    id: 2,
    title: '友情链接',
    slug: 'links',
    content: `
## 友情链接

欢迎与本站交换友链。

### 本站信息

- 名称：素笺
- 地址：https://example.com
- 描述：以纸为媒，以墨为韵
`,
    createdAt: '2026-01-01',
    updatedAt: '2026-01-10'
  }
}

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const page = computed(() => {
  return pagesData[slug.value] || null
})

useSeoMeta({
  title: computed(() => page.value ? `${page.value.title} - 素笺` : '页面未找到'),
  description: computed(() => page.value?.content?.slice(0, 160) || ''),
  ogTitle: computed(() => page.value?.title || '素笺'),
  ogDescription: computed(() => page.value?.content?.slice(0, 160) || ''),
  ogType: 'website'
})
</script>

<template>
  <div
    v-if="page"
    class="page-detail"
  >
    <header class="page-header">
      <div class="header-container">
        <h1 class="page-title">
          {{ page.title }}
        </h1>
        <div class="title-divider" />
      </div>
    </header>

    <main class="page-content">
      <SujianCard>
        <div class="content-wrapper">
          <MarkdownRenderer :content="page.content" />
        </div>
      </SujianCard>
    </main>
  </div>

  <div
    v-else
    class="not-found"
  >
    <SujianCard>
      <div class="not-found-content">
        <h1>页面未找到</h1>
        <p>抱歉，您访问的页面不存在或已被删除。</p>
        <NuxtLink
          to="/"
          class="back-link"
        >返回首页</NuxtLink>
      </div>
    </SujianCard>
  </div>
</template>

<style scoped>
.page-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-container {
  display: inline-block;
  text-align: left;
}

.page-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0 0 1rem 0;
  line-height: 1.3;
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

.page-content {
  margin-bottom: 3rem;
}

.content-wrapper {
  padding: 2.5rem 2rem;
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
  .page-detail {
    padding: 1.5rem 1rem 3rem;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .content-wrapper {
    padding: 1.5rem 1.25rem;
  }
}
</style>
