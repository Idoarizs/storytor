<script setup lang="ts">
// vue
import { ref, computed, onMounted, onUnmounted } from "vue";

// custom components
import Toast from "@/components/Toast.vue";
import SearchBar from "@/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";

// custom composables
import { useStory, useToast } from "@/composables/index";

// icons
import { FileText, Trash2, Pen } from "lucide-vue-next";

// motion
import { motion } from "motion-v";

const { getAllStories, deleteStory } = useStory();
const { show, isOpen, message } = useToast();

const stories = ref<any[]>([]);
const filteredStories = ref<any[]>([]);

const search = ref<string>("");

const totalData = ref<number>(0);
const currentPage = ref<number>(1);
const perPage = ref<number>(8);

const paginatedStories = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return filteredStories.value.slice(start, end);
});

const onSubmit = (query: string) => {
  const q = query.toLowerCase().trim();

  if (!q) {
    filteredStories.value = stories.value;
    return;
  }

  filteredStories.value = stories.value.filter((story) =>
    story.title.toLowerCase().includes(q)
  );
};

onMounted(() => {
  const all = getAllStories();

  stories.value = all;
  filteredStories.value = all;
  totalData.value = filteredStories.value.length;
});

onUnmounted(() => {
  stories.value = [];
  filteredStories.value = [];
  totalData.value = 0;
});
</script>

<template>
  <div class="w-full max-w-xs md:max-w-6xl mx-auto">
    <!-- top content -->
    <div class="flex gap-2 justify-between items-start my-8 lg:my-16">
      <div class="flex flex-col gap-2">
        <span class="text-4xl md:text-6xl font-bold"
          >Your <br />
          Stories</span
        >
        <i class="text-sm md:text-normal">"Sharing moments that inspire"</i>
      </div>

      <button
        @click="$router.push(`${$route.path}/create`)"
        class="flex gap-2 items-center"
      >
        <span class="text-xs md:text-normal">Write a Story</span>
        <Pen class="w-8 h-auto p-2 bg-black text-white" />
      </button>
    </div>

    <div class="flex justify-end mb-4">
      <div class="md:max-w-[250px] w-full">
        <SearchBar v-model="search" @submit="onSubmit" />
      </div>
    </div>

    <!-- bottom content -->
    <div
      v-if="filteredStories.length === 0"
      class="flex flex-col items-center justify-center min-h-dvh gap-4 text-black"
    >
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
        }"
      >
        <FileText class="w-8 h-auto" />
      </motion.div>

      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
          delay: 0.2,
        }"
      >
        <p class="text-sm font-medium">No story found</p>
      </motion.div>
    </div>

    <div v-else class="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <motion.div
        v-for="story in paginatedStories"
        :key="story.id"
        class="relative cursor-pointer"
        :initial="{ opacity: 0, y: 20, x: 20 }"
        :animate="{ opacity: 1, y: 0, x: 0 }"
        :while-hover="{ scale: 1.05, rotate: 1 }"
        :while-press="{ scale: 0.95, rotate: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          delay: 0.2 * filteredStories.indexOf(story),
          duration: 1,
        }"
      >
        <div class="absolute top-2 left-2 w-full h-full bg-black z-0"></div>

        <div
          @click="$router.push(`${$route.path}/detail/${story.id}`)"
          class="relative bg-white border-2 border-black p-4 z-10"
        >
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm md:text-lg font-semibold truncate">
              {{ story.title }}
            </span>

            <button
              @click.stop="
                () => {
                  deleteStory(story.id);
                  show('Story deleted successfully!');
                  const all = getAllStories();
                  stories = all;
                  filteredStories = all;
                }
              "
            >
              <Trash2
                class="absolute top-[-10px] right-[-10px] w-8 h-auto p-2 bg-black rounded-full text-white"
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>

    <div class="my-12 flex justify-end">
      <Pagination
        v-if="filteredStories.length > perPage"
        :total="totalData"
        :perPage="perPage"
        :currentPage="currentPage"
        @update:currentPage="(page) => (currentPage = page)"
      />
    </div>

    <Toast v-if="isOpen" v-model="isOpen" :message="message" />
  </div>
</template>
