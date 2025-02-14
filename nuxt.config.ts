import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: {
        class: 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100',
      },
    },
  },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },
  compatibilityDate: "2025-02-10",
});