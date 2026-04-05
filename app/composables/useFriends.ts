import { useApi } from '~/composables/useApi'
import type { FriendListItem } from '~/types/api'

/**
 * 友链相关 Composable
 */
export const useFriends = () => {
  const client = useApi()

  /**
   * 获取友链列表
   */
  const getList = async (): Promise<FriendListItem[]> => {
    if (!client) return []
    try {
      const response = await client.link.getLinks() as { list?: Record<string, unknown>[]; links?: Record<string, unknown>[] }

      const links = response.list || response.links || []
      return links.map((link: Record<string, unknown>): FriendListItem => ({
        name: (link.name || link.title || '') as string,
        url: (link.url || link.link || '') as string,
        avatar: (link.avatar || link.avatarUrl || '/images/default-avatar.png') as string,
        description: (link.description || link.desc || '') as string,
        tags: (link.tags || []) as string[],
        addedAt: (link.createdAt || link.addedAt) as string | undefined
      }))
    } catch (error) {
      console.error('Failed to fetch friends/links:', error)
      return []
    }
  }

  return {
    getList
  }
}
