import { inject, ref } from 'vue'
import type { MXSpaceClient } from '~/types/mx-space'

export type { MXSpaceClient }

export const useApi = (): MXSpaceClient | null => {
  const client = inject<MXSpaceClient | null>('mx-space-client')

  if (!client) {
    console.warn('[useApi] mx-space client not available')
    return null as unknown as MXSpaceClient
  }

  return client
}

export const useSafeApiCall = <T>(
  fn: () => Promise<T>,
  fallback?: T | (() => T)
) => {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const pending = ref(false)

  const execute = async () => {
    pending.value = true
    error.value = null

    try {
      const result = await fn()
      data.value = result
      return result
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      if (fallback) {
        data.value = typeof fallback === 'function' ? (fallback as () => T)() : fallback
      }
      throw error.value
    } finally {
      pending.value = false
    }
  }

  return { data, error, pending, execute }
}
