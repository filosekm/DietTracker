<template>
  <div class="container mx-auto p-6">
    <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Aktywność Fizyczna</h2>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <!-- Formularz dodawania aktywności -->
      <div class="flex flex-col gap-4 mb-6">
        <input
          v-model="activityType"
          type="text"
          placeholder="Nazwa aktywności..."
          class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <input
          v-model="activityDuration"
          type="number"
          placeholder="Czas (minuty)..."
          class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <input
          v-model="activityCalories"
          type="number"
          placeholder="Spalone Kcal..."
          class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <button
          @click="addActivity"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
        >
          Dodaj aktywność
        </button>
      </div>

      <!-- Lista aktywności -->
      <ul class="space-y-2">
        <li
          v-for="activity in activitiesStore.activities"
          :key="activity.id"
          class="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <span class="text-gray-900 dark:text-white">
            {{ activity.type }} – {{ activity.duration }} min ({{ activity.caloriesBurned }} kcal)
          </span>
          <button
            @click="removeActivity(activity.id)"
            class="p-1 text-red-500 hover:text-red-700 transition duration-200"
          >
            ❌
          </button>
        </li>
      </ul>

      <p v-if="activitiesStore.activities.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-4">
        Brak zapisanych aktywności.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useActivitiesStore } from "../stores/activitiesStore";

const activitiesStore = useActivitiesStore();
const activityType = ref("");
const activityDuration = ref("");
const activityCalories = ref("");

// ✅ Pobieranie aktywności po uruchomieniu komponentu
onMounted(() => {
  activitiesStore.loadActivities();
});

// ✅ Dodawanie aktywności do bazy
const addActivity = async () => {
  if (activityType.value.trim() !== "" && activityDuration.value > 0) {
    await activitiesStore.addActivity({
      type: activityType.value,
      duration: Number(activityDuration.value),
      caloriesBurned: Number(activityCalories.value),
    });

    // Czyszczenie pól po dodaniu
    activityType.value = "";
    activityDuration.value = "";
    activityCalories.value = "";
  }
};

// ✅ Usuwanie aktywności z bazy
const removeActivity = async (id) => {
  await activitiesStore.removeActivity(id);
};
</script>
