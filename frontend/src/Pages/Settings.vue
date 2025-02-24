<template>
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Ustawienia Celów</h2>
  
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Twoje cele</h3>
        
        <form @submit.prevent="updateGoals" class="space-y-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium">Cel Kaloryczny (kcal)</label>
            <input v-model="calories" type="number" min="0"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white" />
          </div>
  
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium">Białko (g)</label>
            <input v-model="protein" type="number" min="0"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-400 dark:bg-gray-700 dark:text-white" />
          </div>
  
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium">Węglowodany (g)</label>
            <input v-model="carbs" type="number" min="0"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:text-white" />
          </div>
  
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium">Tłuszcze (g)</label>
            <input v-model="fats" type="number" min="0"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-400 dark:bg-gray-700 dark:text-white" />
          </div>
  
          <button type="submit"
            class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200">
            Zapisz zmiany
          </button>
        </form>
  
        <p v-if="successMessage" class="text-green-500 font-medium mt-4">{{ successMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useGoalsStore } from "../stores/goals";
  
  const goalsStore = useGoalsStore();
  
  const calories = ref(goalsStore.goals.calories);
  const protein = ref(goalsStore.goals.protein);
  const carbs = ref(goalsStore.goals.carbs);
  const fats = ref(goalsStore.goals.fats);
  const successMessage = ref("");
  
  // 🔥 Aktualizacja celów użytkownika
  const updateGoals = () => {
    goalsStore.setGoals({
      calories: parseInt(calories.value),
      protein: parseInt(protein.value),
      carbs: parseInt(carbs.value),
      fats: parseInt(fats.value)
    });
  
    successMessage.value = "Cele zostały zaktualizowane!";
    setTimeout(() => (successMessage.value = ""), 3000);
  };
  </script>
  