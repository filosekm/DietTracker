<template>
  <div :class="['container mx-auto p-6 min-h-screen', isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']">
    <h2 class="text-3xl font-bold mb-4 text-center" id="goals-heading">
      Ustawienia Celów
    </h2>

    <div
      :class="[isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900', 'p-6 rounded-lg shadow-md']"
      role="form"
      aria-labelledby="goals-heading"
    >
      <h3 class="text-xl font-semibold mb-4">Twoje cele</h3>

      <form @submit.prevent="updateGoals" class="space-y-4">
        <div>
          <label for="calories" :class="labelClass">Cel Kaloryczny (kcal)</label>
          <input id="calories" v-model="calories" type="number" min="0"
            :class="[inputBaseClass, isDarkMode ? inputDark : inputLight]" required />
        </div>

        <div>
          <label for="protein" :class="labelClass">Białko (g)</label>
          <input id="protein" v-model="protein" type="number" min="0"
            :class="[inputBaseClass, isDarkMode ? inputDark : inputLight, 'focus:ring-green-400']" required />
        </div>

        <div>
          <label for="carbs" :class="labelClass">Węglowodany (g)</label>
          <input id="carbs" v-model="carbs" type="number" min="0"
            :class="[inputBaseClass, isDarkMode ? inputDark : inputLight, 'focus:ring-yellow-400']" required />
        </div>

        <div>
          <label for="fats" :class="labelClass">Tłuszcze (g)</label>
          <input id="fats" v-model="fats" type="number" min="0"
            :class="[inputBaseClass, isDarkMode ? inputDark : inputLight, 'focus:ring-red-400']" required />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          Zapisz zmiany
        </button>
      </form>

      <!-- Komunikaty -->
      <p v-if="successMessage" class="text-green-400 font-medium mt-4" aria-live="polite">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="text-red-400 font-medium mt-4" aria-live="assertive">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGoalsStore } from '../stores/goals'
import { useThemeStore } from '../composables/theme'

const themeStore = useThemeStore()
const isDarkMode = computed(() => themeStore.theme === 'dark')

const goalsStore = useGoalsStore()

const calories = ref(2000)
const protein = ref(100)
const carbs = ref(250)
const fats = ref(70)

const successMessage = ref('')
const errorMessage = ref('')

// Style bazowe
const inputBaseClass = 'w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition'
const inputDark = 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
const inputLight = 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
const labelClass = computed(() => isDarkMode.value ? 'block font-medium text-gray-300' : 'block font-medium text-gray-700')

// Pobierz cele na starcie
onMounted(async () => {
  try {
    await goalsStore.loadGoals()
    calories.value = goalsStore.goals.calories
    protein.value = goalsStore.goals.protein
    carbs.value = goalsStore.goals.carbs
    fats.value = goalsStore.goals.fats
  } catch (error) {
    errorMessage.value = 'Nie udało się pobrać celów.'
  }
})

// Zapisz cele
const updateGoals = async () => {
  try {
    await goalsStore.updateGoals({
      calories: parseInt(calories.value),
      protein: parseInt(protein.value),
      carbs: parseInt(carbs.value),
      fats: parseInt(fats.value)
    })

    window.addNotifiaction('Cele zostały zaktualizowane!');
    errorMessage.value = ''
    setTimeout(() => (successMessage.value = ''), 3000)
  } catch (error) {
    errorMessage.value = 'Wystąpił błąd podczas zapisywania celów.'
    setTimeout(() => (errorMessage.value = ''), 3000)
  }
}
</script>
