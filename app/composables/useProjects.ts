import { useApi } from '~/composables/useApi'
import type { ProjectListItem, ProjectDetail, PaginatedResponse } from '~/types/api'

/**
 * 项目相关 Composable
 */
export const useProjects = () => {
  const client = useApi()

  /**
   * 获取项目列表
   * @param page 页码
   * @param pageSize 每页数量
   */
  const getList = async (
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<ProjectListItem>> => {
    if (!client) {
      return { list: [], total: 0, page, pageSize, hasMore: false }
    }
    try {
      const response = await client.project.getList(page, pageSize) as { list: Record<string, unknown>[]; total: number; hasMore?: boolean }

      const list: ProjectListItem[] = response.list.map((item: Record<string, unknown>) => ({
        id: (item.id || item._id) as string,
        name: (item.name || item.title) as string,
        description: (item.description || item.desc || '') as string,
        url: (item.url || item.link || '') as string,
        github: item.github as string | undefined,
        tags: (item.tags || []) as string[],
        status: (item.status || 'active') as 'active' | 'archived' | 'wip',
        createdAt: (item.createdAt || item.created_at || '') as string,
        coverImage: item.coverImage as string | undefined
      }))

      return {
        list,
        total: response.total || 0,
        page,
        pageSize,
        hasMore: response.hasMore || response.total > page * pageSize
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      return {
        list: [],
        total: 0,
        page,
        pageSize,
        hasMore: false
      }
    }
  }

  /**
   * 根据 ID 获取项目详情
   * @param id 项目 ID
   */
  const getById = async (id: string): Promise<ProjectDetail | null> => {
    if (!client) return null
    try {
      const project = await client.project.getOne(id) as Record<string, unknown>

      return {
        id: project.id as string,
        name: project.name as string,
        description: (project.description || '') as string,
        url: (project.url || '') as string,
        github: project.github as string | undefined,
        tags: (project.tags || []) as string[],
        status: (project.status || 'active') as 'active' | 'archived' | 'wip',
        createdAt: (project.createdAt || '') as string,
        content: project.content as string | undefined,
        coverImage: project.coverImage as string | undefined
      } as ProjectDetail
    } catch (error) {
      console.error('Failed to fetch project by id:', error)
      return null
    }
  }

  return {
    getList,
    getById
  }
}
