<script setup lang="ts">
// vue
import { computed } from "vue";

// icons
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = defineProps<{
  total: number;
  perPage: number;
  currentPage: number;
}>();

const emit = defineEmits<{
  (e: "update:currentPage", page: number): void;
}>();

const totalPages = computed(() => Math.ceil(props.total / props.perPage));
const pages = computed(() => {
  const pagesArray = [];

  for (let i = 1; i <= totalPages.value; i++) {
    pagesArray.push(i);
  }

  return pagesArray;
});

const toPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit("update:currentPage", page);
  }
};
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <button
      class="disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="toPage(currentPage - 1)"
    >
      <ChevronLeft class="w-4 h-auto" />
    </button>

    <button
      v-for="page in pages"
      :key="page"
      class="px-3 py-1 border rounded"
      :class="{ 'bg-black text-white': page === currentPage }"
      @click="toPage(page)"
    >
      {{ page }}
    </button>

    <button
      class="disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="toPage(currentPage + 1)"
    >
      <ChevronRight class="w-4 h-auto" />
    </button>
  </div>
</template>
