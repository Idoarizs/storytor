<script setup lang="ts">
// vue
import { useRoute } from "vue-router";

// custom components
import TiptapEditor from "@/components/TiptapEditor.vue";

const route = useRoute();
const id = route.params.id as string;
</script>

<template>
  <TiptapEditor type="detail" :id="id" />
</template>
