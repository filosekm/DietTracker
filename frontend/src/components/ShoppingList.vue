<template>
    <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition duration-300">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-white mb-4">Lista zakupów</h2>
  
      <!-- Formularz dodawania produktu -->
      <form @submit.prevent="addItem" class="flex gap-2">
        <input
          v-model="newItem"
          type="text"
          placeholder="Dodaj produkt..."
          class="w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200 
                 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-400"
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
          class="p-3 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex justify-between items-center"
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
  
      <p v-if="shoppingList.length === 0" class="mt-4 text-gray-500 dark:text-gray-400 text-center">
        Lista zakupów jest pusta.
      </p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const newItem = ref("");
  const shoppingList = ref([]);
  
  const addItem = () => {
    if (newItem.value.trim() !== "") {
      shoppingList.value.push(newItem.value.trim());
      newItem.value = "";
    }
  };
  
  const removeItem = (index) => {
    shoppingList.value.splice(index, 1);
  };
  </script>
  