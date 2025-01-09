<template>
  <div class="package-controls">
    <button 
      @click="onPrevious" 
      :disabled="!canGoPrevious"
      class="control-button"
    >
      <span class="icon">←</span>
    </button>
    
    <button 
      @click="onNext" 
      :disabled="!canGoNext"
      class="control-button"
    >
      <span class="icon">→</span>
    </button>
    
    <button 
      @click="onAdd"
      class="control-button"
    >
      <span class="icon">+</span>
    </button>
    
    <button 
      v-if="showDelete"
      @click="onDelete"
      class="control-button delete"
    >
      <span class="icon">×</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  onPrevious: () => void;
  onNext: () => void;
  onAdd: () => void;
  onDelete: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  showDelete: boolean;
}

defineProps<Props>();
</script>

<style scoped>
.package-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-self: center;
}

.control-button {
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.control-button:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-button.delete:hover {
  background-color: rgba(239, 68, 68, 0.2);
}

.icon {
  font-size: 1.5rem;
  line-height: 1;
}
</style>