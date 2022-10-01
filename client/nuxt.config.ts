// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL || "http://localhost:8000",
  },
  css: ["@/styles/styles.css", "@/styles/fonts.css"],
  app: {
    head: {
      title: "Coffee",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
        {
          href: "https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css",
          rel: "stylesheet",
        },
      ],
    },
  },
});
