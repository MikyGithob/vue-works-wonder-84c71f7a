<template>
  <div class="flex flex-col gap-4">
    <button 
      @click="$emit('onPrevious')" 
      :disabled="!canGoPrevious"
      class="control-button"
      :class="{ 'opacity-50 cursor-not-allowed': !canGoPrevious }"
    >
      ←
    </button>
    
    <button 
      @click="$emit('onNext')" 
      :disabled="!canGoNext"
      class="control-button"
      :class="{ 'opacity-50 cursor-not-allowed': !canGoNext }"
    >
      →
    </button>
    
    <button 
      @click="$emit('onAdd')"
      class="control-button"
    >
      +
    </button>
    
    <button 
      v-if="showDelete"
      @click="$emit('onDelete')"
      class="control-button delete"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  canGoPrevious: boolean;
  canGoNext: boolean;
  showDelete: boolean;
}>();

defineEmits<{
  (e: 'onPrevious'): void;
  (e: 'onNext'): void;
  (e: 'onAdd'): void;
  (e: 'onDelete'): void;
}>();
</script>

<style scoped>
.control-button {
  @apply w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center text-xl
         hover:bg-white/20 transition-colors;
}

.control-button.delete:hover {
  @apply bg-red-500/20;
}
</style>