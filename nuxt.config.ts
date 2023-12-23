import process from 'node:process'

const isDev = process.env.NODE_ENV === 'development'

// const apiBaseUrl = 'http://localhost:3000/api'
// const apiBaseUrl = 'https://movies-proxy.vercel.app'

const apiBaseUrl = isDev ? process.env.API_BASE_URL : process.env.PROD_API_BASE_URL

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
  ],
  experimental: {
    inlineSSRStyles: false,
    viewTransition: true,
    renderJsonPayloads: true,
  },
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl,
    },
  },
  devtools: {
    enabled: false,
  },
  image: {
    domains: [
      'image.tmdb.org',
      'img.youtube.com',
    ],
    alias: {
      '/tmdb': 'https://image.tmdb.org/t/p/original/',
      '/youtube': 'https://img.youtube.com/',
    },
  },
  nitro: {
    routeRules: {
      '/**': { isr: false, cors: true },
    },
    runtimeConfig: {
      public: {
        apiBaseUrl,
      },
      tmdb: {
        apiKey: process.env.TMDB_API_KEY || '',
      },
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
    },
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'de-DE',
        name: 'Deutsch',
        file: 'de-DE.json',
      },
      {
        code: 'es-ES',
        name: 'Español',
        file: 'es-ES.json',
      },
      {
        code: 'ja',
        name: '日本語',
        file: 'ja.json',
      },
      {
        code: 'zh-CN',
        name: '简体中文',
        file: 'zh-CN.json',
      },
      {
        code: 'pt-PT',
        name: 'Português',
        file: 'pt-PT.json',
      },
      {
        code: 'pt-BR',
        name: 'Português do Brasil',
        file: 'pt-BR.json',
      },
      {
        code: 'ru-RU',
        name: 'Русский',
        file: 'ru-RU.json',
      },
    ],
    lazy: true,
    langDir: 'internationalization',
    defaultLocale: 'ru-RU',
  },
})
