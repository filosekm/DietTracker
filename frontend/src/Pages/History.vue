<template>
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Historia posiłków
      </h2>
  
      <!-- Sprawdzenie, czy historia zawiera dane -->
      <ul v-if="history?.length" class="mt-4 space-y-4">
        <li v-for="mealGroup in history" :key="mealGroup.id"
            class="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-md">
          <h3 class="font-semibold">{{ mealGroup.name }} ({{ mealGroup.date }})</h3>
          <ul class="ml-4 mt-2 space-y-2">
            <li v-for="meal in mealGroup.meals" :key="meal.id">
              🍽️ {{ meal.name }} - {{ meal.calories }} kcal
            </li>
          </ul>
        </li>
      </ul>
  
      <!-- Komunikat, jeśli historia jest pusta -->
      <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-4">
        Brak zapisanej historii posiłków.
      </p>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from "vue";
  import { useMealsStore } from "../stores/meals";
  
  const mealsStore = useMealsStore();
  const history = computed(() => mealsStore.history || []); // ✅ Domyślnie ustawiona tablica
  
  onMounted(() => {
    mealsStore.loadHistory();
  });
  </script>
  