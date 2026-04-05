import { useApi } from '~/composables/useApi'
import type { SayItem } from '~/types/api'

/**
 * 一言（Say）相关 Composable
 */
export const useSay = () => {
  const client = useApi()

  /**
   * 获取随机一言
   */
  const getRandom = async (): Promise<SayItem | null> => {
    if (!client) return null
    try {
      const say = await client.say.getRandom() as Record<string, unknown>

      return {
        id: say.id as number,
        content: (say.content || '') as string,
        text: (say.text || '') as string,
        author: (say.author || '') as string | undefined,
        source: (say.source || '') as string | undefined,
        created: (say.created || '') as string,
        createdAt: (say.createdAt || '') as string | undefined
      } as SayItem
    } catch (error) {
      console.error('Failed to fetch random say:', error)
      return null
    }
  }

  /**
   * 获取一言列表（可选）
   * @param limit 限制数量
   */
  const getList = async (limit: number = 10): Promise<SayItem[]> => {
    if (!client) return []
    try {
      const response = await client.say.getList(1, limit) as { list: Record<string, unknown>[] }

      return response.list.map((item: Record<string, unknown>): SayItem => ({
        id: item.id as number,
        content: (item.content || '') as string,
        text: (item.text || '') as string | undefined,
        author: (item.author || '') as string | undefined,
        source: (item.source || '') as string | undefined,
        created: (item.created || '') as string,
        createdAt: (item.createdAt || '') as string | undefined
      }))
    } catch (error) {
      console.error('Failed to fetch say list:', error)
      return []
    }
  }

  return {
    getRandom,
    getList
  }
}
