// plugins/i18n.ts

import { createI18n } from 'vue-i18n'
import { config } from '~/utils/config'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Load all JSON language files in the locales directory
  const messages = Object.fromEntries(
    await Promise.all(
      Object.entries(import.meta.glob('~/locales/*.json')).map(
        async ([path, loader]) => {
          const locale = path.split('/').pop()?.replace('.json', '')
          // const content = await loader()
          const content = await loader() as { default: Record<string, string> }
          return [locale!, content.default]
        },
      ),
    ),
  )

  // Read default locale from external config
  const defaultLocale = config.language || 'en_us'

  // Create vue-i18n instance
  const i18n = createI18n({
    legacy: false, // Use Composition API mode
    globalInjection: true, // Allow $t() globally
    locale: defaultLocale, // Default language
    fallbackLocale: 'en_us', // Fallback language
    messages, // Loaded language messages
  })

  // Install i18n into Vue application
  nuxtApp.vueApp.use(i18n)
})
