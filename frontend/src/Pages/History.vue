<template>
  <div :class="['container mx-auto p-6 min-h-screen', isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']">
    <h2 class="text-3xl font-bold mb-4 text-center">
      Historia posiłków
    </h2>

    <!-- Historia posiłków -->
    <ul v-if="history?.length" class="mt-4 space-y-4" role="list" aria-label="Historia posiłków">
      <li
        v-for="mealGroup in history"
        :key="mealGroup.id"
        :class="[isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900', 'p-4 rounded-lg shadow-md']"
      >
        <h3 class="font-semibold text-lg" :aria-level="3">
          {{ mealGroup.name }} ({{ mealGroup.date }})
        </h3>
        <ul class="ml-4 mt-2 space-y-2" role="list" aria-label="Lista posiłków">
          <li v-for="meal in mealGroup.meals" :key="meal.id">
            🍽️ {{ meal.product_name }} – {{ meal.calories }} kcal
          </li>
        </ul>
      </li>
    </ul>

    <p v-else :class="[isDarkMode ? 'text-gray-400' : 'text-gray-500', 'text-center mt-4']">
      Brak zapisanej historii posiłków.
    </p>

    <!-- Historia aktywności -->
    <div class="mt-10">
      <h2 class="text-3xl font-bold mb-4 text-center">
        Historia aktywności
      </h2>

      <ul
        v-if="activitiesStore.activities.length"
        class="mt-4 space-y-4"
        role="list"
        aria-label="Lista aktywności fizycznych"
      >
        <li
          v-for="activity in activitiesStore.activities"
          :key="activity.id"
          :class="[isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900', 'p-4 rounded-lg shadow-md flex justify-between items-center']"
        >
          <div>
            <span class="font-semibold">{{ activity.type }} – {{ activity.duration }} min</span>
            <span class="ml-2 text-green-500 font-medium">({{ activity.caloriesBurned }} kcal)</span>
          </div>
          <button
            @click="activitiesStore.removeActivity(activity.id)"
            :aria-label="`Usuń aktywność: ${activity.type}`"
            class="text-red-600 hover:text-red-800 font-semibold transition"
          >
            ❌
          </button>
        </li>
      </ul>

      <p v-else :class="[isDarkMode ? 'text-gray-400' : 'text-gray-500', 'text-center mt-4']">
        Brak zapisanych aktywności.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useMealsStore } from "../stores/meals";
import { useActivitiesStore } from "../stores/activitiesStore";
import { useThemeStore } from "../composables/theme";

const mealsStore = useMealsStore();
const history = computed(() => mealsStore.history || []);

const activitiesStore = useActivitiesStore();

const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.theme === "dark");

onMounted(() => {
  mealsStore.loadHistory();
  activitiesStore.loadActivities();
});
</script>
