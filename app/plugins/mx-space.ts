import {
  createClient,
  PostController,
  NoteController,
  AggregateController,
  CategoryController,
  RecentlyController,
  LinkController,
  ProjectController,
  SayController,
  PageController,
  SearchController,
  type HTTPClient
} from '@mx-space/api-client'
import { fetchAdaptor } from '@mx-space/api-client/dist/adaptors/fetch'
import type { MXSpaceClient } from '~/types/mx-space'

export default defineNuxtPlugin((nuxtApp) => {
  console.log('[mx-space] Plugin executing')
  
  // 暂时提供模拟客户端进行测试
  const mockClient: any = {
    post: { getList: async () => ({ list: [], total: 0 }) },
    note: { getList: async () => ({ list: [], total: 0 }) },
    aggregate: { getAggregateData: async () => ({}) },
    category: { getList: async () => ({}) },
    recently: { getAll: async () => ({}) },
    link: { getLinks: async () => ({ list: [] }) },
    project: { getList: async () => ({ list: [], total: 0 }) },
    say: { getList: async () => ({ list: [], total: 0 }) },
    page: { getList: async () => ({ list: [], total: 0 }) },
    search: { search: async () => ({}) }
  }
  
  nuxtApp.provide('mx-space-client', mockClient)
  console.log('[mx-space] Mock client provided')
})
