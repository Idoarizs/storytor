<script setup lang="ts">
// tiptap [types]
import type { Editor } from "@tiptap/vue-3";

// data
import { toolbarOption } from "@/data/toolbarOption";

const props = defineProps<{ editor: Editor }>();
</script>

<template>
  <div
    class="fixed bottom-4 left-0 right-0 bg-white/10 backdrop-blur-xl shadow-xl rounded-full flex items-center w-fit mx-auto px-4 py-2 z-50"
  >
    <div class="flex gap-2">
      <button
        v-for="(opt, idx) in toolbarOption"
        :key="idx"
        @click="opt.action(props.editor)"
        :class="[
          'p-2 rounded transition-all ease-in-out duration2300 hover:translate-y-[-2px]',
          opt.isActive
            ? { 'bg-gray-300': opt.isActive(props.editor) }
            : { 'cursor-not-allowed opacity-50': opt.isActive(props.editor) },
        ]"
        :title="opt.title"
      >
        <component :is="opt.icon" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
