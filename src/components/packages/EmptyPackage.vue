<template>
  <div class="min-h-[600px] bg-white/5 rounded-lg p-6">
    <input
      v-model="packageName"
      @change="handleNameChange"
      placeholder="Enter package name"
      class="text-3xl font-bold text-white mb-4 bg-white/10 border-white/20 rounded px-2 py-1 w-full"
    />
    <div class="flex flex-col items-center justify-center h-[calc(100%-4rem)]">
      <p class="text-white/50">This package is empty</p>
      <p class="text-white/30 text-sm">Add items to get started</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'nameChange', value: string): void;
}>();

const packageName = ref('');

const handleNameChange = () => {
  if (packageName.value.trim()) {
    emit('nameChange', packageName.value);
  }
};
</script>