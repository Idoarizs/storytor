<script setup lang="ts">
// motion
import { motion } from "motion-v";
</script>

<template>
  <section
    class="w-full min-h-screen max-w-xs md:max-w-5xl mx-auto flex flex-col items-center justify-center gap-8"
  >
    <div class="flex items-start w-full">
      <motion.div
        class="flex-1"
        :initial="{ opacity: 0, x: -30 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
        }"
      >
        <h2 class="text-3xl md:text-4xl font-bold">How It Works</h2>
      </motion.div>

      <motion.div
        class="flex-1"
        :initial="{ opacity: 0, x: 30 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
          delay: 0.2,
        }"
      >
        <p>
          Get started in three simple steps — draft your ideas, attach
          references, and shape them into stories.
        </p>
      </motion.div>
    </div>

    <div class="mx-auto grid md:grid-cols-3">
      <motion.div
        v-for="(text, i) in [
          'Create your draft and jot down ideas quickly.',
          'Attach references, quotes, or research sources.',
          'Organize everything into stories you can grow.',
        ]"
        :key="i"
        class="flex gap-4 p-4"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :while-hover="{
          scale: 1.05,
          rotate: 1,
        }"
        :transition="{
          delay: i * 0.3,
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
        }"
      >
        <h3 class="text-2xl bg-black text-white w-fit h-fit p-4 font-extrabold">
          {{ i + 1 }}
        </h3>
        <p class="mt-2 text-gray-700">{{ text }}</p>
      </motion.div>
    </div>
  </section>
</template>
