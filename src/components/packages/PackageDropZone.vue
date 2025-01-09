<template>
  <div
    class="drop-zone"
    :class="{ 
      'is-dragging-over': isDraggingOver,
      'is-empty': isEmpty 
    }"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  onDrop: (e: DragEvent) => void;
  isEmpty?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEmpty: false
});

const isDraggingOver = ref(false);

const handleDragOver = () => {
  isDraggingOver.value = true;
};

const handleDragLeave = () => {
  isDraggingOver.value = false;
};

const handleDrop = (e: DragEvent) => {
  isDraggingOver.value = false;
  props.onDrop(e);
};
</script>

<style scoped>
.drop-zone {
  min-height: 400px;
  border-radius: 0.5rem;
  transition: all 0.3s ease-in-out;
}

.is-dragging-over {
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.1);
}

.is-empty {
  background: rgba(255, 255, 255, 0.05);
}
</style>