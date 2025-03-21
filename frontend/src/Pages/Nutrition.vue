<template>
  <div :class="['container mx-auto p-6 min-h-screen', isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']">
    <h2 class="text-3xl font-bold mb-4 text-center">
      Rejestrowanie posiłków
    </h2>

    <div :class="[isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900', 'p-6 rounded-lg shadow-md']">
      <SearchProducts @select-product="addProductToMeal" />

      <button @click="toggleAddMealForm"
        class="mt-4 w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition">
        {{ showAddMealForm ? "Anuluj" : "Dodaj posiłek ręcznie" }}
      </button>

      <AddMeal v-if="showAddMealForm" @add-meal="mealsStore.addMeal" class="mt-4" />

      <div class="mt-6">
        <h3 class="text-2xl font-semibold mb-4">
          Twoje posiłki
        </h3>
        <ul class="space-y-2">
          <li v-for="(meal, index) in mealsStore.meals" :key="meal.id"
            :class="[isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900', 'p-4 rounded-lg shadow-md']">

            <div class="flex justify-between items-center">
              <span class="font-semibold">{{ meal.name }} - {{ meal.calories }} kcal</span>
              <button @click="mealsStore.removeMeal(index)"
                class="p-2 text-red-500 hover:text-red-700 transition" aria-label="Usuń posiłek">
                ❌
              </button>
            </div>

            <!-- 🔥 Tryb podglądu -->
            <div v-if="!meal.isEditing" class="mt-2">
              <p :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'">
                Białko: {{ meal.protein }}g | Węglowodany: {{ meal.carbs }}g | Tłuszcze: {{ meal.fats }}g
              </p>
              <button @click="toggleEdit(meal)"
                class="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition" aria-label="Edytuj posiłek">
                ✏️ Edytuj
              </button>
            </div>

            <!-- 🔥 Tryb edycji -->
            <div v-else class="mt-2 grid grid-cols-3 gap-2">
              <div>
                <label :for="`protein-${meal.id}`" :class="isDarkMode ? 'text-white' : 'text-gray-700'" class="text-sm">Białko</label>
                <input :id="`protein-${meal.id}`" v-model="meal.protein" type="number"
                  :class="[isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900', 'w-full p-2 border rounded-lg']" />
              </div>
              <div>
                <label :for="`carbs-${meal.id}`" :class="isDarkMode ? 'text-white' : 'text-gray-700'" class="text-sm">Węglowodany</label>
                <input :id="`carbs-${meal.id}`" v-model="meal.carbs" type="number"
                  :class="[isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900', 'w-full p-2 border rounded-lg']" />
              </div>
              <div>
                <label :for="`fats-${meal.id}`" :class="isDarkMode ? 'text-white' : 'text-gray-700'" class="text-sm">Tłuszcze</label>
                <input :id="`fats-${meal.id}`" v-model="meal.fats" type="number"
                  :class="[isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900', 'w-full p-2 border rounded-lg']" />
              </div>
              <button @click="saveEdit(meal)"
                class="mt-2 col-span-3 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition" aria-label="Zapisz posiłek">
                💾 Zapisz
              </button>
            </div>
          </li>
        </ul>

        <p v-if="mealsStore.meals.length === 0"
          :class="[isDarkMode ? 'text-gray-400' : 'text-gray-500', 'text-center mt-4']">
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
import { ref, computed } from "vue";
import { useMealsStore } from "../stores/meals";
import { useThemeStore } from "../composables/theme";
import AddMeal from "../components/AddMeal.vue";
import SearchProducts from "../components/SearchProducts.vue";

const mealsStore = useMealsStore();
const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.theme === "dark");

const showAddMealForm = ref(false);

const toggleAddMealForm = () => {
  showAddMealForm.value = !showAddMealForm.value;
};

const saveMealsToHistory = () => {
  mealsStore.saveMealGroup("Posiłki");
};

const addProductToMeal = (product) => {
  mealsStore.addMeal({
    ...product,
    isEditing: false
  });
};

const toggleEdit = (meal) => {
  meal.isEditing = true;
};

const saveEdit = (meal) => {
  meal.isEditing = false;
};
</script>
