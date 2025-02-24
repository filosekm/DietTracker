<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">Szukaj produktu</h2>

    <!-- Pole wyszukiwania -->
    <div class="flex gap-2">
      <input 
        v-model="searchQuery"
        @input="debouncedSearch"
        type="text"
        placeholder="Wpisz nazwę produktu..."
        class="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
      />
    </div>

    <!-- Lista wyników -->
    <ul v-if="products.length > 0" class="mt-4 space-y-2">
      <li v-for="product in products" :key="product.id"
          class="p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex justify-between items-center">
        <div>
          <span class="font-semibold">{{ product.name }}</span> - {{ product.calories }} kcal
        </div>
        <button 
          @click="selectProduct(product)"
          class="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          ➕ Dodaj
        </button>
      </li>
    </ul>

    <p v-if="products.length === 0 && searchQuery !== ''" class="text-center text-gray-500 dark:text-gray-400 mt-4">
      Brak wyników dla "{{ searchQuery }}".
    </p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { useMealsStore } from "../stores/meals"; 

const searchQuery = ref("");
const products = ref([]);
const mealsStore = useMealsStore();
let searchTimeout = null;

const searchProducts = async () => {
  if (!searchQuery.value.trim()) {
    products.value = [];
    return;
  }

  try {
    const response = await axios.get(`http://localhost:5000/api/products/search?query=${searchQuery.value}`);
    products.value = response.data.map(product => ({
      id: product.id,
      name: product.name,
      calories: product.calories || 0,
      protein: product.protein || 0,   // ✅ Zmieniamy null na 0
      carbs: product.carbs || 0,       // ✅ Zmieniamy null na 0
      fats: product.fats || 0          // ✅ Zmieniamy null na 0
    }));
  } catch (error) {
    console.error("Błąd wyszukiwania produktów:", error);
  }
};

watch(searchQuery, (newQuery) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchProducts();
  }, 500);
});

// ✅ Dodawanie produktu do `mealsStore`
const selectProduct = (product) => {
  console.log("Dodano produkt:", product);
  mealsStore.addMeal(product);
};
</script>