<template>
  <ClientOnly>
    <v-app>
      <NuxtPage :transition="{ name: 'fade' }" />
    </v-app>
  </ClientOnly>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
