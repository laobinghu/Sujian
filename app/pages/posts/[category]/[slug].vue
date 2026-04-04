<script setup lang="ts">
import { computed } from 'vue'

// 模拟文章数据（实际应从 API 获取）
interface Article {
  id: number
  title: string
  date: string
  readTime: string
  category: string
  slug: string
  content: string
}

const articlesData: Record<string, Article> = {
  'design/sujian-design-philosophy': {
    id: 1,
    title: '素笺主题设计理念',
    date: '2026-01-15',
    readTime: '5 min',
    category: 'design',
    slug: 'sujian-design-philosophy',
    content: `
## 设计哲学

素笺主题汲取中国传统文房四宝的灵感，将"纸、墨、笔、砚"的元素转化为现代Web界面语言。

### 纸之色

采用米黄色为基底，模拟宣纸的自然色泽。通过多层半透明的噪点滤镜，营造出宣纸的纤维质感。

### 墨之韵

墨色分为主、次、辅三级，模拟书法中的浓淡干湿。朱砂红作为点缀，象征印章的点睛之笔。

### 字之姿

字体选用思源宋体和思源黑体，分别对应传统书写与现代阅读场景。通过 localStorage 实现字体切换，让用户选择自己的阅读偏好。

### 形之意

窗棂纹、信笺格、印章等中式元素，以现代极简手法重新演绎，避免过度装饰，保持界面清爽。

## 技术实现

本主题基于 Nuxt 4 + Tailwind CSS v4 + Nuxt UI 构建，充分利用现代前端框架的优势。

## 总结

素笺主题不仅是一套视觉规范，更是对传统文化的致敬与创新。
`
  }
}

const route = useRoute()
const { category, slug } = route.params

// 根据路由参数获取文章
const article = computed(() => {
  const key = `${category}/${slug}`
  return articlesData[key] || null
})

// 返回顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// SEO 元数据
useSeoMeta({
  title: computed(() => article.value ? `${article.value.title} - 素笺` : '文章未找到'),
  description: computed(() => article.value?.content?.slice(0, 160) || ''),
  ogTitle: computed(() => article.value?.title || '素笺'),
  ogDescription: computed(() => article.value?.content?.slice(0, 160) || ''),
  ogType: 'article'
})
</script>

<template>
  <div
    v-if="article"
    class="article-detail"
  >
    <header class="article-header">
      <div class="header-container">
        <h1 class="article-title">
          {{ article.title }}
        </h1>
        <div class="article-meta">
          <time :datetime="article.date">{{ article.date }}</time>
          <span class="meta-separator">·</span>
          <span>{{ article.readTime }} 阅读</span>
        </div>
        <div
          class="title-divider"
          aria-hidden="true"
        />
      </div>
    </header>

    <main class="article-content">
      <SujianCard>
        <div class="content-wrapper sujian-lines">
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="markdown-body"
            v-html="article.content"
          />
          <!-- eslint-enable vue/no-v-html -->
        </div>
      </SujianCard>
    </main>

    <footer class="article-footer">
      <button
        class="back-to-top"
        aria-label="返回顶部"
        @click="scrollToTop"
      >
        返回顶部
      </button>
    </footer>
  </div>

  <div
    v-else
    class="not-found"
  >
    <SujianCard>
      <div class="not-found-content">
        <h1>文章未找到</h1>
        <p>抱歉，您访问的文章不存在或已被删除。</p>
        <NuxtLink
          to="/posts"
          class="back-link"
        >返回文章列表</NuxtLink>
      </div>
    </SujianCard>
  </div>
</template>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.article-header {
  text-align: center;
  margin-bottom: 3rem;
}

.header-container {
  display: inline-block;
  text-align: left;
}

.article-title {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0 0 1rem 0;
  line-height: 1.3;
}

.article-meta {
  font-size: 0.875rem;
  color: var(--sujian-ink-tertiary);
  margin-bottom: 1.5rem;
}

.meta-separator {
  margin: 0 0.5rem;
  opacity: 0.6;
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

.article-content {
  margin-bottom: 3rem;
}

.content-wrapper {
  padding: 2.5rem 2rem;
  position: relative;
}

.markdown-body {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--sujian-ink-primary);
}

.markdown-body :deep(h1),
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

.markdown-body :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  border-left: 3px solid var(--sujian-cinnabar);
  background-color: var(--sujian-paper-base);
  font-style: italic;
}

.article-footer {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: var(--sujian-cinnabar);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--sujian-shadow-sm);
}

.back-to-top:hover {
  background-color: var(--sujian-cinnabar-light);
  box-shadow: var(--sujian-shadow-md);
  transform: translateY(-1px);
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
  .article-detail {
    padding: 1.5rem 1rem 3rem;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .content-wrapper {
    padding: 1.5rem 1.25rem;
  }

  .markdown-body {
    font-size: 1rem;
  }

  .markdown-body :deep(h2) {
    font-size: 1.5rem;
  }

  .markdown-body :deep(h3) {
    font-size: 1.25rem;
  }
}
</style>
