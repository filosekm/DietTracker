<template>
  <div :class="['container mx-auto p-6 min-h-screen', isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']">
    <h2 class="text-3xl font-bold mb-4 text-center">
      Aktywność Fizyczna
    </h2>

    <div :class="[isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900', 'p-6 rounded-lg shadow-md']">
      <!-- Formularz dodawania aktywności -->
      <div class="flex flex-col gap-4 mb-6">
        <div>
          <label for="activityType" class="sr-only">Nazwa aktywności</label>
          <input
          id="activityType"
          v-model="activityType"
          type="text"
          placeholder="Nazwa aktywności..."
          :class="[isDarkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500', 'w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition']"
        />
        </div>

        <div>
          <label for="activityDuration" class="sr-only">Czas trwania (minuty)</label>
          <input
            id="activityDuration"
            v-model="activityDuration"
            type="number"
            placeholder="Czas (minuty)..."
            :class="[isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500', 'w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition']"
          />
        </div>

        <div>
          <label for="activityCalories" class="sr-only">Spalone kalorie</label>
          <input
            id="activityCalories"
            v-model="activityCalories"
            type="number"
            placeholder="Spalone Kcal..."
            :class="[isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500', 'w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition']"
          />
        </div>

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
          :class="[isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900', 'flex justify-between items-center p-3 rounded-lg']"
        >
          <span>
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

      <p 
        v-if="activitiesStore.activities.length === 0"
        :class="[isDarkMode ? 'text-gray-400' : 'text-gray-500', 'text-center mt-4']"
      >
        Brak zapisanych aktywności.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useActivitiesStore } from "../stores/activitiesStore";
import { useThemeStore } from "../composables/theme";

const activitiesStore = useActivitiesStore();
const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.theme === "dark");

const activityType = ref("");
const activityDuration = ref("");
const activityCalories = ref("");

onMounted(() => {
  activitiesStore.loadActivities();
});

const addActivity = async () => {
  if (activityType.value.trim() !== "" && activityDuration.value > 0) {
    await activitiesStore.addActivity({
      type: activityType.value,
      duration: Number(activityDuration.value),
      caloriesBurned: Number(activityCalories.value),
    });

    activityType.value = "";
    activityDuration.value = "";
    activityCalories.value = "";
  }
};

const removeActivity = async (id) => {
  await activitiesStore.removeActivity(id);
};
</script>
