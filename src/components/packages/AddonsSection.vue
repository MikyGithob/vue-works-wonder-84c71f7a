<template>
  <div>
    <h1 class="text-3xl font-bold text-white mb-4">Add-ons</h1>
    <package-section
      title="Add-ons"
      :packages="packages"
      @drop="(e) => $emit('drop', e, 'addons')"
      @update-item="(oldItem, newItem) => $emit('update-item', oldItem, newItem, 'addons')"
      @add-item="$emit('add-item')"
    />
  </div>
</template>

<script setup lang="ts">
import { Package } from '@/types/package';
import PackageSection from './PackageSection.vue';

defineProps<{
  packages: Package[];
}>();

defineEmits<{
  (e: 'drop', event: DragEvent, targetSection: string): void;
  (e: 'update-item', oldItem: Package, newItem: Package, section: string): void;
  (e: 'add-item'): void;
}>();
</script>