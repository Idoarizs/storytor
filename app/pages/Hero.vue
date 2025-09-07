<script setup lang="ts">
import { MousePointerClick } from "lucide-vue-next";
</script>

<template>
  <section
    class="flex flex-col items-center justify-center text-center min-h-screen bg-black text-white"
  >
    <div class="w-full flex flex-col md:flex-row justify-between md:items-center max-w-xs md:max-w-5xl mx-auto">
      <div class="flex flex-col text-start gap-2">
        <h1 class="text-6xl md:text-9xl font-bold uppercase">Storytor</h1>
        <p class="max-w-2xl text- md:text-xl">
          A minimalist space for
          <span class="font-semibold">data-based storytellers</span> and
          <span class="font-semibold">writers</span> to draft ideas and collect
          references — free forever.
        </p>
      </div>

      <button
        @click="$router.push('/story')"
        class="relative mt-8 md:mt-10 px-4 py-2 md:px-8 md:py-3 bg-white text-black text-case md:text-lg font-semibold border-2 w-fit h-fit"
      >
        Use Now
        <MousePointerClick class="absolute w-10 md:w-12 h-auto text-white bg-black rounded-full p-2 bottom-[-20px] right-[-20px]" />
      </button>
    </div>
  </section>
</template>
