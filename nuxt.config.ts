import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  app: {
    head: {
      title: "Storytor – Minimalist Space for Data Storytellers",
      meta: [
        {
          name: "description",
          content:
            "A minimalist space for data-based storytellers and writers to draft ideas and collect references — free forever.",
        },
        {
          name: "keywords",
          content:
            "storytelling, writing, data-driven, minimalist, free forever, tiptap based tool, note-taking, idea drafting, reference collection",
        },
      ],
    },
  },
  devtools: { enabled: false },
  css: ["@/assets/css/global.css"],
  modules: [
    // tailwindcss
    "@nuxtjs/tailwindcss",

    // motion
    "motion-v/nuxt",

    // vuetify
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },

    // google analytics
    "nuxt-gtag",
  ],
  gtag: {
    id: process.env.GA_TRACKING_ID
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
