<template>
  <div :class="['min-h-screen flex flex-col transition duration-300', themeStore.theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900']">
    <!-- Nawigacja -->
    <header class="p-4 bg-blue-500 dark:bg-gray-800 shadow-md flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-white">Diet Tracker</router-link>

      <div class="flex gap-4">
        <!-- Przycisk zmiany motywu -->
        <button @click="themeStore.toggleTheme()" 
          class="p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md transition duration-200">
          {{ themeStore.theme === "dark" ? "🌙 Tryb ciemny" : "☀️ Tryb jasny" }}
        </button>

        <!-- Przycisk powiadomień -->
        <button @click="toggleNotifications"
          class="relative p-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md transition duration-200">
          🔔
          <span v-if="notificationsStore.unreadCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {{ notificationsStore.unreadCount }}
          </span>
        </button>
      </div>
    </header>

    <!-- Sidebar powiadomień -->
    <NotificationSidebar v-if="isNotificationsOpen" @close="toggleNotifications" />
    <ToastNotifications ref="toastRef" />
    <!-- Treść strony -->
    <main class="flex-grow container mx-auto p-6">
      <router-view />
    </main>
  </div>
</template>

  <script setup>
  import { ref, onMounted } from "vue";
  import { useThemeStore } from "./composables/theme";
  import { useNotificationsStore } from "./stores/notificationsStore";
  import "./assets/main.css"; // ✅ Upewnij się, że Tailwind CSS jest poprawnie zaimportowany!
  import NotificationSidebar from "./components/NotificationSidebar.vue";
  import ToastNotifications from "./components/ToastNotifications.vue";
  
  const themeStore = useThemeStore();
  const notificationsStore = useNotificationsStore();
  const isNotificationsOpen = ref(false);
  const toastRef = ref(null);
  
  const toggleNotifications = () => {
    isNotificationsOpen.value = !isNotificationsOpen.value;
  };
  const addGlobalNotification = (message, type = "info") => {
  if (toastRef.value) {
    toastRef.value.addNotification(message, type);
  }
};

onMounted(() => {
  window.addNotification = addGlobalNotification; // Globalna funkcja dla powiadomień
});
  </script>
  
  <style>
  /* Animacja wysuwania panelu powiadomień */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(100%);
  }
  </style>
  