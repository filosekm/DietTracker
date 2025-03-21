<template>
  <div :class="['container mx-auto p-6 min-h-screen', isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']">
    <div :class="[isDarkMode ? 'bg-gray-800' : 'bg-gray-100', 'p-6 rounded-lg shadow-md']">
      <h2 class="text-2xl font-bold mb-4 text-center">
        Lista zakupów
      </h2>

      <!-- Formularz dodawania produktu -->
      <form @submit.prevent="addItem" class="flex gap-2 mt-4">
        <input
          v-model="newItem"
          type="text"
          placeholder="Dodaj produkt..."
          class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none focus:ring-blue-400 transition duration-200"
          :class="isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'"
          required
        />
        <button
          type="submit"
          class="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          ➕ Dodaj
        </button>
      </form>

      <!-- Lista zakupów -->
      <ul class="mt-4 space-y-2">
        <li
          v-for="(item, index) in shoppingList"
          :key="index"
          :class="[
            isDarkMode
              ? 'bg-gray-700 text-white border-gray-600'
              : 'bg-gray-100 text-gray-900 border-gray-300',
            'p-3 border rounded-lg flex justify-between items-center'
          ]"
        >
          <span>{{ item }}</span>
          <button
            @click="removeItem(index)"
            class="text-red-500 hover:text-red-700 transition duration-200"
          >
            ❌
          </button>
        </li>
      </ul>

      <p
        v-if="shoppingList.length === 0"
        :class="[isDarkMode ? 'text-gray-400' : 'text-gray-500', 'mt-4 text-center']"
      >
        Lista zakupów jest pusta.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useThemeStore } from '../composables/theme'

const newItem = ref('')
const shoppingList = ref([])
const themeStore = useThemeStore()
const isDarkMode = computed(() => themeStore.theme === 'dark')

const addItem = () => {
  if (newItem.value.trim() !== '') {
    shoppingList.value.push(newItem.value.trim())
    newItem.value = ''
  }
}

const removeItem = (index) => {
  shoppingList.value.splice(index, 1)
}
</script>
