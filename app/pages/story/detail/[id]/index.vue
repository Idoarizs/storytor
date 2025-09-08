<script setup lang="ts">
// custom components
import TiptapEditor from "@/components/TiptapEditor.vue";
</script>

<template>
  <TiptapEditor type="detail" :id="String($route.params.id)" />
</template>
