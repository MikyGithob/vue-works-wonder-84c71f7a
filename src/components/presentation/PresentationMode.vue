<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400">
    <presentation-slide v-if="currentStep === 'presentation'" />
    <question-page v-if="currentStep === 'question'" />
    <package-selection v-if="currentStep === 'packages'" />
    
    <div class="fixed bottom-8 right-8 flex gap-4">
      <button 
        v-if="currentStep !== 'presentation'"
        @click="handleBack"
        class="px-4 py-2 bg-white rounded-md hover:bg-blue-50"
      >
        Back
      </button>
      <button 
        v-if="currentStep !== 'packages'"
        @click="handleNext"
        class="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PresentationSlide from './PresentationSlide.vue';
import QuestionPage from './QuestionPage.vue';
import PackageSelection from './PackageSelection.vue';

type Step = 'presentation' | 'question' | 'packages';

const currentStep = ref<Step>('presentation');

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