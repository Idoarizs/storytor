<script setup lang="ts">
// vue
import { computed, onMounted, onUnmounted } from "vue";

// custom components
import TiptapToolbar from "./TiptapToolbar.vue";
import Toast from "./Toast.vue";

// custom composables
import { useTiptap, useStory, useToast, useAI } from "@/composables/index";

// tiptap [base]
import { EditorContent } from "@tiptap/vue-3";
import { FloatingMenu } from "@tiptap/vue-3/menus";

// icons
import { ArrowLeft, FileDown, Save, Sparkles } from "lucide-vue-next";

// motion
import { motion } from "motion-v";

// utils
import { htmlToPDF } from "@/utils/export";

const { editor } = useTiptap();
const { createStory, readStory, updateStory } = useStory();
const { show, isOpen, message } = useToast();
const { chat } = useAI();

const title = computed(() => {
  if (!editor.value) return "";

  const html = editor.value.getHTML();
  const doc = new DOMParser().parseFromString(html, "text/html");
  const h1 = doc.querySelector("h1");

  return h1 ? h1.textContent?.trim() ?? "" : "";
});

const onGenerate = () => {
  show("Generating story, please wait...");
  chat().then((response) => {
    editor.value?.commands.insertContent(response);
    show("Story generated successfully!");
  });
};

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

    <!-- tiptap editor -->
    <div class="p-8 md:p-16">
      <FloatingMenu :editor="editor" v-if="editor">
        <motion.div
          class="bg-white/10 text-sm backdrop-blur-xl px-4 py-2 rounded-full flex shadow-lg"
          :whileHover="{ scale: 1.05 }"
          :while-press="{ scale: 0.95 }"
          :transition="{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            duration: 1,
          }"
        >
          <button @click="onGenerate()" class="flex gap-2">
            <Sparkles class="w-4 h-auto" />
            Generate Story
          </button>
        </motion.div>
      </FloatingMenu>

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
          @click.stop="
            () => {
              if (props.type === 'create') {
                createStory(editor);
                show('Story created successfully!');
                $router.back();
              } else {
                updateStory(editor, props.id, title);
                show('Story saved successfully!');
              }
            }
          "
          class="bg-white/10 text-sm backdrop-blur-xl px-4 py-2 w-full rounded-full flex items-center gap-2 shadow-lg z-50 hover:scale-105 transition-all duration-300"
        >
          <Save class="w-4 h-auto" />
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
          @click="
            () => {
              htmlToPDF(editor?.getHTML());
              show('Exported to PDF successfully!');
            }
          "
          class="bg-white/10 text-sm backdrop-blur-xl px-4 py-2 w-full rounded-full flex items-center gap-2 shadow-lg z-50 hover:scale-105 transition-all duration-300"
        >
          <FileDown class="w-4 h-auto" />
          <span class="text-sm">Export to PDF</span>
        </button>
      </motion.div>
    </div>

    <Toast v-if="isOpen" v-model="isOpen" :message="message" />
  </div>
</template>
