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
  devtools: { enabled: true },
  css: ["@/assets/css/global.css"],

  modules: ["@nuxtjs/tailwindcss"],
});
