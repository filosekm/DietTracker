<template>
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Aktywność Fizyczna</h2>
  
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <!-- Formularz dodawania aktywności -->
        <div class="flex flex-col gap-4 mb-6">
          <input
            v-model="activityName"
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
            v-model="activityBurnedkcal"
            type="number"
            placeholder="Spalone Kcal"
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
            v-for="(activity, index) in activities"
            :key="index"
            class="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <span class="text-gray-900 dark:text-white">
              {{ activity.name }} – {{ activity.duration }} min
            </span>
            <button
              @click="removeActivity(index)"
              class="p-1 text-red-500 hover:text-red-700 transition duration-200"
            >
              ❌
            </button>
          </li>
        </ul>
  
        <p v-if="activities.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-4">
          Brak zapisanych aktywności.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const activities = ref([]);
  const activityName = ref("");
  const activityDuration = ref("");
  const activityBurnedkcal = ref("");
  
  const addActivity = () => {
    if (activityName.value.trim() !== "" && activityDuration.value > 0) {
      activities.value.push({ name: activityName.value, duration: activityDuration.value, value: activityBurnedkcal.value});
      activityName.value = "";
      activityDuration.value = "";
      activityBurnedkcal.value = "";
    }
  };
  
  const removeActivity = (index) => {
    activities.value.splice(index, 1);
  };
  </script>
  