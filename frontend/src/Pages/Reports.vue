<template>
  <div class="container mx-auto p-6">
    <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Raporty i Analizy</h2>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <!-- 🔥 Wybór zakresu raportu -->
      <div class="mb-6">
        <label class="block text-gray-700 dark:text-white font-medium">Zakres raportu:</label>
        <select v-model="reportType" class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white">
          <option value="daily">Dzienny</option>
          <option value="weekly">Tygodniowy</option>
          <option value="monthly">Miesięczny</option>
        </select>
      </div>

      <!-- 🔥 Spożycie kalorii -->
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Spożycie Kalorii</h3>
      <div v-if="calorieChartData" class="h-60">
        <Bar :data="calorieChartData" :options="chartOptions" />
      </div>

      <!-- 🔥 Spożycie Makroskładników -->
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">Spożycie Makroskładników</h3>
      <div v-if="macroChartData" class="h-60">
        <Bar :data="macroChartData" :options="chartOptionsBar" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useMealsStore } from "../stores/meals";
import { useGoalsStore } from "../stores/goals";
import { useThemeStore } from "../composables/theme";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// ✅ Rejestracja ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const mealsStore = useMealsStore();
const goalsStore = useGoalsStore();
const themeStore = useThemeStore();
const reportType = ref("daily");

// ✅ Pobieranie danych na starcie
onMounted(() => {
  mealsStore.loadHistory(); // ✅ Pobierz historię posiłków
  goalsStore.loadGoals(); // ✅ Pobierz cele dietetyczne
});

// ✅ Filtrowanie posiłków według zakresu czasu
const filteredMeals = computed(() => {
  const now = new Date();
  const rangeDays = reportType.value === "weekly" ? 7 : reportType.value === "monthly" ? 30 : 1;

  return mealsStore.history.flatMap(group =>
    group.meals.filter(meal => {
      const mealDate = new Date(group.date);
      return (now - mealDate) / (1000 * 60 * 60 * 24) < rangeDays;
    })
  );
});

// ✅ Sumowanie wartości
const totalCalories = computed(() =>
  filteredMeals.value.reduce((sum, meal) => sum + (meal.calories || 0), 0)
);
const totalProtein = computed(() =>
  filteredMeals.value.reduce((sum, meal) => sum + (meal.protein || 0), 0)
);
const totalCarbs = computed(() =>
  filteredMeals.value.reduce((sum, meal) => sum + (meal.carbs || 0), 0)
);
const totalFats = computed(() =>
  filteredMeals.value.reduce((sum, meal) => sum + (meal.fats || 0), 0)
);

// ✅ Dynamiczne kolory wykresów
const isDarkMode = computed(() => themeStore.theme === "dark");
const chartColors = computed(() => ({
  text: isDarkMode.value ? "#ffffff" : "#000000",
  background: isDarkMode.value ? "#1E293B" : "#E5E7EB",
  gridColor: isDarkMode.value ? "#6B7280" : "#D1D5DB",
}));

// ✅ Opcje wykresów
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: chartColors.value.text } },
    tooltip: {
      titleColor: chartColors.value.text,
      bodyColor: chartColors.value.text,
      backgroundColor: chartColors.value.background,
    },
  },
  scales: {
    x: { grid: { color: chartColors.value.gridColor }, ticks: { color: chartColors.value.text } },
    y: { grid: { color: chartColors.value.gridColor }, ticks: { color: chartColors.value.text } },
  },
}));

// ✅ Opcje dla makroskładników
const chartOptionsBar = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  barPercentage: 0.6,
  categoryPercentage: 0.6,
  plugins: {
    legend: { labels: { color: chartColors.value.text } },
    tooltip: {
      titleColor: chartColors.value.text,
      bodyColor: chartColors.value.text,
      backgroundColor: chartColors.value.background,
    },
  },
  scales: {
    x: { grid: { color: chartColors.value.gridColor }, ticks: { color: chartColors.value.text } },
    y: { grid: { color: chartColors.value.gridColor }, ticks: { color: chartColors.value.text } },
  },
}));

// ✅ Dane do wykresów
const calorieChartData = computed(() => ({
  labels: ["Spożyte", "Cel"],
  datasets: [
    {
      label: "Kalorie (kcal)",
      data: [totalCalories.value, goalsStore.goals.calories],
      backgroundColor: ["#3B82F6", "#D1D5DB"],
    },
  ],
}));

const macroChartData = computed(() => ({
  labels: ["Białko", "Węglowodany", "Tłuszcze"],
  datasets: [
    {
      label: "Makroskładniki (g)",
      data: [totalProtein.value, totalCarbs.value, totalFats.value],
      backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
    },
  ],
}));
</script>
