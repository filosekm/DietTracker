<template>
  <div :class="['container mx-auto p-6 min-h-screen', isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']">
    <h2 class="text-3xl font-bold mb-4 text-center">
      Lista zakupów
    </h2>

    <div :class="[isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900', 'p-6 rounded-lg shadow-md']">
      <div class="flex flex-col gap-2 mb-4">
        <label for="new-item" class="sr-only">Dodaj nowy produkt</label>
        <div class="flex gap-4">
          <input
            id="new-item"
            v-model="newItem"
            type="text"
            placeholder="Dodaj produkt..."
            :class="[
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500',
              'w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none transition'
            ]"
          />
          <button
            @click="addItem"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
            aria-label="Dodaj produkt do listy"
          >
            Dodaj
          </button>
        </div>
      </div>

      <ul class="space-y-2" aria-label="Lista zakupów">
        <li
          v-for="(item, index) in shoppingList"
          :key="index"
          :class="[
            isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300',
            'flex justify-between items-center p-3 border rounded-lg'
          ]"
        >
          <span>{{ item }}</span>
          <button
            @click="removeItem(index)"
            class="p-1 text-red-500 hover:text-red-700 transition duration-200"
            :aria-label="`Usuń ${item} z listy`"
          >
            ❌
          </button>
        </li>
      </ul>

      <p
        v-if="shoppingList.length === 0"
        :class="[isDarkMode ? 'text-gray-400' : 'text-gray-500', 'text-center mt-4']"
        aria-live="polite"
      >
        Lista zakupów jest pusta.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useThemeStore } from '../composables/theme'

const shoppingList = ref([])
const newItem = ref('')
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
