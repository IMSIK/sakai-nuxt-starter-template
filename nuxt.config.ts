// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
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
  ],

  future: {
    // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
    compatibilityVersion: 4,
  },

  experimental: {
    // https://nuxt.com/blog/v3-5#fully-typed-pages
    typedPages: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  primevue: {
    autoImport: true,
    importTheme: { from: '@/theme/app-theme.js' },
    options: {
      ripple: true,
      // Choose your language here: https://github.com/primefaces/primelocale
      locale: {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        ...require('./app/theme/locale/es.json'),
      },
    },
  },

  tailwindcss: {
    cssPath: ['~/assets/tailwind.css', { injectPosition: 'first' }],
  },

  compatibilityDate: '2024-12-23',
})