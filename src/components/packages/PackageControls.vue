<template>
  <div class="flex flex-col gap-4 justify-center">
    <button
      @click="onPrevious"
      :disabled="!canGoPrevious"
      class="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      ←
    </button>
    <button
      @click="onNext"
      :disabled="!canGoNext"
      class="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      →
    </button>
    <button
      @click="onAdd"
      class="p-2 rounded-full bg-white/10 hover:bg-white/20"
    >
      +
    </button>
    <button
      v-if="showDelete"
      @click="onDelete"
      class="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  onPrevious: () => void;
  onNext: () => void;
  onAdd: () => void;
  onDelete: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  showDelete: boolean;
}>();
</script>