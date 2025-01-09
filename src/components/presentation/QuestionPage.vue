<template>
  <div class="p-8">
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl text-center mb-8">Does Anyone Suffer from Allergies?</h2>
        
        <div class="flex justify-center gap-4 mb-8">
          <button
            @click="handleAnswer('yes')"
            :class="[
              'px-4 py-2 rounded-md transition-colors',
              answer === 'yes' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'
            ]"
          >
            Yes
          </button>
          <button
            @click="handleAnswer('no')"
            :class="[
              'px-4 py-2 rounded-md transition-colors',
              answer === 'no' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300'
            ]"
          >
            No
          </button>
        </div>

        <div class="relative">
          <button 
            @click="previousSlide"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg"
            :disabled="currentSlide === 0"
          >
            ←
          </button>
          
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-300"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="(group, index) in menuItemGroups" 
                :key="index"
                class="w-full flex-shrink-0 grid grid-cols-2 gap-6 px-12"
              >
                <div 
                  v-for="item in group" 
                  :key="item.id"
                  class="bg-white rounded-lg shadow p-6"
                >
                  <h3 class="font-bold mb-2">{{ item.title }}</h3>
                  <ul class="list-disc pl-5 mb-4">
                    <li 
                      v-for="(point, pointIndex) in item.points" 
                      :key="pointIndex"
                    >
                      {{ point }}
                    </li>
                  </ul>
                  <p class="text-sm text-gray-600 mb-4">{{ item.description }}</p>
                  <div class="flex justify-between items-center">
                    <span class="font-bold">${{ item.price.toFixed(2) }}</span>
                    <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button 
            @click="nextSlide"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg"
            :disabled="currentSlide >= Math.ceil(menuItems.length / 2) - 1"
          >
            →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface MenuItem {
  id: number;
  title: string;
  points: string[];
  price: number;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Menu Item 1",
    points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
    price: 458.21,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
  },
  {
    id: 2,
    title: "Menu Item 2",
    points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
    price: 534.50,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
  },
  {
    id: 3,
    title: "Menu Item 3",
    points: ["Bullet Point", "Bullet Point", "Bullet Point", "Bullet Point"],
    price: 612.75,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultricies consectetur magna."
  }
];

const answer = ref<string | null>(null);
const currentSlide = ref(0);

const menuItemGroups = computed(() => {
  const groups = [];
  for (let i = 0; i < menuItems.length; i += 2) {
    groups.push(menuItems.slice(i, i + 2));
  }
  return groups;
});

const handleAnswer = (value: string) => {
  answer.value = value;
};

const nextSlide = () => {
  if (currentSlide.value < Math.ceil(menuItems.length / 2) - 1) {
    currentSlide.value++;
  }
};

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};
</script>