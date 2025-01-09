<template>
  <div>
    <input
      v-if="isEditing"
      ref="inputRef"
      :value="name"
      @input="e => setName(e.target.value)"
      @blur="handleBlur"
      @keydown="handleKeyDown"
      class="text-3xl font-bold text-white mb-4 bg-white/10 border-white/20 rounded px-2 py-1 w-full"
    />
    <h1 
      v-else
      class="text-3xl font-bold text-white mb-4 capitalize cursor-pointer hover:opacity-80" 
      @click="handleClick"
    >
      {{ name }} Package
    </h1>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  initialName: string;
}>();

const emit = defineEmits<{
  (e: 'nameChange', value: string): void;
}>();

const isEditing = ref(false);
const name = ref(props.initialName);
const inputRef = ref<HTMLInputElement | null>(null);

watch(() => props.initialName, (newValue) => {
  name.value = newValue;
});

const handleClick = () => {
  isEditing.value = true;
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const handleBlur = () => {
  isEditing.value = false;
  if (name.value.trim() !== props.initialName) {
    emit('nameChange', name.value);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleBlur();
  }
};
</script>