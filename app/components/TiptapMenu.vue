<script setup lang="ts">
// tiptap [types]
import type { Editor } from "@tiptap/vue-3";

// tiptap [menus]
import { BubbleMenu } from "@tiptap/vue-3/menus";

// data
import { menuOption } from "@/data/data";

const props = defineProps<{ editor: Editor }>();
</script>

<template>
  <BubbleMenu :editor="props.editor">
    <div
      class="bg-white/10 backdrop-blur-xl shadow-xl rounded-full flex items-center w-fit mx-auto overflow-x-auto max-w-xs md:max-w-full px-4 py-2 z-50"
    >
      <button
        v-for="(opt, idx) in menuOption"
        :key="idx"
        @click="opt.action(props.editor)"
        :class="[
          'p-2 rounded transition-all ease-in-out duration2300 hover:translate-y-[-2px]',
          opt.isActive
            ? { 'bg-gray-300': opt.isActive(props.editor) }
            : {
                'cursor-not-allowed opacity-50': opt.isActive(props.editor),
              },
        ]"
        :title="opt.title"
      >
        <component :is="opt.icon" class="w-4 h-auto" />
      </button>
    </div>
  </BubbleMenu>
</template>
