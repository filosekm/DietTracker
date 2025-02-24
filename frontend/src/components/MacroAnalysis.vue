<template>
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">Analiza makroskładników</h2>
  
      <!-- Wykres makroskładników -->
      <div class="w-full flex justify-center my-6">
        <canvas ref="macroChart"></canvas>
      </div>
  
      <!-- Informacje o makroskładnikach -->
      <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
        <h3 class="text-xl font-bold text-gray-700 dark:text-white mb-2">Dzienna wartość</h3>
        <ul class="space-y-2">
          <li class="text-gray-700 dark:text-gray-300">🍗 Białko: {{ protein }} g</li>
          <li class="text-gray-700 dark:text-gray-300">🫒 Tłuszcze: {{ fat }} g</li>
          <li class="text-gray-700 dark:text-gray-300">🥖 Węglowodany: {{ carbs }} g</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import Chart from "chart.js/auto";
  
  const protein = ref(100);
  const fat = ref(70);
  const carbs = ref(250);
  const macroChart = ref(null);
  
  onMounted(() => {
    if (macroChart.value) {
      new Chart(macroChart.value, {
        type: "doughnut",
        data: {
          labels: ["Białko", "Tłuszcze", "Węglowodany"],
          datasets: [
            {
              data: [protein.value, fat.value, carbs.value],
              backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: { color: "#ffffff" }, // Tryb ciemny
            },
          },
        },
      });
    }
  });
  </script>
  