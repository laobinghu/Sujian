<script setup lang="ts">
defineRouteRules({
  headers: {
    'Content-Type': 'application/rss+xml; charset=utf-8'
  }
})

const siteUrl = 'https://example.com'
const siteTitle = '素笺'
const siteDescription = '以纸为媒，以墨为韵，记录技术与设计的思考'

const articles = [
  {
    title: '素笺主题设计理念',
    description: '探索中式美学在现代Web设计中的运用，以"素笺"为载体，传承传统文化精髓。',
    date: '2026-01-15',
    category: 'design',
    slug: 'sujian-design-philosophy'
  },
  {
    title: 'Nuxt 4 开发实践',
    description: '基于 Nuxt 4 构建高性能网站的最佳实践，包括性能优化、SEO配置等。',
    date: '2026-01-10',
    category: 'frontend',
    slug: 'nuxt-4-practices'
  },
  {
    title: 'Mix Space Core 前端架构',
    description: '深入解析 Mix Space Core 的前端架构设计，了解模块化和组件化实践。',
    date: '2026-01-05',
    category: 'architecture',
    slug: 'mix-space-core-architecture'
  }
]

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteTitle}</title>
    <link>${siteUrl}</link>
    <description>${siteDescription}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed" rel="self" type="application/rss+xml" />
    ${articles.map(article => `
    <item>
      <title>${article.title}</title>
      <link>${siteUrl}/posts/${article.category}/${article.slug}</link>
      <description>${article.description}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <guid>${siteUrl}/posts/${article.category}/${article.slug}</guid>
    </item>`).join('')}
  </channel>
</rss>`
</script>

<template>
  <pre>{{ rssXml }}</pre>
</template>
