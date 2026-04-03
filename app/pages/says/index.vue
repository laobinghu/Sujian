<script setup lang="ts">
interface Say {
  id: number
  content: string
  author: string
  source: string
  createdAt: string
}

const say: Say = {
  id: 1,
  content: '生活不止眼前的苟且，还有诗和远方。',
  author: '高晓松',
  source: '《生活不止眼前的苟且》',
  createdAt: '2026-01-15'
}

useSeoMeta({
  title: '一言 - 素笺',
  description: '每日一句经典语录',
  ogTitle: '一言 - 素笺',
  ogDescription: '每日一句经典语录'
})
</script>

<template>
  <div class="page-container">
    <header class="page-header">
      <h1 class="page-title">
        一言
      </h1>
      <div class="header-divider" />
    </header>

    <main class="say-content">
      <SujianCard>
        <div class="content-wrapper">
          <blockquote class="quote">
            <p class="quote-text">
              {{ say.content }}
            </p>
            <footer class="quote-footer">
              <cite>{{ say.author }}</cite>
              <span class="quote-source">—— {{ say.source }}</span>
            </footer>
          </blockquote>
        </div>
      </SujianCard>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 700px;
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

.header-divider {
  width: 60px;
  height: 2px;
  background-color: var(--sujian-cinnabar);
  margin: 1.5rem auto 0;
  opacity: 0.3;
}

.content-wrapper {
  padding: 3rem 2rem;
}

.quote {
  margin: 0;
  padding: 0;
  border: none;
  text-align: center;
}

.quote-text {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  line-height: 1.8;
  color: var(--sujian-ink-primary);
  margin: 0 0 1.5rem 0;
  font-weight: 400;
}

.quote-footer {
  font-size: 1rem;
  color: var(--sujian-ink-secondary);
}

.quote-footer cite {
  font-style: normal;
  font-weight: 500;
}

.quote-source {
  margin-left: 0.5rem;
  opacity: 0.7;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1.5rem 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .quote-text {
    font-size: 1.25rem;
  }

  .content-wrapper {
    padding: 2rem 1.5rem;
  }
}
</style>
