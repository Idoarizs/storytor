<script setup lang="ts">
import { MousePointerClick } from "lucide-vue-next";
</script>

<template>
  <section
    class="flex flex-col items-center justify-center text-center min-h-screen bg-black text-white"
  >
    <div class="w-full flex justify-between items-center max-w-5xl mx-auto">
      <div class="flex flex-col text-start">
        <h1 class="text-9xl font-bold uppercase">Storytor</h1>
        <p class="mt-6 max-w-2xl text-lg md:text-xl">
          A minimalist space for
          <span class="font-semibold">data-based storytellers</span> and
          <span class="font-semibold">writers</span> to draft ideas and collect
          references — free forever.
        </p>
      </div>

      <button
        @click="$router.push('/story')"
        class="relative mt-10 px-8 py-3 bg-white text-black text-lg font-semibold border-2 h-fit"
      >
        Use Now
        <MousePointerClick class="absolute w-12 h-auto text-white bg-black rounded-full p-2 bottom-[-20px] right-[-20px]" />
      </button>
    </div>
  </section>
</template>
