<script setup lang="ts">
interface Article {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
  tags: string[]
}

const articles: Article[] = [
  {
    id: 1,
    title: '素笺主题设计理念',
    excerpt: '探索中式美学在现代Web设计中的运用，以"素笺"为载体，传承传统文化精髓。',
    date: '2026-01-15',
    readTime: '5 min',
    category: 'design',
    slug: 'sujian-design-philosophy',
    tags: ['设计', '主题', '中式']
  },
  {
    id: 2,
    title: 'Nuxt 4 开发实践',
    excerpt: '基于 Nuxt 4 构建高性能网站的最佳实践，包括性能优化、SEO配置等。',
    date: '2026-01-10',
    readTime: '8 min',
    category: 'frontend',
    slug: 'nuxt-4-practices',
    tags: ['Nuxt', 'Vue', '前端']
  },
  {
    id: 3,
    title: 'Mix Space Core 前端架构',
    excerpt: '深入解析 Mix Space Core 的前端架构设计，了解模块化和组件化实践。',
    date: '2026-01-05',
    readTime: '12 min',
    category: 'architecture',
    slug: 'mix-space-core-architecture',
    tags: ['Mix Space', '架构', 'TypeScript']
  }
]

const quickLinks = [
  { label: '日记', to: '/notes', icon: 'i-lucide-book-open', description: '记录生活点滴' },
  { label: '友链', to: '/friends', icon: 'i-lucide-link', description: '友情链接' },
  { label: '项目', to: '/projects', icon: 'i-lucide-folder-git', description: '我的项目' },
  { label: '时间线', to: '/timeline', icon: 'i-lucide-clock', description: '文章归档' }
]

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="home-page">
    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          素笺
        </h1>
        <p class="hero-subtitle">
          以纸为媒，以墨为韵，记录技术与设计的思考
        </p>
        <div class="hero-divider" />
        <div class="hero-actions">
          <NuxtLink
            to="/posts"
            class="hero-btn primary"
          >
            浏览文章
          </NuxtLink>
          <NuxtLink
            to="/notes/latest"
            class="hero-btn secondary"
          >
            最新日记
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 快捷入口 -->
    <section class="quick-links">
      <div class="section-header">
        <h2 class="section-title">
          探索
        </h2>
        <div class="section-divider" />
      </div>
      <div class="quick-links-grid">
        <NuxtLink
          v-for="link in quickLinks"
          :key="link.to"
          :to="link.to"
          class="quick-link-card"
        >
          <UIcon
            :name="link.icon"
            class="quick-link-icon"
          />
          <h3 class="quick-link-label">{{ link.label }}</h3>
          <p class="quick-link-desc">{{ link.description }}</p>
        </NuxtLink>
      </div>
    </section>

    <!-- 最新文章 -->
    <section class="recent-articles">
      <div class="section-header">
        <h2 class="section-title">
          最新文章
        </h2>
        <div class="section-divider" />
        <NuxtLink
          to="/posts"
          class="view-all-link"
        >
          查看全部 →
        </NuxtLink>
      </div>
      <div class="articles-list">
        <SujianCard
          v-for="article in articles"
          :key="article.id"
        >
          <article class="article-item">
            <header class="article-header">
              <NuxtLink
                :to="`/posts/${article.category}/${article.slug}`"
                class="article-title-link"
              >
                <h3 class="article-title">{{ article.title }}</h3>
              </NuxtLink>
              <div class="article-meta">
                <time :datetime="article.date">{{ formatDate(article.date) }}</time>
                <span class="meta-separator">·</span>
                <span>{{ article.readTime }} 阅读</span>
              </div>
            </header>
            <p class="article-excerpt">
              {{ article.excerpt }}
            </p>
            <footer class="article-footer">
              <div class="article-tags">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
              <NuxtLink
                :to="`/posts/${article.category}/${article.slug}`"
                class="read-more"
                :aria-label="`阅读全文：${article.title}`"
              >
                阅读全文 <span class="arrow">→</span>
              </NuxtLink>
            </footer>
          </article>
        </SujianCard>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

/* Hero 区域 */
.hero {
  text-align: center;
  padding: 4rem 0 3rem;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--sujian-ink-primary);
  margin: 0 0 1rem 0;
  letter-spacing: 0.1em;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: var(--sujian-ink-secondary);
  margin: 0 0 1.5rem 0;
  line-height: 1.8;
}

.hero-divider {
  width: 60px;
  height: 2px;
  background-color: var(--sujian-cinnabar);
  margin: 0 auto 2rem;
  opacity: 0.4;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.hero-btn.primary {
  background-color: var(--sujian-cinnabar);
  color: white;
}

.hero-btn.primary:hover {
  background-color: var(--sujian-cinnabar-light);
  transform: translateY(-1px);
  box-shadow: var(--sujian-shadow-md);
}

.hero-btn.secondary {
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-primary);
}

.hero-btn.secondary:hover {
  background-color: var(--sujian-ink-tertiary);
  color: white;
  transform: translateY(-1px);
}

/* 快捷入口 */
.quick-links {
  margin-bottom: 4rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0 0 0.75rem 0;
}

.section-divider {
  width: 40px;
  height: 2px;
  background-color: var(--sujian-cinnabar);
  margin: 0 auto;
  opacity: 0.3;
}

.view-all-link {
  position: absolute;
  right: 0;
  top: 0.5rem;
  font-size: 0.875rem;
  color: var(--sujian-cinnabar);
  text-decoration: none;
  font-weight: 500;
}

.view-all-link:hover {
  text-decoration: underline;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.quick-link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 1rem;
  text-decoration: none;
  color: inherit;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.quick-link-card:hover {
  background-color: var(--sujian-paper-dark);
  transform: translateY(-2px);
}

.quick-link-icon {
  width: 2rem;
  height: 2rem;
  color: var(--sujian-cinnabar);
  margin-bottom: 0.75rem;
}

.quick-link-label {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0 0 0.25rem 0;
}

.quick-link-desc {
  font-size: 0.8125rem;
  color: var(--sujian-ink-tertiary);
  margin: 0;
}

/* 最新文章 */
.recent-articles {
  margin-bottom: 2rem;
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.article-item {
  padding: 1.5rem;
}

.article-header {
  margin-bottom: 0.75rem;
}

.article-title-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.article-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--sujian-ink-primary);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.article-title-link:hover .article-title {
  color: var(--sujian-cinnabar);
}

.article-meta {
  font-size: 0.8125rem;
  color: var(--sujian-ink-tertiary);
}

.meta-separator {
  margin: 0 0.5rem;
  opacity: 0.6;
}

.article-excerpt {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--sujian-ink-secondary);
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-secondary);
  border-radius: 3px;
  opacity: 0.8;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: var(--sujian-cinnabar);
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.2s ease;
}

.read-more:hover {
  gap: 0.5rem;
}

.arrow {
  transition: transform 0.2s ease;
}

.read-more:hover .arrow {
  transform: translateX(2px);
}

/* 响应式 */
@media (max-width: 768px) {
  .home-page {
    padding: 2rem 1rem 3rem;
  }

  .hero {
    padding: 2rem 0 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .quick-links-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .section-header {
    margin-bottom: 1.5rem;
  }

  .view-all-link {
    position: static;
    display: block;
    margin-top: 0.75rem;
  }

  .article-item {
    padding: 1.25rem;
  }
}
</style>
