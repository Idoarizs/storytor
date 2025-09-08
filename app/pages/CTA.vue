<script setup lang="ts">
// motion
import { motion } from "motion-v";
</script>

<template>
  <!-- content -->
  <section class="py-20 px-6 bg-black text-white text-center">
    <div class="flex flex-col gap-2">
      <motion.div
        :initial="{ opacity: 0, y: -30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
        }"
      >
        <h2 class="text-2xl md:text-4xl font-bold">Write your story today</h2>
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          duration: 1,
          delay: 0.2,
        }"
      >
        <p>No signup. No payment. Just write.</p>
      </motion.div>
    </div>

    <motion.div
      :initial="{ opacity: 0, scale: 0.8 }"
      :while-in-view="{ opacity: 1, scale: 1 }"
      :while-hover="{
        scale: 1.05,
        rotate: 1,
      }"
      :while-press="{
        scale: 0.95,
        rotate: 0,
      }"
      :transition="{
        type: 'spring',
        stiffness: 300,
        damping: 15,
        duration: 1,
      }"
    >
      <button
        @click="$router.push('/story')"
        class="mt-8 px-4 py-2 md:px-8 md:py-3 bg-white text-black text-case md:text-lg font-semibold"
      >
        Use Now — It’s Free
      </button>
    </motion.div>
  </section>

  <!-- footer -->
  <footer
    class="text-center py-2 md:py-4 text-xs md:text-sm text-gray-600 border-t border-gray-300"
  >
    © 2025 Storytor. Developed by <b>Aodi Saputra</b>.
  </footer>
</template>
