<template>
  <section class="py-20 px-6 bg-black text-white text-center">
    <h2 class="text-3xl md:text-4xl font-bold">Write your story today</h2>
    <p class="mt-4 text-gray-300">No signup. No payment. Just write.</p>
    <button
      @click="$router.push('/story')"
      class="mt-8 px-8 py-3 bg-white text-black text-lg font-semibold border-2 border-white hover:bg-black hover:text-white transition-all"
    >
      Use Now — It’s Free
    </button>
  </section>

  <footer
    class="text-center py-6 text-sm text-gray-600 border-t border-gray-300"
  >
    © 2025 Storytor. Developed by <b>Aodi Saputra</b>.
  </footer>
</template>
