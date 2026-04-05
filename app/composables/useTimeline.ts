import { useApi } from '~/composables/useApi'
import type { TimelineYearGroup, TimelineData, ArticleListItem } from '~/types/api'

export const useTimeline = () => {
  const client = useApi()

  const getTimeline = async (limit: number = 0): Promise<TimelineData> => {
    if (!client) return { groups: [], total: 0 }
    try {
      const articlesResponse = await client.post.getList(1, limit || 100) as { list: Record<string, unknown>[] }

      const articles: ArticleListItem[] = articlesResponse.list.map((item: Record<string, unknown>) => ({
        id: item.id as number,
        title: item.title as string,
        excerpt: (item.excerpt || '') as string,
        date: (item.createdAt || item.date || '') as string,
        readTime: '5 min',
        category: ((item.category as Record<string, unknown>)?.slug || '') as string,
        slug: item.slug as string,
        tags: (item.tags || []) as string[]
      }))

      const groupsMap: Record<string, ArticleListItem[]> = {}

      articles.forEach((article) => {
        const year = article.date.split('-')[0]
        if (!year) return
        if (!groupsMap[year]) {
          groupsMap[year] = []
        }
        groupsMap[year]!.push(article)
      })

      const groups: TimelineYearGroup[] = Object.keys(groupsMap)
        .sort((a, b) => Number(b) - Number(a))
        .map(year => ({
          year,
          articles: (groupsMap[year] || []).sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        }))

      return {
        groups,
        total: articles.length
      }
    } catch (error) {
      console.error('Failed to fetch timeline:', error)
      return {
        groups: [],
        total: 0
      }
    }
  }

  const getByYear = async (year: number): Promise<ArticleListItem[]> => {
    const timeline = await getTimeline()
    return timeline.groups.find(g => g.year === String(year))?.articles || []
  }

  return {
    getTimeline,
    getByYear
  }
}
