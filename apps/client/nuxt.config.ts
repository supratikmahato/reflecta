// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@vueuse/nuxt", "@nuxtjs/google-fonts", "@nuxtjs/fontaine"],
  devtools: { enabled: true },
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
  googleFonts: {
    preload: true,
    families: {
      "Space+Mono": [700],
    },
  },
  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],
  app: {
    head: {
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
