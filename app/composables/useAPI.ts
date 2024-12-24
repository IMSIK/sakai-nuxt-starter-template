import type { UseFetchOptions } from 'nuxt/app'
import type { NitroFetchRequest } from 'nitropack/types'

export function useAPI<T>(
  url: string | NitroFetchRequest | Ref<string | Request> | (() => string) | Request,
  options?: UseFetchOptions<T>,
) {
  return useFetch(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  })
}
