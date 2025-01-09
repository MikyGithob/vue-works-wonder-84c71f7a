<template>
  <div 
    class="package-item"
    :class="{ 'is-dragging': isDragging }"
    draggable="true"
    @dragstart="handleDragStart"
    @dragend="handleDragEnd"
  >
    <div class="package-content">
      <div v-if="onRemove" class="remove-button" @click="onRemove(pkg)">
        <span class="icon">×</span>
      </div>
      
      <div v-if="isEditing" class="title-edit">
        <input
          v-model="title"
          @blur="handleTitleSubmit"
          @keydown="handleKeyDown"
          class="title-input"
          ref="titleInput"
          autofocus
        />
      </div>
      <h3 
        v-else
        :class="{ 'editable': onUpdateTitle }"
        @click="handleTitleClick"
        class="package-title"
      >
        {{ pkg.title }}
      </h3>

      <ul class="points-list">
        <li v-for="(point, index) in pkg.points" :key="index">{{ point }}</li>
      </ul>

      <p class="description">{{ pkg.description }}</p>

      <div class="package-footer">
        <span class="price">${{ pkg.price.toFixed(2) }}</span>
        <button 
          :class="{ 'selected': onRemove }"
          class="select-button"
        >
          {{ onRemove ? 'Selected' : 'Select' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Package {
  id: number;
  title: string;
  points: string[];
  price: number;
  description: string;
}

interface Props {
  pkg: Package;
  onRemove?: (pkg: Package) => void;
  onUpdateTitle?: (newTitle: string) => void;
  isDraggable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isDraggable: true
});

const isDragging = ref(false);
const isEditing = ref(false);
const title = ref(props.pkg.title);
const titleInput = ref<HTMLInputElement | null>(null);

const handleDragStart = (e: DragEvent) => {
  if (!props.isDraggable || !e.dataTransfer) return;
  isDragging.value = true;
  e.dataTransfer.setData('application/json', JSON.stringify(props.pkg));
};

const handleDragEnd = () => {
  isDragging.value = false;
};

const handleTitleClick = () => {
  if (props.onUpdateTitle) {
    isEditing.value = true;
  }
};

const handleTitleSubmit = () => {
  isEditing.value = false;
  if (title.value !== props.pkg.title && props.onUpdateTitle) {
    props.onUpdateTitle(title.value);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleTitleSubmit();
  } else if (e.key === 'Escape') {
    isEditing.value = false;
    title.value = props.pkg.title;
  }
};

onMounted(() => {
  if (isEditing.value && titleInput.value) {
    titleInput.value.focus();
  }
});
</script>

<style scoped>
.package-item {
  position: relative;
  margin-bottom: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.package-item.is-dragging {
  opacity: 0.5;
}

.package-item:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.package-content {
  padding: 1.5rem;
}

.remove-button {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.package-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.package-title.editable {
  cursor: pointer;
}

.package-title.editable:hover {
  color: #2563eb;
}

.title-input {
  width: 100%;
  padding: 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
}

.points-list {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}

.points-list li {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.package-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
}

.select-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  transition: background-color 0.2s;
}

.select-button:hover {
  background-color: #1d4ed8;
}

.select-button.selected {
  background-color: #9ca3af;
}
</style>