<template>
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">Raport spożycia kalorii</h2>
  
      <!-- Wykres -->
      <div class="w-full flex justify-center my-6">
        <canvas ref="chartCanvas"></canvas>
      </div>
  
      <!-- Legenda -->
      <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 class="text-xl font-bold text-gray-700 dark:text-white mb-2">Podsumowanie</h3>
        <ul class="space-y-2">
          <li class="text-gray-700 dark:text-gray-300">📊 Średnia dzienna kaloryczność: {{ avgCalories }} kcal</li>
          <li class="text-gray-700 dark:text-gray-300">📆 Ostatnie 7 dni monitorowania</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Chart from "chart.js/auto";
  
  const chartCanvas = ref(null);
  const avgCalories = ref(1800);
  
  const dailyCalories = [2000, 1800, 1750, 1900, 1850, 1700, 1950];
  
  onMounted(() => {
    if (chartCanvas.value) {
      new Chart(chartCanvas.value, {
        type: "line",
        data: {
          labels: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nd"],
          datasets: [
            {
              label: "Kalorie (kcal)",
              data: dailyCalories,
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              borderWidth: 2,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: "#ffffff" },
            },
          },
          scales: {
            x: {
              ticks: { color: "#ffffff" },
            },
            y: {
              ticks: { color: "#ffffff" },
            },
          },
        },
      });
    }
  });
  </script>
  