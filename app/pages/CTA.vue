<template>
  <section class="py-20 px-6 bg-black text-white text-center">
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl md:text-4xl font-bold">Write your story today</h2>
      <p>No signup. No payment. Just write.</p>
    </div>
    
    <button
      @click="$router.push('/story')"
      class="mt-8 px-4 py-2 md:px-8 md:py-3 bg-white text-black text-case md:text-lg font-semibold"
    >
      Use Now — It’s Free
    </button>
  </section>

  <footer
    class="text-center py-2 md:py-4 text-xs md:text-sm text-gray-600 border-t border-gray-300"
  >
    © 2025 Storytor. Developed by <b>Aodi Saputra</b>.
  </footer>
</template>
