<script setup lang="ts">
// vue
import { computed } from "vue";

// icons
import { X } from "lucide-vue-next";

const props = defineProps<{
  modelValue: boolean;
  message?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit("update:modelValue", val),
});
</script>

<template>
  <v-snackbar
    v-model="model"
    content-class="top-4 right-4 md:top-8 md:right-8 bg-black shadow-lg"
    location="top end"
    :timeout="3000"
  >
    {{ props.message }}

    <template #actions>
      <v-btn color="white" variant="text" icon @click="model = false">
        <X />
      </v-btn>
    </template>
  </v-snackbar>
</template>
