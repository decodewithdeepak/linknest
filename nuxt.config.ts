// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    }
  ],
  
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'LinkNest - Smart Link Organizer',
      meta: [
        { name: 'description', content: 'Automatically fetch and categorize your links with LinkNest' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap' }
      ]
    }
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  }
})
