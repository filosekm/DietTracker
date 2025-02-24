<template>
    <div :class="['flex items-center justify-center min-h-screen w-full', themeStore.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100']">
      <div :class="['w-full max-w-md p-8 rounded-lg shadow-md transition duration-300', 
                    themeStore.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700']">
        
        <!-- Nagłówek -->
        <h2 :class="['text-3xl font-bold text-center mb-6', themeStore.theme === 'dark' ? 'text-white' : 'text-gray-700']">
          Zarejestruj się
        </h2>
  
        <!-- Formularz rejestracji -->
        <form @submit.prevent="handleRegister" class="flex flex-col gap-4">
          <div class="relative">
            <input
              v-model="name"
              type="text"
              placeholder="Imię"
              :class="['w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200', 
                       themeStore.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 text-gray-900 focus:ring-blue-400']"
              required
            />
          </div>
  
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              :class="['w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200', 
                       themeStore.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 text-gray-900 focus:ring-blue-400']"
              required
            />
          </div>
  
          <div class="relative">
            <input
              v-model="password"
              type="password"
              placeholder="Hasło"
              :class="['w-full p-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-200', 
                       themeStore.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 text-gray-900 focus:ring-blue-400']"
              required
            />
          </div>
  
          <!-- Przycisk rejestracji -->
          <button
            type="submit"
            :class="['w-full p-3 rounded-lg font-semibold transition duration-200', 
                     themeStore.theme === 'dark' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-500 text-white hover:bg-green-600']"
          >
            Zarejestruj się
          </button>
        </form>
  
        <!-- Link do logowania -->
        <p :class="['text-center mt-4', themeStore.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']">
          Masz już konto? 
          <router-link to="/login" :class="['hover:underline', themeStore.theme === 'dark' ? 'text-blue-400' : 'text-blue-500']">Zaloguj się</router-link>
        </p>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAuthStore } from "../stores/auth";
  import { useRouter } from "vue-router";
  import { useThemeStore } from "../composables/theme"; // ✅ Import obsługi motywu
  
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const authStore = useAuthStore();

  const router = useRouter();
  const themeStore = useThemeStore(); // ✅ Używanie obsługi motywu
  
 const handleRegister = async () => {
  if (typeof authStore.register !== "function") {
    console.error("❌ authStore.register NIE JEST FUNKCJĄ!");
    return;
  }

  await authStore.register(name.value, email.value, password.value);
  if (authStore.token) {
    router.push("/");
  }
};
  </script>
  