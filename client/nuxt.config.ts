// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || "http://localhost:8000",
    },
  },
  css: ["@/styles/styles.css", "@/styles/fonts.css"],
  app: {
    head: {
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
});
