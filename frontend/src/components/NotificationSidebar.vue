<template>
  <transition name="slide">
    <div
      v-if="isOpen"
      class="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300"
    >
      <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
        <h2 class="text-xl font-bold text-gray-700 dark:text-white">Powiadomienia</h2>
        <button @click="closeSidebar" class="text-gray-500 hover:text-red-500 transition duration-200">✖</button>
      </div>

      <!-- ✅ Przyciski Profil & Wylogowanie -->
      <div class="p-4 border-t dark:border-gray-700 mt-4">
        <p class="text-gray-500 dark:text-gray-400 text-center mb-2">
          👤 Zalogowany jako: <strong>{{ authStore.user?.name || "Nieznany" }}</strong>
        </p>

        <button 
          v-if="authStore.user"
          @click="goToProfile"
          class="w-75 mr-5 bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
        >
          👤 Mój profil
        </button>

        <button 
          v-if="authStore.user"
          @click="logout"
          class="w-75 mt-2 bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
        >
          🚪 Wyloguj się
        </button>

        <button 
          v-if="!authStore.user"
          @click="goToLogin"
          class="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          🔑 Zaloguj się
        </button>
      </div>

      <!-- 🔔 Lista powiadomień -->
      <ul class="p-4 space-y-3">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm"
        >
          <span class="text-gray-800 dark:text-white">{{ notification.message }}</span>
          <button
            @click="removeNotification(notification.id)"
            class="text-red-500 hover:text-red-700 transition duration-200"
          >
            ❌
          </button>
        </li>
      </ul>

      <p v-if="notifications.length === 0" class="text-center text-gray-500 dark:text-gray-400 mt-4">
        Brak nowych powiadomień.
      </p>

    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(true);
const notifications = ref([]);

// ✅ Dodaje powiadomienie i automatycznie usuwa po 5 sekundach
const addNotification = (message) => {
  const id = Date.now();
  notifications.value.push({ id, message });

  setTimeout(() => {
    removeNotification(id);
  }, 5000);
};

const closeSidebar = () => {
  isOpen.value = false;
};

const removeNotification = (id) => {
  notifications.value = notifications.value.filter((n) => n.id !== id);
};

// ✅ Obserwacja zmian w authStore, aby dodać powiadomienia
watch(() => authStore.user, (newUser, oldUser) => {
  if (newUser && !oldUser) {
    addNotification("✅ Pomyślnie zalogowano!");
  } else if (!newUser && oldUser) {
    addNotification("🚪 Wylogowano pomyślnie!");
  }
});

// ✅ Funkcja wylogowania użytkownika
const logout = () => {
  authStore.logout();
  addNotification("🚪 Wylogowano pomyślnie!");
  router.push("/login");
};

// ✅ Przejście do profilu
const goToProfile = () => {
  router.push("/profile");
};

// ✅ Przejście do logowania
const goToLogin = () => {
  router.push("/login");
};
</script>

<style>
/* Animacja wysuwania panelu */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
