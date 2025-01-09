<template>
  <div 
    class="package-section"
    @dragover.prevent
    @drop="handleDrop"
  >
    <div class="flex justify-between items-center mb-6">
      <select 
        v-if="showSelect" 
        v-model="selectedOption"
        class="bg-white/10 text-white border border-white/20 rounded px-3 py-2"
      >
        <option value="option1">{{ title }} Option 1</option>
        <option value="option2">{{ title }} Option 2</option>
      </select>
      
      <button 
        v-if="title === 'Add-ons'"
        @click="$emit('addItem')"
        class="px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20"
      >
        + Add Item
      </button>
    </div>
    
    <div class="min-h-[400px] space-y-4">
      <template v-if="packages.length">
        <package-item
          v-for="pkg in packages"
          :key="pkg.id"
          :pkg="pkg"
          @remove="$emit('removeItem', pkg)"
          @update:title="(newTitle) => $emit('updateItem', pkg, { ...pkg, title: newTitle })"
        />
      </template>
      <div 
        v-else 
        class="h-[400px] flex flex-col items-center justify-center text-white/50"
      >
        <span class="text-4xl mb-4">↔</span>
        <p class="text-lg font-medium mb-2">This package is empty</p>
        <p class="text-sm">Drag items from other packages or add-ons</p>
        <p class="text-sm text-white/30">to start building your package</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PackageItem from './PackageItem.vue';
import type { Package } from '@/types/package';

const props = defineProps<{
  title: string;
  packages: Package[];
  showSelect?: boolean;
}>();

const emit = defineEmits<{
  (e: 'removeItem', pkg: Package): void;
  (e: 'updateItem', oldItem: Package, newItem: Package): void;
  (e: 'addItem'): void;
  (e: 'drop', event: DragEvent): void;
}>();

const selectedOption = ref('option1');

const handleDrop = (event: DragEvent) => {
  emit('drop', event);
};
</script>

<style scoped>
.package-section {
  @apply bg-white/5 backdrop-blur-sm rounded-lg p-6;
}
</style>