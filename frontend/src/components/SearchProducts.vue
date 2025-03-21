<template>
  <div :class="[isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', 'p-6 rounded-lg shadow-md']">
    <h2 class="text-2xl font-bold mb-4">
      Szukaj produktu
    </h2>

    <!-- Pole wyszukiwania -->
    <div class="flex gap-2">
      <input 
        v-model="searchQuery"
        @input="debouncedSearch"
        type="text"
        placeholder="Wpisz nazwę produktu..."
        :class="[
          isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
          'w-full p-3 border rounded-lg focus:ring focus:ring-blue-400 transition'
        ]"
      />
    </div>

    <!-- Lista wyników -->
    <ul v-if="products.length > 0" class="mt-4 space-y-2">
      <li v-for="product in products" :key="product.id"
          :class="[
            isDarkMode 
              ? 'bg-gray-700 text-white border-gray-600' 
              : 'bg-gray-100 text-gray-900 border-gray-300',
            'p-3 border rounded-lg flex justify-between items-center'
          ]">
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

    <p 
      v-if="products.length === 0 && searchQuery !== ''" 
      :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
      class="text-center mt-4"
    >
      Brak wyników dla "{{ searchQuery }}".
    </p>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";
import { useMealsStore } from "../stores/meals";
import { useThemeStore } from "../composables/theme";

const searchQuery = ref("");
const products = ref([]);
const mealsStore = useMealsStore();
const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.theme === "dark");

let searchTimeout = null;

const searchProducts = async () => {
  if (!searchQuery.value.trim()) {
    products.value = [];
    return;
  }

  try {
    const response = await axios.get(`https://backendpraca.onrender.com/api/products/search?query=${searchQuery.value}`);
    products.value = response.data.map(product => ({
      id: product.id,
      name: product.name,
      calories: product.calories || 0,
      protein: product.proteins || 0,
      carbs: product.carbs || 0,
      fats: product.fats || 0
    }));
  } catch (error) {
    console.error("Błąd wyszukiwania produktów:", error);
  }
};

const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchProducts();
  }, 500);
};

// ✅ Dodawanie produktu do mealsStore
const selectProduct = (product) => {
  console.log("Dodano produkt:", product);
  mealsStore.addMeal(product);
};
</script>
