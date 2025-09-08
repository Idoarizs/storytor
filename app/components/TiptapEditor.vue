<script setup lang="ts">
// vue
import { computed, onMounted, onUnmounted } from "vue";

// custom components
import TiptapToolbar from "./TiptapToolbar.vue";

// custom composables
import { useTiptap, useStory } from "@/composables/index";

// tiptap [base]
import { EditorContent } from "@tiptap/vue-3";

// icons
import { ArrowLeft, FileDown, Save } from "lucide-vue-next";

// motion
import { motion } from "motion-v";

// utils
import { htmlToPDF } from "@/utils/export";

const { editor } = useTiptap();
const { createStory, readStory, updateStory } = useStory();

const title = computed(() => {
  if (!editor.value) return "";

  const html = editor.value.getHTML();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const h1 = doc.querySelector("h1");

  return h1 ? h1.textContent?.trim() ?? "" : "";
});

const props = defineProps<{
  id?: string;
  type: "create" | "detail";
}>();

onMounted(() => {
  if (editor.value && props.type === "detail" && props.id) {
    readStory(editor.value, props.id);
  }
});

onUnmounted(() => {
  editor.value?.destroy();
});
</script>

<template>
  <div class="w-full bg-gray-100">
    <!-- back button -->
    <motion.div
      :initial="{ opacity: 0, x: -20 }"
      :animate="{ opacity: 1, x: 0 }"
      :transition="{
        type: 'spring',
        stiffness: 300,
        damping: 15,
        duration: 1,
        delay: 0.4,
      }"
    >
      <button
        @click="$router.back()"
        class="group fixed top-8 left-8 flex items-center gap-2 z-50 bg-white/10 backdrop-blur-xl py-2 px-4 rounded-full shadow-lg"
      >
        <ArrowLeft
          class="w-4 h-4 transition-all duration-300 group-hover:translate-x-[-2px]"
        />
        <span class="text-sm">Back</span>
      </button>
    </motion.div>

    <!-- editor & toolbar -->
    <div class="p-8 md:p-16">
      <EditorContent v-if="editor" :editor="editor" />
    </div>

    <TiptapToolbar v-if="editor" :editor="editor" />

    <!-- save & export button -->
    <div class="fixed bottom-20 md:bottom-6 right-6 flex flex-col gap-2">
      <motion.div
        :initial="{ opacity: 0, x: 20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
        }"
      >
        <button
          @click="
            () => {
              if (props.type === 'create') {
                createStory(editor);
                $router.back();
              } else {
                updateStory(editor, props.id, title);
              }
            }
          "
          class="bg-white/10 text-sm backdrop-blur-xl px-4 py-2 w-full rounded-full flex items-center gap-2 shadow-lg z-50 hover:scale-105 transition-all duration-300"
        >
          <Save class="w-4 h-4" />
          {{ props.type === "create" ? "Create" : "Save" }}
        </button>
      </motion.div>

      <motion.div
        :initial="{ opacity: 0, x: 20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
          delay: 0.2,
        }"
      >
        <button
          @click="htmlToPDF(editor?.getHTML())"
          class="bg-white/10 backdrop-blur-xl px-4 py-2 w-full rounded-full flex items-center gap-2 shadow-lg z-50 hover:scale-105 transition-all duration-300"
        >
          <FileDown class="w-4 h-4" />
          <span class="text-sm">Export to PDF</span>
        </button>
      </motion.div>
    </div>
  </div>
</template>
