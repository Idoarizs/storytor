<script setup lang="ts">
// vue
import { ref } from "vue";

// icons
import { Search } from "lucide-vue-next";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "submit", value: string): void;
}>();

const q = ref(props.modelValue);
</script>

<template>
  <v-text-field
    v-model="q"
    class="bg-white"
    heart="100%"
    label="Search"
    variant="outlined"
    density="compact"
    @keyup.enter="emit('submit', q)"
  >
    <template #append>
      <v-btn
        class="bg-black"
        variant="text"
        height="100%" 
        size="small"
        rounded="full"
        @click="emit('submit', q)"
      >
        <Search class="w-5 h-auto" />
      </v-btn>
    </template>
  </v-text-field>
</template>
