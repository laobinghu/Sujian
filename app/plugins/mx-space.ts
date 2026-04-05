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
  const endpoint = nuxtApp.$config.public.mxSpaceEndpoint

  if (!endpoint) {
    console.warn('[mx-space] Missing NUXT_PUBLIC_MX_SPACE_ENDPOINT - API calls will be disabled')
    nuxtApp.vueApp.provide('mx-space-client', null)
    return
  }

  try {
    const client: HTTPClient = createClient(fetchAdaptor)(endpoint)

    client.injectControllers([
      PostController,
      NoteController,
      AggregateController,
      CategoryController,
      RecentlyController,
      LinkController,
      ProjectController,
      SayController,
      PageController,
      SearchController
    ])

    console.log('[mx-space] Client initialized and provided')
    nuxtApp.vueApp.provide('mx-space-client', client as unknown as MXSpaceClient)
  } catch (error) {
    console.error('[mx-space] Failed to initialize client:', error)
    nuxtApp.vueApp.provide('mx-space-client', null)
  }
})
