export default defineNuxtPlugin((nuxtApp) => {
  const toast = useToast()
  const api = $fetch.create({
    onRequest({ request }) {
      console.log('Sending request to ' + request)
    },
    async onResponseError({ response }) {
      if (response.status === 401 || response.status === 403) {
        await nuxtApp.runWithContext(() => navigateTo('/auth/Login'))
      }
      else if (response.status === 404 || response.status === 400 || response.status === 429) {
        toast.add({ severity: 'warn', summary: response._data.message, life: 5000 })
      }
      else if (response.status === 500) {
        toast.add({ severity: 'error', summary: response._data.message, life: 5000 })
      }
      else {
        toast.add({ severity: 'error', summary: 'An unexpected error occurred', life: 5000 })
      }
    },
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  }
})
