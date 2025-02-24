<template>
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">Cele żywieniowe</h2>
  
      <!-- Formularz ustawienia celu -->
      <form @submit.prevent="setGoal" class="flex flex-col gap-4">
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-1">Cel kalorii (kcal)</label>
          <input
            v-model="calorieGoal"
            type="number"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            required
          />
        </div>
  
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-1">Cel białka (g)</label>
          <input
            v-model="proteinGoal"
            type="number"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            required
          />
        </div>
  
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-1">Cel tłuszczów (g)</label>
          <input
            v-model="fatGoal"
            type="number"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            required
          />
        </div>
  
        <div>
          <label class="block text-gray-700 dark:text-gray-300 mb-1">Cel węglowodanów (g)</label>
          <input
            v-model="carbGoal"
            type="number"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            required
          />
        </div>
  
        <!-- Przycisk zapisu -->
        <button
          type="submit"
          class="w-full p-3 rounded-lg font-semibold transition duration-200 
                 bg-green-500 text-white hover:bg-green-600"
        >
          Zapisz cele
        </button>
      </form>
  
      <!-- Wyświetlanie ustawionych celów -->
      <div v-if="savedGoals" class="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 class="text-xl font-bold text-gray-700 dark:text-white mb-2">Twoje cele</h3>
        <ul class="space-y-2">
          <li class="text-gray-700 dark:text-gray-300">🔹 Kalorie: {{ calorieGoal }} kcal</li>
          <li class="text-gray-700 dark:text-gray-300">🔹 Białko: {{ proteinGoal }} g</li>
          <li class="text-gray-700 dark:text-gray-300">🔹 Tłuszcze: {{ fatGoal }} g</li>
          <li class="text-gray-700 dark:text-gray-300">🔹 Węglowodany: {{ carbGoal }} g</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const calorieGoal = ref("");
  const proteinGoal = ref("");
  const fatGoal = ref("");
  const carbGoal = ref("");
  const savedGoals = ref(false);
  
  const setGoal = () => {
    if (calorieGoal.value && proteinGoal.value && fatGoal.value && carbGoal.value) {
      savedGoals.value = true;
    }
  };
  </script>
  