import { defineEventHandler } from 'h3'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: number
}

export default defineEventHandler(async () => {
  const urls: SitemapUrl[] = []

  try {
    const feedUrl = 'https://mx1.647382.xyz/feed'
    const response = await $fetch<string>(feedUrl, {
      timeout: 10000
    })

    const itemRegex = /<item>[\s\S]*?<link>([\s\S]*?)<\/link>[\s\S]*?<\/item>/g
    const lastmodRegex = /<pubDate>([\s\S]*?)<\/pubDate>/g

    let itemMatch
    while ((itemMatch = itemRegex.exec(response)) !== null) {
      const link = itemMatch[1]?.trim()
      if (link) {
        urls.push({
          loc: link,
          changefreq: 'weekly',
          priority: 0.8
        })
      }
    }
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error)
  }

  return urls
})
