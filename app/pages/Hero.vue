<script setup lang="ts">
// motion
import { motion } from "motion-v";

// icons
import { MousePointerClick } from "lucide-vue-next";
</script>

<template>
  <motion.div
    class="flex flex-col items-center justify-center text-center min-h-screen bg-black text-white"
    :initial="{ opacity: 0 }"
    :animate="{ opacity: 1 }"
    :transition="{ duration: 1 }"
  >
    <div
      class="w-full flex flex-col md:flex-row justify-between md:items-center max-w-xs md:max-w-5xl mx-auto"
    >
      <!-- left content -->
      <div class="flex flex-col text-start gap-2">
        <motion.h1
          class="text-6xl md:text-9xl font-bold uppercase"
          :initial="{ opacity: 0, y: -40 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            delay: 0.2,
            duration: 1,
          }"
        >
          Storytor
        </motion.h1>

        <motion.p
          class="max-w-2xl text-md md:text-xl"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            delay: 0.4,
            duration: 1,
          }"
        >
          A minimalist space for
          <span class="font-semibold">data-based storytellers</span> and
          <span class="font-semibold">writers</span> to draft ideas and collect
          references — free forever.
        </motion.p>
      </div>

      <!-- right content -->
      <motion.button
        @click="$router.push('/story')"
        class="relative mt-8 md:mt-10 px-4 py-2 md:px-8 md:py-3 bg-white text-black text-case md:text-lg font-semibold border-2 w-fit h-fit"
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :while-hover="{
          scale: 1.05,
          rotate: 1,
        }"
        :while-press="{ scale: 0.95, rotate: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
        }"
      >
        Use Now

        <MousePointerClick
          class="absolute w-10 md:w-12 h-auto text-white bg-black rounded-full p-2 bottom-[-20px] right-[-20px]"
        />
      </motion.button>
    </div>
  </motion.div>
</template>
