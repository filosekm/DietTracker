<template>
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Raporty i Analizy</h2>
  
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Spożycie Kalorii</h3>
        <BarChart :chart-data="calorieChartData" :chart-options="chartOptions" />
  
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">Spożycie Makroskładników</h3>
        <PieChart :chart-data="macroChartData" :chart-options="chartOptions" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useMealsStore } from "../stores/meals";
  import { useGoalsStore } from "../stores/goals";
  import { Bar, Pie } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement
  } from "chart.js";
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement);
  
  const mealsStore = useMealsStore();
  const goalsStore = useGoalsStore();
  
  // Pobieranie celów dietetycznych
  const goals = computed(() => goalsStore.goals);
  
  // Sumowanie kalorii i makroskładników
  const totalCalories = computed(() =>
    mealsStore.meals.reduce((sum, meal) => sum + (meal.calories || 0), 0)
  );
  const totalProtein = computed(() =>
    mealsStore.meals.reduce((sum, meal) => sum + (meal.protein || 0), 0)
  );
  const totalCarbs = computed(() =>
    mealsStore.meals.reduce((sum, meal) => sum + (meal.carbs || 0), 0)
  );
  const totalFats = computed(() =>
    mealsStore.meals.reduce((sum, meal) => sum + (meal.fats || 0), 0)
  );
  
  // Dane do wykresów
  const calorieChartData = computed(() => ({
    labels: ["Spożyte", "Cel"],
    datasets: [
      {
        label: "Kalorie (kcal)",
        data: [totalCalories.value, goals.value.calories],
        backgroundColor: ["#3B82F6", "#D1D5DB"]
      }
    ]
  }));
  
  const macroChartData = computed(() => ({
    labels: ["Białko", "Węglowodany", "Tłuszcze"],
    datasets: [
      {
        label: "Makroskładniki (g)",
        data: [totalProtein.value, totalCarbs.value, totalFats.value],
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"]
      }
    ]
  }));
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  </script>
  