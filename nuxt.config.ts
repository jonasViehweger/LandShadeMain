import tailwindcss from "@tailwindcss/vite";
import { countries } from './data/countries';

export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap', 'nuxt-og-image'],
  site: {  url: 'https://landshade.com',  name: 'LandShade - Average colors for countries computed from satellite data'  }, 
  app: {
    head: {
      bodyAttrs: {
        class: 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100',
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: countries.map(item => `/ISO/${item.shapeGroup}`)
    }
  },

  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },
  compatibilityDate: "2025-02-10",
});