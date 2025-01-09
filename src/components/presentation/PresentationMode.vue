<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400">
    <component :is="currentComponent" />
    
    <div class="fixed bottom-8 right-8 flex gap-4">
      <button 
        v-if="currentStep !== 'presentation'"
        @click="handleBack"
        class="px-4 py-2 bg-white rounded-md hover:bg-blue-50 animate-fade-in"
      >
        Back
      </button>
      <button 
        v-if="currentStep !== 'packages'"
        @click="handleNext"
        class="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 animate-fade-in"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import PresentationSlide from './PresentationSlide.vue';
import QuestionPage from './QuestionPage.vue';
import PackageSelection from './PackageSelection.vue';

type Step = 'presentation' | 'question' | 'packages';

const currentStep = ref<Step>('presentation');

const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 'presentation':
      return PresentationSlide;
    case 'question':
      return QuestionPage;
    case 'packages':
      return PackageSelection;
    default:
      return PresentationSlide;
  }
});

const handleNext = () => {
  switch (currentStep.value) {
    case 'presentation':
      currentStep.value = 'question';
      break;
    case 'question':
      currentStep.value = 'packages';
      break;
  }
};

const handleBack = () => {
  switch (currentStep.value) {
    case 'question':
      currentStep.value = 'presentation';
      break;
    case 'packages':
      currentStep.value = 'question';
      break;
  }
};
</script>