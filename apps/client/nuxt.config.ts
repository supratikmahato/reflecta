// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@vueuse/nuxt", "@nuxtjs/fontaine"],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:8000",
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL ||
        "https://techgenius-coffee.netlify.app",
      siteName: "Coffee",
      siteDescription: "Welcome to my awesome site!",
      language: "en",
    },
  },
  linkChecker: {
    failOn404: true,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  extends: ["nuxt-seo-kit"],
  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],
  app: {
    head: {
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      link: [
        {
          rel: "icon",
          sizes: "any",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
        {
          href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css",
          rel: "stylesheet",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  typescript: { strict: true, shim: false },
});
