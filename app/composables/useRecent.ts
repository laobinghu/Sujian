import { useApi } from '~/composables/useApi'
import type { ActivityItem } from '~/types/api'

export const useRecent = () => {
  const client = useApi()

  const getRecent = async (limit: number = 10): Promise<ActivityItem[]> => {
    if (!client) return []
    try {
      const response = await client.recently.getAll() as { data: Record<string, unknown>[] }

      const items = (response.data || []).slice(0, limit)
      return items.map((item: Record<string, unknown>): ActivityItem => ({
        id: Number(item.id) || Math.random(),
        type: (item.type as 'post' | 'note' | 'project' | 'page' | 'other') || 'other',
        title: (item.title || item.content || '') as string,
        description: (item.content || item.excerpt || '') as string,
        date: (item.created || item.createdAt || '') as string,
        link: item.url as string | undefined,
        icon: item.icon as string | undefined,
        metadata: item.metadata as Record<string, unknown> | undefined
      }))
    } catch (error) {
      console.error('Failed to fetch recent activity:', error)
      return []
    }
  }

  const getRecentPosts = async (limit: number = 5): Promise<Record<string, unknown>[]> => {
    if (!client) return []
    try {
      const response = await client.post.getList(1, limit) as { list: Record<string, unknown>[] }
      return response.list || []
    } catch (error) {
      console.error('Failed to fetch recent posts:', error)
      return []
    }
  }

  return {
    getRecent,
    getRecentPosts
  }
}
