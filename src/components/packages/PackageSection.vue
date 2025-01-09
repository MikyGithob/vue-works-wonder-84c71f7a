<template>
  <div class="package-section" :class="{ 'add-ons': isAddOns }">
    <div class="header">
      <select v-if="showSelect" v-model="selectedOption" class="select">
        <option value="option1">{{ title }} Option 1</option>
        <option value="option2">{{ title }} Option 2</option>
      </select>
      
      <button 
        v-if="isAddOns" 
        @click="$emit('addItem')"
        class="add-button"
      >
        + Add Item
      </button>
    </div>
    
    <div 
      class="drop-zone"
      @dragover.prevent
      @drop="handleDrop"
    >
      <div class="scroll-area">
        <div v-if="packages.length === 0" class="empty-state">
          <span class="icon">↔</span>
          <div class="empty-text">
            <p class="title">This package is empty</p>
            <p class="subtitle">Drag items from other packages or add-ons</p>
            <p class="description">to start building your package</p>
          </div>
        </div>
        
        <div v-else class="package-list">
          <package-item
            v-for="pkg in packages"
            :key="pkg.id"
            :pkg="pkg"
            @remove="$emit('removeItem', pkg)"
            @update:title="(newTitle) => $emit('updateItem', pkg, { ...pkg, title: newTitle })"
            draggable="true"
            @dragstart="handleDragStart($event, pkg)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
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
const isAddOns = computed(() => props.title === 'Add-ons');

const handleDragStart = (event: DragEvent, pkg: Package) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify(pkg));
  }
};

const handleDrop = (event: DragEvent) => {
  emit('drop', event);
};
</script>

<style scoped>
.package-section {
  width: 400px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.add-ons {
  background: rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.select {
  width: 180px;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.add-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
}

.add-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.drop-zone {
  min-height: 400px;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
}

.scroll-area {
  height: calc(100vh - 500px);
  overflow-y: auto;
}

.empty-state {
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.5);
}

.icon {
  font-size: 2rem;
  opacity: 0.5;
}

.empty-text {
  text-align: center;
}

.title {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.875rem;
}

.description {
  font-size: 0.875rem;
  opacity: 0.7;
}

.package-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>