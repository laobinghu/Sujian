import type { ArticleListItem, ArticleDetail, PaginatedResponse } from '~/types/api'

export const useArticles = () => {
  const client = useApi()

  const getList = async (
    page: number = 1,
    pageSize: number = 10,
    filters?: {
      category?: string
      year?: number
      tag?: string
      author?: string
    }
  ): Promise<PaginatedResponse<ArticleListItem>> => {
    if (!client) {
      return { list: [], total: 0, page, pageSize, hasMore: false }
    }
    const response = await client.post.getList(
      page,
      pageSize,
      filters ? { ...filters } : undefined
    ) as { list: Record<string, unknown>[]; total: number; hasMore?: boolean }

    const list: ArticleListItem[] = response.list.map((item: Record<string, unknown>) => ({
      id: item.id as number,
      title: item.title as string,
      excerpt: (item.excerpt || item.summary || '') as string,
      date: (item.createdAt || item.date || '') as string,
      readTime: `${Math.ceil(((item.content as string) || '').length / 500)} min`,
      category: ((item.category as Record<string, unknown>)?.slug || item.category || '') as string,
      slug: item.slug as string,
      tags: (item.tags || []) as string[],
      coverImage: (item.coverImage || (item.cover as Record<string, unknown>)?.url) as string | undefined,
      author: item.author
        ? {
            name: ((item.author as Record<string, unknown>).name || (item.author as Record<string, unknown>).nickname || '') as string,
            avatar: ((item.author as Record<string, unknown>).avatar || (item.author as Record<string, unknown>).avatarUrl) as string | undefined
          }
        : undefined
    }))

    return {
      list,
      total: response.total || 0,
      page,
      pageSize,
      hasMore: response.hasMore || response.total > page * pageSize
    }
  }

  const getBySlug = async (
    slug: string,
    category?: string
  ): Promise<ArticleDetail | null> => {
    if (!client) return null
    try {
      const post = await client.post.getOne(slug, category) as Record<string, unknown>
      const raw = post.$raw as Record<string, unknown> | undefined
      const postData: Record<string, unknown> = (raw?.data || post) as Record<string, unknown>

      return {
        id: postData.id as number,
        title: postData.title as string,
        excerpt: (postData.excerpt || postData.summary || '') as string,
        date: (postData.createdAt || postData.created || '') as string,
        readTime: `${Math.ceil(((postData.content as string)?.length || 0) / 500)} min`,
        category: (postData.category as Record<string, unknown>)?.slug || postData.category || '',
        slug: postData.slug as string,
        tags: (postData.tags || []) as string[],
        content: postData.content as string | undefined,
        coverImage: (postData.coverImage || (postData.cover as Record<string, unknown>)?.url) as string | undefined,
        author: postData.author
          ? {
              name: ((postData.author as Record<string, unknown>).name || (postData.author as Record<string, unknown>).nickname || '') as string,
              avatar: ((postData.author as Record<string, unknown>).avatar || (postData.author as Record<string, unknown>).avatarUrl) as string | undefined
            }
          : undefined
      } as ArticleDetail
    } catch (error) {
      console.error('Failed to fetch article by slug:', error)
      return null
    }
  }

  const getById = async (id: number): Promise<ArticleDetail | null> => {
    if (!client) return null
    try {
      const post = await client.post.getPostById(id) as Record<string, unknown>
      const raw = post.$raw as Record<string, unknown> | undefined
      const postData: Record<string, unknown> = (raw?.data || post) as Record<string, unknown>

      return {
        id: postData.id as number,
        title: postData.title as string,
        excerpt: (postData.excerpt || postData.summary || '') as string,
        date: (postData.createdAt || postData.created || '') as string,
        readTime: `${Math.ceil(((postData.content as string)?.length || 0) / 500)} min`,
        category: (postData.category as Record<string, unknown>)?.slug || postData.category || '',
        slug: postData.slug as string,
        tags: (postData.tags || []) as string[],
        content: postData.content as string | undefined,
        coverImage: (postData.coverImage || (postData.cover as Record<string, unknown>)?.url) as string | undefined,
        author: postData.author
          ? {
              name: ((postData.author as Record<string, unknown>).name || (postData.author as Record<string, unknown>).nickname || '') as string,
              avatar: ((postData.author as Record<string, unknown>).avatar || (postData.author as Record<string, unknown>).avatarUrl) as string | undefined
            }
          : undefined
      } as ArticleDetail
    } catch (error) {
      console.error('Failed to fetch article by id:', error)
      return null
    }
  }

  return {
    getList,
    getBySlug,
    getById
  }
}
