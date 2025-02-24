<template>
    <div class="container mx-auto p-6">
      <h2 class="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">Mój profil</h2>
  
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <!-- Informacje o użytkowniku -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-2xl font-bold">
            {{ initials }}
          </div>
  
          <p class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ editedName || authStore.user?.name }}
          </p>
          <p class="text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
        </div>
  
  <div>
          <button 
            @click="logout"
            class="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
          >
            🚪 Wyloguj się
          </button>
        </div>
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <form @submit.prevent="validateAndSubmit">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-gray-700 dark:text-white">Imię</label>
                  <input v-model="user.name" type="text" class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"/>
                </div>
      
                <div>
                  <label class="block text-gray-700 dark:text-white">Wiek</label>
                  <input v-model="user.age" type="number" class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"/>
                  <p v-if="errors.age" class="text-red-500 text-sm mt-1">{{ errors.age }}</p>
                </div>
      
                <div>
                  <label class="block text-gray-700 dark:text-white">Waga (kg)</label>
                  <input v-model="user.weight" type="number" class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"/>
                  <p v-if="errors.weight" class="text-red-500 text-sm mt-1">{{ errors.weight }}</p>
                </div>
      
                <div>
                  <label class="block text-gray-700 dark:text-white">Wzrost (cm)</label>
                  <input v-model="user.height" type="number" class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"/>
                  <p v-if="errors.height" class="text-red-500 text-sm mt-1">{{ errors.height }}</p>
                </div>
      
                <div>
                  <label class="block text-gray-700 dark:text-white">Poziom aktywności</label>
                  <select v-model="user.activity_level" class="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white">
                    <option value="niski">Niski</option>
                    <option value="średni">Średni</option>
                    <option value="wysoki">Wysoki</option>
                  </select>
                  <p v-if="errors.activity_level" class="text-red-500 text-sm mt-1">{{ errors.activity_level }}</p>
                </div>
              </div>
      
              <button type="submit" class="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition">
                💾 Zapisz zmiany
              </button>
            </form>
          </div>
        </div>
        </div>
      </template>
      
      <script setup>
      import { ref, onMounted } from "vue";
      import axios from "axios";
      import { useAuthStore } from "../stores/auth";
      
      const authStore = useAuthStore();
      const user = ref({
        name: "",
        age: null,
        weight: null,
        height: null,
        activity_level: "średni",
      });
      
      const errors = ref({});
      
      // ✅ Pobranie aktualnych danych użytkownika
      onMounted(async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/user/profile", {
            headers: { Authorization: `Bearer ${authStore.token}` },
          });
          user.value = response.data;
        } catch (error) {
          console.error("Błąd pobierania profilu:", error);
        }
      });
      
      // ✅ Funkcja walidacji przed wysłaniem formularza
      const validateAndSubmit = async () => {
        errors.value = {};
      
        if (user.value.age <= 0 || isNaN(user.value.age)) {
          errors.value.age = "Wiek musi być liczbą większą niż 0!";
        }
        if (user.value.weight <= 0 || isNaN(user.value.weight)) {
          errors.value.weight = "Waga musi być większa niż 0!";
        }
        if (user.value.height <= 0 || isNaN(user.value.height)) {
          errors.value.height = "Wzrost musi być większy niż 0!";
        }
        if (!["niski", "średni", "wysoki"].includes(user.value.activity_level)) {
          errors.value.activity_level = "Nieprawidłowy poziom aktywności!";
        }
      
        if (Object.keys(errors.value).length === 0) {
          updateProfile();
        }
      };
      
      // ✅ Aktualizacja profilu
      const updateProfile = async () => {
        try {
          await axios.put("http://localhost:5000/api/user/profile", user.value, {
            headers: { Authorization: `Bearer ${authStore.token}` },
          });
          alert("Profil zaktualizowany!");
        } catch (error) {
          console.error("Błąd aktualizacji profilu:", error);
        }
      };
      </script>