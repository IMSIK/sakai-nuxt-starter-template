import type { UseFetchOptions } from 'nuxt/app'
import type { NitroFetchRequest } from 'nitropack/types'

export function useLazyAPI<T>(
  url: NitroFetchRequest | string,
  options?: UseFetchOptions<T>,
) {
  return useLazyFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  })
}
