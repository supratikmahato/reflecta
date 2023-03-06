// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
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
    },
  },
  css: ["~/assets/css/main.css", "~/assets/css/fonts.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Coffee",
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
  typescript: { strict: true },
});
