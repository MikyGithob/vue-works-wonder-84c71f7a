<template>
  <div 
    class="package-item"
    :draggable="true"
    @dragstart="$emit('dragstart', $event)"
  >
    <div class="header">
      <input
        v-if="isEditing"
        ref="titleInput"
        v-model="editedTitle"
        @blur="handleTitleBlur"
        @keydown.enter="handleTitleBlur"
        class="title-input"
      />
      <h3 
        v-else
        @click="startEditing"
        class="title"
      >
        {{ pkg.title }}
      </h3>
      <button 
        @click="$emit('remove')"
        class="remove-button"
      >
        ×
      </button>
    </div>
    
    <ul class="points">
      <li v-for="(point, index) in pkg.points" :key="index">
        {{ point }}
      </li>
    </ul>
    
    <p class="description">{{ pkg.description }}</p>
    <p class="price">${{ pkg.price.toFixed(2) }}</p>
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
  (e: 'dragstart', event: DragEvent): void;
}>();

const isEditing = ref(false);
const editedTitle = ref(props.pkg.title);
const titleInput = ref<HTMLInputElement | null>(null);

const startEditing = () => {
  isEditing.value = true;
  nextTick(() => {
    titleInput.value?.focus();
  });
};

const handleTitleBlur = () => {
  isEditing.value = false;
  if (editedTitle.value.trim() !== props.pkg.title) {
    emit('update:title', editedTitle.value);
  }
};
</script>

<style scoped>
.package-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
}

.title-input {
  font-size: 1.125rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  color: white;
  width: 200px;
}

.remove-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0.25rem;
  line-height: 1;
}

.remove-button:hover {
  color: white;
}

.points {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.price {
  color: white;
  font-weight: 500;
  font-size: 1.25rem;
}
</style>