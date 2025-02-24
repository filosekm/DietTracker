<template>
  <div class="container mx-auto p-6">
    <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Rejestrowanie posiłków</h2>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <SearchProducts @select-product="addProductToMeal" />

      <button @click="toggleAddMealForm"
              class="mt-4 w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition">
        {{ showAddMealForm ? "Anuluj" : "Dodaj posiłek ręcznie" }}
      </button>

      <AddMeal v-if="showAddMealForm" @add-meal="mealsStore.addMeal" class="mt-4" />

      <div class="mt-6">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Twoje posiłki</h3>
        <ul class="mt-4 space-y-2">
          <li v-for="(meal, index) in mealsStore.meals" :key="meal.id"
            class="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
            
            <div class="flex justify-between items-center">
              <span class="text-gray-900 dark:text-white font-semibold">{{ meal.name }} - {{ meal.calories }} kcal</span>
              <button @click="mealsStore.removeMeal(index)"
                class="p-2 text-red-500 hover:text-red-700 transition">
                ❌
              </button>
            </div>

            <!-- 🔥 Tryb podglądu -->
            <div v-if="!meal.isEditing" class="mt-2">
              <p class="text-gray-700 dark:text-gray-300">Białko: {{ meal.protein }}g | Węglowodany: {{ meal.carbs }}g | Tłuszcze: {{ meal.fats }}g</p>
              <button @click="toggleEdit(meal)" 
                class="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                ✏️ Edytuj
              </button>
            </div>

            <!-- 🔥 Tryb edycji -->
            <div v-else class="mt-2 grid grid-cols-3 gap-2">
              <div>
                <label class="text-gray-700 dark:text-white text-sm">Białko</label>
                <input v-model="meal.protein" type="number" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              </div>
              <div>
                <label class="text-gray-700 dark:text-white text-sm">Węglowodany</label>
                <input v-model="meal.carbs" type="number" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              </div>
              <div>
                <label class="text-gray-700 dark:text-white text-sm">Tłuszcze</label>
                <input v-model="meal.fats" type="number" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
              </div>
              <button @click="saveEdit(meal)"
                class="mt-2 col-span-3 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                💾 Zapisz
              </button>
            </div>

          </li>
        </ul>

        <p v-if="mealsStore.meals.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-4">
          Brak zarejestrowanych posiłków.
        </p>

        <!-- ✅ Przycisk zapisywania posiłków -->
        <button v-if="mealsStore.meals.length > 0"
          @click="saveMealsToHistory"
          class="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition">
          💾 Zapisz posiłki
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMealsStore } from "../stores/meals";
import AddMeal from "../components/AddMeal.vue";
import SearchProducts from "../components/SearchProducts.vue";

const mealsStore = useMealsStore();
const showAddMealForm = ref(false);

const toggleAddMealForm = () => {
  showAddMealForm.value = !showAddMealForm.value;
};

// ✅ Funkcja zapisywania posiłków
const saveMealsToHistory = () => {
  mealsStore.saveMealGroup("Posiłki");
};

// ✅ Dodawanie wybranego produktu do posiłków
const addProductToMeal = (product) => {
  mealsStore.addMeal({ 
    ...product, 
    isEditing: false  // 🔥 Dodajemy `isEditing` do kontroli edycji
  });
};

// ✅ Włączanie/wyłączanie trybu edycji
const toggleEdit = (meal) => {
  meal.isEditing = true;
};

// ✅ Zapisywanie edycji
const saveEdit = (meal) => {
  meal.isEditing = false;
};
</script>
