<template>
  <div class="empty-package">
    <input
      v-model="packageName"
      @input="handleNameChange"
      class="package-name-input"
      placeholder="Package Name"
    />
    
    <div class="empty-card">
      <div class="empty-content">
        <span class="move-icon">↔</span>
        <div class="empty-text">
          <p class="empty-title">This package is empty</p>
          <p class="empty-subtitle">Drag items from other packages or add-ons</p>
          <p class="empty-description">to start building your package</p>
        </div>
      </div>
    </div>
    
    <payment-summary 
      :packages="[]" 
      title="Custom"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PaymentSummary from './PaymentSummary.vue';

interface Props {
  onNameChange: (name: string) => void;
}

const props = defineProps<Props>();
const packageName = ref('New Package');

const handleNameChange = () => {
  props.onNameChange(packageName.value);
};
</script>

<style scoped>
.empty-package {
  width: 400px;
  padding: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.package-name-input {
  padding: 0.5rem;
  font-size: 1.125rem;
  font-weight: bold;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.375rem;
  color: white;
  width: 100%;
}

.empty-card {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
}

.empty-content {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.move-icon {
  font-size: 3rem;
  opacity: 0.5;
}

.empty-text {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.empty-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.empty-subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.empty-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.4);
}
</style>