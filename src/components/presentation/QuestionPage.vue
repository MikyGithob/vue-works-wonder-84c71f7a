<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-lg p-8">
      <h2 class="text-4xl font-bold text-white text-center mb-12">Help Us Understand Your Needs</h2>
      
      <div class="space-y-12">
        <div v-for="(question, index) in questions" :key="index" class="space-y-6">
          <p class="text-xl text-white text-center">{{ question.text }}</p>
          <div class="flex justify-center gap-4">
            <button
              v-for="option in question.options"
              :key="option"
              @click="selectOption(index, option)"
              :class="[
                'px-6 py-3 rounded-lg transition-colors',
                selectedAnswers[index] === option
                  ? 'bg-white text-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              ]"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Question {
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    text: "What's your primary goal?",
    options: ["Growth", "Maintenance", "Cost Reduction"]
  },
  {
    text: "What's your budget range?",
    options: ["Standard", "Premium", "Enterprise"]
  }
];

const selectedAnswers = ref<string[]>([]);

const selectOption = (questionIndex: number, option: string) => {
  selectedAnswers.value[questionIndex] = option;
};
</script>