<script setup lang="ts">
// vue
import { ref, onMounted, onUnmounted } from "vue";

// custom components
import Toast from "@/components/Toast.vue";

// custom composables
import { useStory, useToast } from "@/composables/index";

// icons
import { FileText, Trash2, Pen } from "lucide-vue-next";

// motion
import { motion } from "motion-v";

const { getAllStories, deleteStory } = useStory();
const { show, isOpen, message } = useToast();

const stories = ref<any[]>([]);

onMounted(() => {
  stories.value = getAllStories();
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

      <button @click="$router.push(`${$route.path}/create`)" class="flex gap-2 items-center">
        <span class="text-xs md:text-normal">Write a Story</span>
        <Pen class="w-8 h-auto p-2 bg-black text-white" />
      </button>
    </div>

    <div
      v-if="stories.length === 0"
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
          @click="$router.push(`${$route.path}/detail/${story.id}`);"
          class="relative bg-white border-2 border-black p-4 z-10"
        >
          <!-- title -->
          <div class="flex items-center justify-between gap-4">
            <span class="text-sm md:text-lg font-semibold truncate">
              {{ story.title }}
            </span>
            <button>
              <Trash2
                @click.stop="
                  () => {
                    deleteStory(story.id);
                    show('Story deleted successfully!');
                    stories = getAllStories();
                  }
                "
                class="absolute top-[-10px] right-[-10px] w-8 h-auto p-2 bg-black rounded-full text-white hover:bg-red-600 transition-all duration-300"
              />
            </button>
          </div>
        </div>
      </motion.div>
    </div>

    <!-- toast -->
    <Toast v-if="isOpen" v-model="isOpen" :message="message" />
  </div>
</template>
