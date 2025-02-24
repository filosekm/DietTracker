<template>
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">Monitor kalorii</h2>
  
      <!-- Pasek postępu kalorii -->
      <div class="mt-4">
        <div class="flex justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          <span>Spożyte kalorie: {{ consumedCalories }} kcal</span>
          <span>Cel: {{ calorieGoal }} kcal</span>
        </div>
        <div class="relative w-full bg-gray-200 dark:bg-gray-700 rounded-lg h-5 overflow-hidden">
          <div
            :style="{ width: progress + '%' }"
            class="h-full bg-blue-500 transition-all duration-500"
          ></div>
        </div>
      </div>
  
      <!-- Przyciski dodawania kalorii -->
      <div class="flex gap-4 mt-6">
        <button
          @click="addCalories(200)"
          class="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          +200 kcal
        </button>
        <button
          @click="addCalories(500)"
          class="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          +500 kcal
        </button>
        <button
          @click="resetCalories"
          class="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition duration-200"
        >
          Resetuj
        </button>
      </div>
  
      <!-- Informacja o statusie -->
      <p class="mt-4 text-center text-gray-700 dark:text-gray-300 font-semibold">
        {{ message }}
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const consumedCalories = ref(0);
  const calorieGoal = ref(2000);
  
  const progress = computed(() => Math.min((consumedCalories.value / calorieGoal.value) * 100, 100));
  
  const addCalories = (amount) => {
    consumedCalories.value += amount;
  };
  
  const resetCalories = () => {
    consumedCalories.value = 0;
  };
  
  const message = computed(() => {
    if (consumedCalories.value >= calorieGoal.value) return "✅ Cel osiągnięty!";
    return "📊 Kontroluj spożycie kalorii!";
  });
  </script>
  