<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300">
    <h2 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">Dodaj posiłek</h2>

    <!-- Formularz -->
    <form @submit.prevent="addMeal" class="flex flex-col gap-4">
      <div>
        <label for="mealName" class="sr-only">Nazwa posiłku</label>
        <input
          id="mealName"
          v-model="mealName"
          type="text"
          placeholder="Nazwa posiłku"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
          required
        />
      </div>

      <div>
        <label for="calories" class="sr-only">Kalorie</label>
        <input
          id="calories"
          v-model="calories"
          type="number"
          placeholder="Kalorie"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
          required
        />
      </div>

      <!-- Makroskładniki -->
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label for="protein" class="sr-only">Białko</label>
          <input
            id="protein"
            v-model="protein"
            type="number"
            placeholder="Białko (g)"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label for="fats" class="sr-only">Tłuszcze</label>
          <input
            id="fats"
            v-model="fats"
            type="number"
            placeholder="Tłuszcze (g)"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label for="carbs" class="sr-only">Węglowodany</label>
          <input
            id="carbs"
            v-model="carbs"
            type="number"
            placeholder="Węglowodany (g)"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                   dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            required
          />
        </div>
      </div>

      <!-- Mikroskładniki -->
      <div>
        <h3 class="text-lg font-semibold text-gray-700 dark:text-white mt-4">Mikroskładniki</h3>
        <div class="flex gap-4">
          <div class="w-full">
            <label for="vitaminC" class="sr-only">Witamina C</label>
            <input
              id="vitaminC"
              v-model="vitaminC"
              type="number"
              placeholder="Witamina C (mg)"
              class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            />
          </div>
          <div class="w-full">
            <label for="iron" class="sr-only">Żelazo</label>
            <input
              id="iron"
              v-model="iron"
              type="number"
              placeholder="Żelazo (mg)"
              class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                     dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <!-- Przycisk dodawania -->
      <button
        type="submit"
        class="w-full p-3 rounded-lg font-semibold transition duration-200 
               bg-green-500 text-white hover:bg-green-600"
      >
        Dodaj posiłek
      </button>
    </form>

    <!-- Lista dodanych posiłków -->
    <ul class="mt-4 space-y-2" aria-label="Lista dodanych posiłków">
      <li
        v-for="meal in meals"
        :key="meal.id"
        class="p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex justify-between items-start flex-wrap"
      >
        <span>
          <strong>{{ meal.name }}</strong> – {{ meal.calories }} kcal |
          B: {{ meal.protein }}g | T: {{ meal.fats }}g | W: {{ meal.carbs }}g |
          Wit. C: {{ meal.vitaminC }}mg | Fe: {{ meal.iron }}mg
        </span>
        <button
          @click="removeMeal(meal.id)"
          class="ml-2 text-red-500 hover:text-red-700 transition duration-200"
          :aria-label="`Usuń posiłek ${meal.name}`"
        >
          ❌
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const mealName = ref("");
const calories = ref("");
const protein = ref("");
const fats = ref("");
const carbs = ref("");
const vitaminC = ref("");
const iron = ref("");
const meals = ref([]);

const addMeal = () => {
  if (mealName.value && calories.value && protein.value && fats.value && carbs.value) {
    meals.value.push({
      id: Date.now(),
      name: mealName.value,
      calories: calories.value,
      protein: protein.value,
      fats: fats.value,
      carbs: carbs.value,
      vitaminC: vitaminC.value || "0",
      iron: iron.value || "0",
    });

    mealName.value = "";
    calories.value = "";
    protein.value = "";
    fats.value = "";
    carbs.value = "";
    vitaminC.value = "";
    iron.value = "";
  }
};

const removeMeal = (id) => {
  meals.value = meals.value.filter((meal) => meal.id !== id);
};
</script>
