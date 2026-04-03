<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">
        站点地图
      </h1>
      <p class="page-subtitle">
        本站所有页面导航
      </p>
      <div class="header-divider" />
    </header>

    <main class="sitemap-content">
      <SujianCard>
        <div class="content-wrapper">
          <section class="sitemap-section">
            <h2 class="section-title">
              主要页面
            </h2>
            <ul class="sitemap-list">
              <li><NuxtLink to="/">主页</NuxtLink></li>
              <li><NuxtLink to="/posts">文章列表</NuxtLink></li>
              <li><NuxtLink to="/notes">日记列表</NuxtLink></li>
              <li><NuxtLink to="/notes/latest">最新日记</NuxtLink></li>
              <li><NuxtLink to="/friends">友情链接</NuxtLink></li>
            </ul>
          </section>

          <section class="sitemap-section">
            <h2 class="section-title">
              分类
            </h2>
            <ul class="sitemap-list">
              <li
                v-for="cat in categories"
                :key="cat.slug"
              >
                <NuxtLink :to="`/category/${cat.slug}`">{{ cat.name }}</NuxtLink>
              </li>
            </ul>
          </section>

          <section class="sitemap-section">
            <h2 class="section-title">
              文章
            </h2>
            <ul class="sitemap-list">
              <li
                v-for="article in articles"
                :key="article.slug"
              >
                <NuxtLink :to="`/posts/${article.category}/${article.slug}`">{{ article.title }}</NuxtLink>
              </li>
            </ul>
          </section>

          <section class="sitemap-section">
            <h2 class="section-title">
              其他
            </h2>
            <ul class="sitemap-list">
              <li><NuxtLink to="/feed">RSS 订阅</NuxtLink></li>
              <li><NuxtLink to="/timeline">时间线</NuxtLink></li>
              <li><NuxtLink to="/recently">动态</NuxtLink></li>
              <li><NuxtLink to="/projects">项目</NuxtLink></li>
            </ul>
          </section>
        </div>
      </SujianCard>
    </main>
  </div>
</template>

<script setup lang="ts">
interface Category {
  name: string
  slug: string
}

interface Article {
  title: string
  category: string
  slug: string
}

const categories: Category[] = [
  { name: '设计', slug: 'design' },
  { name: '前端开发', slug: 'frontend' },
  { name: '架构', slug: 'architecture' }
]

const articles: Article[] = [
  { title: '素笺主题设计理念', category: 'design', slug: 'sujian-design-philosophy' },
  { title: 'Nuxt 4 开发实践', category: 'frontend', slug: 'nuxt-4-practices' },
  { title: 'Mix Space Core 前端架构', category: 'architecture', slug: 'mix-space-core-architecture' },
  { title: 'CSS 变量与主题系统', category: 'design', slug: 'css-variables-theme-system' }
]

useSeoMeta({
  title: '站点地图 - 素笺',
  description: '本站所有页面导航',
  ogTitle: '站点地图 - 素笺',
  ogDescription: '本站所有页面导航'
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

.sitemap-section {
  margin-bottom: 2.5rem;
}

.sitemap-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.375rem;
  color: var(--sujian-ink-primary);
  margin: 0 0 1rem 0;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--sujian-paper-dark);
}

.sitemap-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.sitemap-list li a {
  display: block;
  padding: 0.5rem 0.75rem;
  color: var(--sujian-ink-primary);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.sitemap-list li a:hover {
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-cinnabar);
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .sitemap-list {
    grid-template-columns: 1fr;
  }
}
</style>
