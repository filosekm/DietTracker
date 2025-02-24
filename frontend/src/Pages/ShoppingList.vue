<template>
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Lista zakupów</h2>
  
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div class="flex gap-4 mb-4">
          <input
            v-model="newItem"
            type="text"
            placeholder="Dodaj produkt..."
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <button
            @click="addItem"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
          >
            Dodaj
          </button>
        </div>
  
        <ul class="space-y-2">
          <li
            v-for="(item, index) in shoppingList"
            :key="index"
            class="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <span class="text-gray-900 dark:text-white">{{ item }}</span>
            <button
              @click="removeItem(index)"
              class="p-1 text-red-500 hover:text-red-700 transition duration-200"
            >
              ❌
            </button>
          </li>
        </ul>
  
        <p v-if="shoppingList.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-4">
          Lista zakupów jest pusta.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const shoppingList = ref([]);
  const newItem = ref("");
  
  const addItem = () => {
    if (newItem.value.trim() !== "") {
      shoppingList.value.push(newItem.value);
      newItem.value = "";
    }
  };
  
  const removeItem = (index) => {
    shoppingList.value.splice(index, 1);
  };
  </script>
  