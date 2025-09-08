<script setup lang="ts">
// vue
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

// custom composables
import { useStory } from "@/composables/index";

// icons
import { FileText, Trash2, Pen } from "lucide-vue-next";

// motion
import { motion } from "motion-v";

const { getAllStories, deleteStory } = useStory();

const stories = ref<any[]>([]);
const router = useRouter();
const route = useRoute();

const loadStories = () => {
  stories.value = getAllStories();
};

const handleDelete = (id: string) => {
  deleteStory(id);
  loadStories();
};

const toPath = (type: string, id?: string) => {
  const current = route.path;

  if (type === "create") {
    router.push({ path: `${current}/create` });
  } else if (type === "detail" && id) {
    router.push({ path: `${current}/detail/${id}` });
  }
};

onMounted(() => {
  loadStories();
});

onUnmounted(() => {
  stories.value = [];
});
</script>

<template>
  <div class="max-w-xs md:max-w-6xl mx-auto">
    <div
      class="md:sticky md:top-16 flex md:flex-row gap-2 z-50 justify-between items-start my-8 md:my-16"
    >
      <div class="flex flex-col gap-2">
        <span class="text-4xl md:text-6xl font-bold"
          >Your <br />
          Stories</span
        >

        <i class="text-sm md:text-normal">"Sharing moments that inspire"</i>
      </div>

      <button @click="toPath('create')" class="flex gap-2 items-center">
        <span class="text-xs md:text-normal">Write a Story</span>
        <Pen class="w-8 h-auto p-2 bg-black text-white" />
      </button>
    </div>

    <div
      v-if="stories.length === 0"
      class="flex flex-col items-center justify-center min-h-dvh gap-4"
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
        <p>No story found</p>
      </motion.div>
    </div>

    <div
      v-else
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <motion.div
        v-for="story in stories"
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
          delay: 0.2 * stories.indexOf(story),
          duration: 1,
        }"
      >
        <div class="absolute top-2 left-2 w-full h-full bg-black z-0"></div>

        <div
          @click="toPath('detail', story.id)"
          class="relative bg-white border-2 border-black p-4 z-10"
        >
          <!-- title -->
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm md:text-lg font-semibold truncate">
              {{ story.title }}
            </span>
            <button>
              <Trash2
                @click.stop="handleDelete(story.id)"
                class="absolute top-[-10px] right-[-10px] w-8 h-auto p-2 bg-black rounded-full text-white hover:bg-red-600 transition-all duration-300"
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</template>
