import type { AggregateInfo, SiteStats } from '~/types/api'

export const useAggregate = () => {
  const client = useApi()

  const getAggregate = async (): Promise<AggregateInfo | null> => {
    if (!client) return null
    try {
      const data = await client.aggregate.getAggregateData()
      return data as AggregateInfo
    } catch (error) {
      console.error('Failed to fetch aggregate data:', error)
      return null
    }
  }

  const getStats = async (): Promise<SiteStats | null> => {
    if (!client) return null
    try {
      const top = await client.aggregate.getTop(100)
      const topData = top as Record<string, unknown>
      return {
        totalPosts: Array.isArray((topData as Record<string, unknown>).posts) ? ((topData as Record<string, unknown>).posts as unknown[]).length : 0,
        totalNotes: Array.isArray((topData as Record<string, unknown>).notes) ? ((topData as Record<string, unknown>).notes as unknown[]).length : 0,
        totalProjects: 0,
        totalFriends: 0,
        totalCategories: 0
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      return null
    }
  }

  const getRecentPosts = async (limit: number = 5): Promise<Record<string, unknown>[]> => {
    if (!client) return []
    try {
      const response = await client.post.getList(1, limit)
      return (response.list as Record<string, unknown>[]) || []
    } catch (error) {
      console.error('Failed to fetch recent posts:', error)
      return []
    }
  }

  const getRecentActivities = async (limit: number = 5): Promise<Record<string, unknown>[]> => {
    if (!client) return []
    try {
      const response = await client.recently.getAll()
      return ((response.data as Record<string, unknown>[]) || []).slice(0, limit)
    } catch (error) {
      console.error('Failed to fetch recent activities:', error)
      return []
    }
  }

  return {
    getAggregate,
    getStats,
    getRecentPosts,
    getRecentActivities
  }
}
