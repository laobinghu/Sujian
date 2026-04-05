import type {
  LinkModel,
  CategoryModel,
  RecentLike
} from '@mx-space/api-client'

export interface ArticleListItem {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
  tags: string[]
  coverImage?: string
  author?: {
    name: string
    avatar?: string
  }
}

export interface ArticleDetail {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
  tags: string[]
  coverImage?: string
  author?: {
    name: string
    avatar?: string
  }
  content?: string
}

export interface NoteListItem {
  id: number
  nid: number
  content: string
  createdAt: string
  mood?: string
  weather?: string
  location?: string
}

export interface NoteDetail {
  id: number
  nid: number
  content: string
  createdAt: string
  mood?: string
  weather?: string
  location?: string
  title?: string
}

export interface ProjectDetail {
  id: string
  name: string
  description: string
  url: string
  github?: string
  tags: string[]
  status: 'active' | 'archived' | 'wip'
  createdAt: string
  coverImage?: string
  content?: string
}

export interface ProjectListItem {
  id: string
  name: string
  description: string
  url: string
  github?: string
  tags: string[]
  status: 'active' | 'archived' | 'wip'
  createdAt: string
  coverImage?: string
}

export interface SayItem {
  id: number
  content: string
  text?: string
  author?: string
  source?: string
  created: string
  createdAt?: string
}

export interface CategoryItem {
  id: number
  name: string
  slug: string
  description?: string
  count: number
}

export type CategoryInfo = CategoryModel

export interface FriendListItem {
  name: string
  url: string
  avatar: string
  description: string
  tags?: string[]
  addedAt?: string
}

export type FriendLink = LinkModel

export interface TimelineYearGroup {
  year: string
  articles: ArticleListItem[]
}

export interface TimelineData {
  groups: TimelineYearGroup[]
  total: number
}

export interface ActivityItem {
  id: number
  type: 'post' | 'note' | 'project' | 'page' | 'other'
  title: string
  description: string
  date: string
  link?: string
  icon?: string
  metadata?: Record<string, unknown>
}

export type RecentActivity = RecentLike

export interface SiteStats {
  totalPosts: number
  totalNotes: number
  totalProjects: number
  totalFriends: number
  totalCategories: number
}

export interface AggregateInfo {
  user?: Record<string, unknown>
  seo?: Record<string, unknown>
  url?: Record<string, unknown>
}

export interface SearchResult<_T = Record<string, unknown>> {
  id: number
  type: 'post' | 'note' | 'project' | 'page' | 'friend' | 'say'
  title: string
  excerpt?: string
  url: string
  createdAt?: string
  updatedAt?: string
  relevance?: number
}

export interface PaginatedResponse<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface ApiError {
  message: string
  code?: string
  statusCode?: number
  details?: Record<string, unknown>
}
