<template>
  <div 
    class="package-item"
    :draggable="true"
    @dragstart="handleDragStart"
  >
    <div class="flex justify-between items-start mb-4">
      <input
        v-if="isEditing"
        v-model="editedTitle"
        @blur="handleTitleBlur"
        @keydown.enter="handleTitleBlur"
        class="text-lg font-bold bg-white/10 border border-white/20 rounded px-2 py-1 text-white w-full mr-2"
      />
      <h3 
        v-else
        @click="startEditing"
        class="text-lg font-bold text-white cursor-pointer hover:text-white/80"
      >
        {{ pkg.title }}
      </h3>
      <button 
        @click="$emit('remove')"
        class="text-white/50 hover:text-white"
      >
        ×
      </button>
    </div>
    
    <ul class="list-disc list-inside mb-4 text-white/80 space-y-1">
      <li v-for="(point, index) in pkg.points" :key="index">
        {{ point }}
      </li>
    </ul>
    
    <p class="text-sm text-white/60 mb-4">{{ pkg.description }}</p>
    <div class="flex justify-between items-center">
      <p class="text-lg font-bold text-white">${{ pkg.price.toFixed(2) }}</p>
      <button class="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20">
        Select
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Package } from '@/types/package';

const props = defineProps<{
  pkg: Package;
}>();

const emit = defineEmits<{
  (e: 'remove'): void;
  (e: 'update:title', value: string): void;
}>();

const isEditing = ref(false);
const editedTitle = ref(props.pkg.title);

const startEditing = () => {
  isEditing.value = true;
};

const handleTitleBlur = () => {
  isEditing.value = false;
  if (editedTitle.value.trim() !== props.pkg.title) {
    emit('update:title', editedTitle.value);
  }
};

const handleDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(props.pkg));
  }
};
</script>

<style scoped>
.package-item {
  @apply bg-white/5 backdrop-blur-sm rounded-lg p-6 transition-all hover:bg-white/10;
}
</style>