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
              🍽️ {{ meal.product_name }} - {{ meal.calories }} kcal
            </li>
          </ul>
        </li>
      </ul>
  
      <!-- Komunikat, jeśli historia jest pusta -->
      <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-4">
        Brak zapisanej historii posiłków.
      </p>
    </div>
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Historia aktywności
      </h2>
  
      <ul v-if="activitiesStore.activities.length" class="mt-4 space-y-4">
        <li v-for="activity in activitiesStore.activities" :key="activity.id"
            class="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-md">
          <span class="font-semibold">{{ activity.type }} - {{ activity.duration }} min</span>
          <span class="text-gray-500">({{ activity.caloriesBurned }} kcal spalonych)</span>
          <button @click="activitiesStore.removeActivity(activity.id)"
                  class="ml-2 text-red-500 hover:text-red-700 transition">
            ❌ Usuń
          </button>
        </li>
      </ul>
  
      <p v-else class="text-center text-gray-500 dark:text-gray-400 mt-4">
        Brak zapisanych aktywności.
      </p>
    </div>
  </template>
  
  <script setup>
  import { computed, onMounted } from "vue";
  import { useMealsStore } from "../stores/meals";
  import { useActivitiesStore } from "../stores/activitiesStore";

  const mealsStore = useMealsStore();
  const history = computed(() => mealsStore.history || []); // ✅ Domyślnie ustawiona tablica
  
  const activitiesStore = useActivitiesStore();


  onMounted(() => {
    mealsStore.loadHistory();
    activitiesStore.loadActivities();
  });
  </script>
  