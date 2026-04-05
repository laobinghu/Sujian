<script setup lang="ts">
import { ref, computed } from 'vue'
import { useArticles } from '~/composables/useArticles'

const page = ref(1)
const pageSize = 10
const { getList } = useArticles()

const { data: articlesData, pending: _pending, error: _error } = await useAsyncData(
  `articles-page-${page.value}`,
  () => getList(page.value, pageSize)
)

const articles = computed(() => articlesData.value?.list || [])
</script>

<template>
  <div class="page-container">
    <!-- 页面标题区 -->
    <header class="page-header">
      <h1 class="page-title">
        素笺文章
      </h1>
      <p class="page-subtitle">
        以纸为媒，以墨为韵，记录技术与设计的思考
      </p>
      <div
        class="header-divider"
        aria-hidden="true"
      />
    </header>

    <!-- 文章列表 -->
    <main class="articles-grid">
      <SujianCard
        v-for="article in articles"
        :key="article.id"
      >
        <article class="article-card">
          <header class="article-header">
            <NuxtLink
              :to="`/posts/${article.category}/${article.slug}`"
              class="article-title-link"
            >
              <h2 class="article-title">{{ article.title }}</h2>
            </NuxtLink>
            <div class="article-meta">
              <time :datetime="article.date">{{ article.date }}</time>
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
              class="read-more-link"
              :aria-label="`阅读全文：${article.title}`"
            >
              阅读全文
              <span
                class="arrow"
                aria-hidden="true"
              >→</span>
            </NuxtLink>
          </footer>
        </article>
      </SujianCard>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
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

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 2rem;
}

.article-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.article-header {
  margin-bottom: 1rem;
}

.article-title-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.article-title {
  font-family: var(--font-serif);
  font-size: 1.375rem;
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
  font-size: 0.875rem;
  color: var(--sujian-ink-tertiary);
}

.meta-separator {
  margin: 0 0.5rem;
  opacity: 0.6;
}

.article-excerpt {
  flex: 1;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--sujian-ink-secondary);
  margin: 0 0 1.5rem 0;
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
  padding: 0.25rem 0.625rem;
  background-color: var(--sujian-paper-dark);
  color: var(--sujian-ink-secondary);
  border-radius: 3px;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.tag:hover {
  opacity: 1;
}

.read-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: var(--sujian-cinnabar);
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.2s ease;
}

.read-more-link:hover {
  gap: 0.5rem;
}

.arrow {
  transition: transform 0.2s ease;
}

.read-more-link:hover .arrow {
  transform: translateX(2px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
