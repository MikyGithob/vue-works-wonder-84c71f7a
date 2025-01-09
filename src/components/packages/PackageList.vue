<template>
  <div class="min-h-[600px]">
    <package-name 
      v-if="packages"
      :initial-name="packageType" 
      @name-change="(newName) => $emit('name-change', packageType, newName)" 
    />
    <package-section
      v-if="packages"
      :title="packageType"
      :packages="packages"
      :show-select="true"
      @remove-item="(pkg) => $emit('remove-item', pkg, packageType)"
      @drop="(e) => $emit('drop', e, packageType)"
      @update-item="(oldItem, newItem) => $emit('update-item', oldItem, newItem, packageType)"
    />
    <empty-package 
      v-else
      @name-change="(newName) => $emit('name-change', packageType, newName)" 
    />
  </div>
</template>

<script setup lang="ts">
import { Package } from '@/types/package';
import PackageName from './PackageName.vue';
import PackageSection from './PackageSection.vue';
import EmptyPackage from './EmptyPackage.vue';

defineProps<{
  packageType: string;
  packages?: Package[];
}>();

defineEmits<{
  (e: 'name-change', oldName: string, newName: string): void;
  (e: 'remove-item', pkg: Package, section: string): void;
  (e: 'drop', event: DragEvent, targetSection: string): void;
  (e: 'update-item', oldItem: Package, newItem: Package, section: string): void;
}>();
</script>