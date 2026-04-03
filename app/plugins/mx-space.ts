import { createClient, allControllers, type IRequestAdapter } from '@mx-space/api-client'

const fetchAdaptor: IRequestAdapter<typeof fetch> = {
  get default() {
    return fetch
  },
  async delete(url, options) {
    const response = await fetch(url, { ...options, method: 'DELETE' })
    const data = await response.json()
    if (response.ok) return { data }
    return Promise.reject({ data })
  },
  async get(url, options) {
    const response = await fetch(url, { ...options, method: 'GET' })
    const data = await response.json()
    if (response.ok) return { data }
    return Promise.reject({ data })
  },
  async patch(url, options) {
    const response = await fetch(url, { ...options, method: 'PATCH', body: JSON.stringify(options?.data) })
    const data = await response.json()
    if (response.ok) return { data }
    return Promise.reject({ data })
  },
  async post(url, options) {
    const response = await fetch(url, { ...options, method: 'POST', body: JSON.stringify(options?.data) })
    const data = await response.json()
    if (response.ok) return { data }
    return Promise.reject({ data })
  },
  async put(url, options) {
    const response = await fetch(url, { ...options, method: 'PUT', body: JSON.stringify(options?.data) })
    const data = await response.json()
    if (response.ok) return { data }
    return Promise.reject({ data })
  }
}

export type MXSpaceClient = ReturnType<typeof createClient<typeof fetchAdaptor>>

const API_BASE_URL = 'https://mx1.647382.xyz/v2'

export default defineNuxtPlugin(() => {
  const client = createClient(fetchAdaptor)(API_BASE_URL)

  client.injectControllers(allControllers)

  return {
    provide: {
      mx: client
    }
  }
})
