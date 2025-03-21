<template>
  <div :class="['flex items-center justify-center min-h-screen w-full', themeStore.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100']">
    <div :class="['w-full max-w-md p-8 rounded-lg shadow-md transition duration-300', themeStore.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700']">

      <!-- Nagłówek -->
      <h2 :class="['text-3xl font-bold text-center mb-6', themeStore.theme === 'dark' ? 'text-white' : 'text-gray-700']">
        Zaloguj się
      </h2>

      <!-- Formularz logowania -->
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4" aria-label="Formularz logowania">
        <div class="relative">
          <label for="email" class="sr-only">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            aria-label="Email"
            :class="['w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200',
                     themeStore.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 text-gray-900 focus:ring-blue-400']"
            required
          />
        </div>

        <div class="relative">
          <label for="password" class="sr-only">Hasło</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Hasło"
            autocomplete="current-password"
            aria-label="Hasło"
            :class="['w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200',
                     themeStore.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 text-gray-900 focus:ring-blue-400']"
            required
          />
        </div>

        <button
          type="submit"
          :class="['w-full p-3 rounded-lg font-semibold transition duration-200',
                   themeStore.theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600']"
        >
          Zaloguj
        </button>

        <p v-if="errorMessage" class="text-red-500 font-medium text-center">{{ errorMessage }}</p>
      </form>

      <!-- Link do rejestracji -->
      <p :class="['text-center mt-4 text-sm', themeStore.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']">
        Nie masz konta?
        <router-link to="/register" :class="[themeStore.theme === 'dark' ? 'text-blue-400' : 'text-blue-500', 'hover:underline']">
          Zarejestruj się
        </router-link>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useThemeStore } from "../composables/theme";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const authStore = useAuthStore();
const router = useRouter();
const themeStore = useThemeStore();

const handleLogin = async () => {
  try {
    errorMessage.value = "";
    await authStore.login(email.value, password.value);
    if (authStore.token) {
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = "Nieprawidłowy email lub hasło.";
     window.addNotification("Błąd logowania:", error.message);
  }
};
</script>
