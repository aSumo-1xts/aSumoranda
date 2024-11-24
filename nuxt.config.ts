export default defineNuxtConfig({

  extends: ['@nuxt-themes/docus'],
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/plausible',
    '@nuxt/fonts'
  ],

  compatibilityDate: '2024-10-24',

  css: ['~/assets/css/main.css']
})