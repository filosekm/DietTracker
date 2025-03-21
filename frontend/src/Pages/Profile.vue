<template>
  <div :class="['container mx-auto p-6 min-h-screen transition', isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900']">
    <h2 class="text-3xl font-bold mb-4 text-center">Mój profil</h2>

    <div :class="[isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900', 'p-6 rounded-lg shadow-md']">
      <!-- Informacje o użytkowniku -->
      <div class="flex flex-col items-center gap-4">
        <div
        :class="[
          'w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold',
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'
        ]"
      >
        {{ initials }}
      </div>

        <p class="text-xl font-semibold">{{ user.name || authStore.user?.name }}</p>
        <p class="text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
      </div>

      <!-- Formularz edycji profilu -->
      <div :class="[isDarkMode ? 'bg-gray-800' : 'bg-white', 'p-6 rounded-lg shadow-md mt-4']">
        <form @submit.prevent="validateAndSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" :class="labelClass">Imię</label>
              <input id="name" v-model="user.name" type="text" :class="inputClass" />
            </div>

            <div>
              <label for="age" :class="labelClass">Wiek</label>
              <input id="age" v-model="user.age" type="number" :class="inputClass" />
              <p v-if="errors.age" class="text-red-500 text-sm mt-1">{{ errors.age }}</p>
            </div>

            <div>
              <label for="weight" :class="labelClass">Waga (kg)</label>
              <input id="weight" v-model="user.weight" type="number" :class="inputClass" />
              <p v-if="errors.weight" class="text-red-500 text-sm mt-1">{{ errors.weight }}</p>
            </div>

            <div>
              <label for="height" :class="labelClass">Wzrost (cm)</label>
              <input id="height" v-model="user.height" type="number" :class="inputClass" />
              <p v-if="errors.height" class="text-red-500 text-sm mt-1">{{ errors.height }}</p>
            </div>

            <div>
              <label for="activity_level" :class="labelClass">Poziom aktywności</label>
              <select id="activity_level" v-model="user.activity_level" :class="inputClass">
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

        <p v-if="message" class="text-green-500 text-sm mt-2">{{ message }}</p>
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </div>

      <!-- Przycisk wylogowania -->
      <button @click="logout"
        class="w-full mt-4 bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200">
        🚪 Wyloguj się
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { useThemeStore } from "../composables/theme";

const authStore = useAuthStore();
const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.theme === "dark");

const user = ref({
  name: "",
  age: null,
  weight: null,
  height: null,
  activity_level: "średni",
});

const errors = ref({});
const message = ref("");
const error = ref("");

// 🔹 Inicjały użytkownika
const initials = computed(() => {
  return user.value.name
    ? user.value.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";
});

// ✅ Pobieranie danych profilu
onMounted(async () => {
  try {
    const response = await axios.get("https://backendpraca.onrender.com/api/users/profile", {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    user.value = response.data;
  } catch (err) {
     console.error("Błąd pobierania profilu:", err);
    error.value = "Nie udało się załadować profilu.";
  }
});

// ✅ Walidacja formularza
const validateAndSubmit = async () => {
  errors.value = {};

  if (user.value.age !== null && (user.value.age <= 0 || isNaN(user.value.age))) {
    errors.value.age = "Wiek musi być liczbą większą niż 0!";
  }
  if (user.value.weight !== null && (user.value.weight <= 0 || isNaN(user.value.weight))) {
    errors.value.weight = "Waga musi być większa niż 0!";
  }
  if (user.value.height !== null && (user.value.height <= 0 || isNaN(user.value.height))) {
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
    await axios.put("https://backendpraca.onrender.com/api/users/profile", user.value, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    window.addNotification("Profil zaktualizowany!");
    error.value = "";
  } catch (err) {
     window.addNotification("Błąd aktualizacji profilu:", err);
    error.value = "Nie udało się zaktualizować profilu.";
  }
};

// ✅ Wylogowanie
const logout = () => {
  authStore.logout();
  window.location.reload();
};

// ✅ Klasy do formularzy zależne od motywu
const inputClass = computed(() => [
  "w-full p-2 border rounded-md focus:ring-2 focus:outline-none transition",
  isDarkMode.value
    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500"
    : "bg-white text-gray-900 border-gray-300 placeholder-gray-500 focus:ring-blue-400"
]);

const labelClass = computed(() => isDarkMode.value ? "block text-white" : "block text-gray-700");
</script>
