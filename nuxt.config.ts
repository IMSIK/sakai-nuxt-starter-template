import tailwindcss from '@tailwindcss/vite'
import esLocale from './app/theme/locale/es.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/plus-jakarta-sans' }],
      script: [{ src: 'https://kit.fontawesome.com/46ad5ba21c.js', crossorigin: 'anonymous' }],
    },
  },

  css: [
    '@/assets/styles.scss',
    '@/assets/tailwind.css',
  ],

  future: {
    // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
    compatibilityVersion: 4,
  },

  experimental: {
    // https://nuxt.com/blog/v3-5#fully-typed-pages
    typedPages: true,
  },

  compatibilityDate: '2025-02-20',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  primevue: {
    autoImport: false,
    components: {
      include: '*',
      exclude: ['Form', 'FormField'],
    },
    directives: {
      include: '*',
    },
    importTheme: { from: '@/theme/app-theme.ts' },
    options: {
      ripple: true,
      // Choose your language here: https://github.com/primefaces/primelocale
      locale: { ...esLocale },
    },
  },
})
