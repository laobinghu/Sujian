import type { NoteListItem, NoteDetail, PaginatedResponse } from '~/types/api'

export const useNotes = () => {
  const client = useApi()

  const getList = async (
    page: number = 1,
    pageSize: number = 10,
    options?: { withSummary?: boolean }
  ): Promise<PaginatedResponse<NoteListItem>> => {
    if (!client) {
      return { list: [], total: 0, page, pageSize, hasMore: false }
    }
    const response = await client.note.getList(
      page,
      pageSize,
      options || { withSummary: true }
    ) as { list: Record<string, unknown>[]; total: number; hasMore?: boolean }

    const list: NoteListItem[] = response.list.map((item: Record<string, unknown>) => ({
      id: item.id as number,
      nid: item.nid as number,
      content: (item.content || item.summary || '') as string,
      createdAt: (item.createdAt || item.created || '') as string,
      mood: item.mood as string | undefined,
      weather: item.weather as string | undefined,
      location: item.location as string | undefined
    }))

    return {
      list,
      total: response.total || 0,
      page,
      pageSize,
      hasMore: response.hasMore || response.total > page * pageSize
    }
  }

  const getByNid = async (nid: number): Promise<NoteDetail | null> => {
    if (!client) return null
    try {
      const note = await client.note.getOne(nid) as Record<string, unknown>
      const raw = note.$raw as Record<string, unknown> | undefined
      const noteData: Record<string, unknown> = (raw?.data || note) as Record<string, unknown>

      return {
        id: noteData.id as number,
        nid: noteData.nid as number,
        content: (noteData.content || '') as string,
        createdAt: (noteData.createdAt || noteData.created || '') as string,
        mood: noteData.mood as string | undefined,
        weather: noteData.weather as string | undefined,
        location: noteData.location as string | undefined,
        title: noteData.title as string | undefined
      } as NoteDetail
    } catch (error) {
      console.error('Failed to fetch note by nid:', error)
      return null
    }
  }

  const getLatest = async (limit: number = 5): Promise<NoteListItem[]> => {
    if (!client) return []
    const response = await client.note.getList(1, limit, { withSummary: true }) as { list: Record<string, unknown>[] }
    return response.list.map((item: Record<string, unknown>) => ({
      id: item.id as number,
      nid: item.nid as number,
      content: (item.content || item.summary || '') as string,
      createdAt: (item.createdAt || item.created || '') as string,
      mood: item.mood as string | undefined
    }))
  }

  return {
    getList,
    getByNid,
    getLatest
  }
}
