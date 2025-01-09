<template>
  <input
    v-model="name"
    @change="handleNameChange"
    class="text-3xl font-bold text-white mb-4 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-2 w-full"
    :placeholder="initialName"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  initialName: string;
}>();

const emit = defineEmits<{
  (e: 'nameChange', value: string): void;
}>();

const name = ref(props.initialName);

watch(() => props.initialName, (newValue) => {
  name.value = newValue;
});

const handleNameChange = () => {
  if (name.value.trim()) {
    emit('nameChange', name.value);
  }
};
</script>