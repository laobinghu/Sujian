export interface MXSpaceClient {
  post: {
    getList: (page?: number, limit?: number, options?: Record<string, unknown>) => Promise<Record<string, unknown>>
    getOne: (slug: string, category?: string) => Promise<Record<string, unknown>>
    getPostById: (id: number) => Promise<Record<string, unknown>>
  }
  note: {
    getList: (page?: number, limit?: number, options?: Record<string, unknown>) => Promise<Record<string, unknown>>
    getOne: (nid: number) => Promise<Record<string, unknown>>
  }
  aggregate: {
    getAggregateData: (theme?: string) => Promise<Record<string, unknown>>
    getSiteMetadata: () => Promise<Record<string, unknown>>
    getTop: (size?: number) => Promise<Record<string, unknown>>
    getTimeline: (options?: Record<string, unknown>) => Promise<Record<string, unknown>>
  }
  category: {
    getList: () => Promise<Record<string, unknown>>
  }
  recently: {
    getAll: () => Promise<Record<string, unknown>>
    getLatestOne: () => Promise<Record<string, unknown>>
    getRecent: (limit?: number) => Promise<Record<string, unknown>>
    getRecentPublish: (limit?: number) => Promise<Record<string, unknown>>
  }
  link: {
    getLinks: () => Promise<Record<string, unknown>>
  }
  project: {
    getList: (page?: number, limit?: number) => Promise<Record<string, unknown>>
    getOne: (id: string) => Promise<Record<string, unknown>>
  }
  say: {
    getRandom: () => Promise<Record<string, unknown>>
    getList: (page?: number, limit?: number) => Promise<Record<string, unknown>>
  }
  page: {
    getList: (page?: number, limit?: number) => Promise<Record<string, unknown>>
    getOne: (slug: string) => Promise<Record<string, unknown>>
  }
  search: {
    search: (keyword: string, options?: Record<string, unknown>) => Promise<Record<string, unknown>>
  }
}
