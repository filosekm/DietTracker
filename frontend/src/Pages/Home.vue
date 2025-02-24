<template>
  <div :class="['container mx-auto p-6 min-h-screen', themeStore.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']">
    <h1 class="text-4xl font-bold text-center mb-8">
      Witaj w Diet Tracker
    </h1>

    <p class="text-center text-lg mb-6">
      Monitoruj swoją dietę, analizuj spożycie kalorii i dbaj o zdrowy styl życia!
    </p>

    <!-- 🔥 Siatka kart funkcjonalności -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="(feature, index) in features" :key="index"
        :class="['p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer', themeStore.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900']">
        <h3 class="text-xl font-semibold mb-2">
          {{ feature.title }}
        </h3>
        <p>{{ feature.description }}</p>
        <router-link :to="feature.link"
          class="inline-block mt-4 text-blue-500 hover:text-blue-600 font-semibold">
          Otwórz →
        </router-link>
      </div>
    </div>

    <!-- 🔥 Powiadomienia -->
    <div v-if="notificationsStore.notifications?.length > 0" 
      :class="['mt-6 p-4 rounded-lg shadow-md', themeStore.theme === 'dark' ? 'bg-yellow-700 text-white' : 'bg-yellow-100 text-gray-900']">
      <h3 class="text-lg font-semibold mb-2">Powiadomienia</h3>
      <ul>
        <li v-for="(notification, index) in notificationsStore.notifications" :key="index"
          class="p-2 border-b last:border-none">
          {{ notification.message }}
        </li>
      </ul>
    </div>

    <!-- 🔥 Panel aktywności -->
    <div class="mt-6">
      <h2 class="text-2xl font-semibold text-center">Ostatnie aktywności</h2>
      <div :class="['p-6 rounded-lg shadow-md mt-4', themeStore.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900']">
        <ul v-if="latestActivities.length > 0">
          <li v-for="(activity, index) in latestActivities" :key="index"
            class="flex justify-between items-center p-3 border-b last:border-none">
            <span class="font-semibold">{{ activity.type }}</span>
            <span class="text-sm">{{ activity.duration }} min</span>
            <span class="text-green-500 font-semibold">🔥 {{ activity.caloriesBurned }} kcal</span>
          </li>
        </ul>
        <p v-else class="text-center mt-4">Brak ostatnich aktywności.</p>
      </div>
    </div>

        <div class="p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4 text-center">Dzienne spożycie</h3>
    
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center">
            <!-- Kalorie -->
            <div class="flex flex-col items-center">
              <apexchart v-if="isApexLoaded" type="radialBar" height="250" :options="chartOptions" :series="[calorieProgress]"></apexchart>
              <p class="mt-2 font-semibold">Kalorie: {{ totalCalories }}/{{ goals.calories }} kcal</p>
            </div>
    
            <!-- Białko -->
            <div class="flex flex-col items-center">
              <apexchart v-if="isApexLoaded" type="radialBar" height="250" :options="chartOptions" :series="[proteinProgress]"></apexchart>
              <p class="mt-2 font-semibold">Białko: {{ totalProtein }}/{{ goals.protein }} g</p>
            </div>
    
            <!-- Węglowodany -->
            <div class="flex flex-col items-center">
              <apexchart v-if="isApexLoaded" type="radialBar" height="250" :options="chartOptions" :series="[carbsProgress]"></apexchart>
              <p class="mt-2 font-semibold">Węglowodany: {{ totalCarbs }}/{{ goals.carbs }} g</p>
            </div>

            <div class="flex flex-col items-center">
              <apexchart v-if="isApexLoaded" type="radialBar" height="250" :options="chartOptions" :series="[fatsProgress]"></apexchart>
              <p class="mt-2 font-semibold">Tłuszcze: {{ totalFats }}/{{ goals.fats }} g</p>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useMealsStore } from "../stores/meals";
import { useGoalsStore } from "../stores/goals";
import { useNotificationsStore } from "../stores/notificationsStore";
import { useActivitiesStore } from "../stores/activitiesStore";
import { useThemeStore } from "../composables/theme";

const mealsStore = useMealsStore();
const goalsStore = useGoalsStore();
const notificationsStore = useNotificationsStore();
const activitiesStore = useActivitiesStore();
const themeStore = useThemeStore();

const todayMeals = ref([]);
const latestActivities = ref([]);
onMounted(() => {
  setTimeout(() => {
    isApexLoaded.value = true;
  }, 500);
});
const isApexLoaded = ref(false);
// ✅ Pobieranie dzisiejszych posiłków
onMounted(async () => {
  try {
    await mealsStore.fetchTodayMeals();
    todayMeals.value = mealsStore.todayMeals || [];
    activitiesStore.loadActivities();
  } catch (error) {
    console.error("❌ Błąd pobierania dzisiejszych posiłków:", error);
    todayMeals.value = [];
  }
});

// ✅ Pobieranie celów dietetycznych użytkownika
const goals = computed(() => goalsStore.goals || { calories: 2000, protein: 100, carbs: 250 });

// ✅ Obliczanie wartości spożycia
const totalCalories = computed(() =>
  todayMeals.value.reduce((sum, meal) => sum + (meal.calories || 0), 0)
);
const totalProtein = computed(() =>
  todayMeals.value.reduce((sum, meal) => sum + (meal.protein || 0), 0)
);
const totalCarbs = computed(() =>
  todayMeals.value.reduce((sum, meal) => sum + (meal.carbs || 0), 0)
);
const totalFats = computed(() =>
  todayMeals.value.reduce((sum, meal) => sum + (meal.fats || 0), 0)
);

// ✅ Obliczanie procentowego postępu (max 100%)
const calorieProgress = computed(() => Math.min((totalCalories.value / goals.value.calories) * 100, 100) || 0);
const proteinProgress = computed(() => Math.min((totalProtein.value / goals.value.protein) * 100, 100) || 0);
const carbsProgress = computed(() => Math.min((totalCarbs.value / goals.value.carbs) * 100, 100) || 0);
const fatsProgress = computed(() => Math.min((totalFats.value / goals.value.fats) * 100, 100) || 0);
// ✅ Konfiguracja ApexCharts
const chartOptions = computed(() => ({
  chart: {
    type: "radialBar",
    height: 250,
    foreColor: themeStore.theme === "dark" ? "#ffffff" : "#000000",
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "60%",
      },
      track: {
        background: themeStore.theme === "dark" ? "#2D3748" : "#E2E8F0",
      },
      dataLabels: {
        name: {
          fontSize: "16px",
        },
        value: {
          fontSize: "14px",
          formatter: function (val) {
            return val.toFixed(1) + "%";
          },
        },
      },
    },
  },
  labels: ["Postęp"],
}));
// ✅ Zachowanie kart nawigacyjnych
const features = [
  { title: "Rejestrowanie posiłków", description: "Dodawaj swoje posiłki i śledź ich wartości odżywcze.", link: "/nutrition" },
  { title: "Raporty i analizy", description: "Analizuj swoje dane i obserwuj postępy.", link: "/reports" },
  { title: "Ustawienia celów", description: "Personalizuj swoje cele dietetyczne i zdrowotne.", link: "/settings" },
  { title: "Historia i aktywność", description: "Sprawdzaj swoje wcześniejsze dane i śledź aktywność.", link: "/history" },
  { title: "Lista zakupów", description: "Generowana lista na podstawie zaplanowanych posiłków.", link: "/shopping-list" },
  { title: "Aktywność fizyczna", description: "Dodawaj aktywność i sprawdzaj bilans kaloryczny.", link: "/activities" }
];
</script>
