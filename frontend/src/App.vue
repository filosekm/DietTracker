<template>
  <div
    :class="[
      'min-h-screen relative flex flex-col transition duration-300',
      themeStore.theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    ]"
  >
    <!-- Nawigacja -->
    <header
      class="fixed top-0 left-0 right-0 z-50 p-4 shadow-md flex justify-between items-center"
      :class="themeStore.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'"
      role="banner"
    >
      <router-link to="/" class="text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
        Diet Tracker
      </router-link>

      <div class="flex gap-4 items-center">
        <!-- Przycisk zmiany motywu -->
        <button
          @click="themeStore.toggleTheme()"
          class="p-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          :class="themeStore.theme === 'dark'
            ? 'bg-gray-700 text-white focus:ring-white'
            : 'bg-gray-300 text-gray-900 focus:ring-blue-500'"
          aria-label="Przełącz motyw"
        >
          {{ themeStore.theme === 'dark' ? '🌙 Tryb ciemny' : '☀️ Tryb jasny' }}
        </button>

        <!-- Przycisk powiadomień -->
        <button
          @click="toggleNotifications"
          class="relative p-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          :class="themeStore.theme === 'dark'
            ? 'bg-gray-700 text-white focus:ring-white'
            : 'bg-gray-300 text-gray-900 focus:ring-blue-500'"
          aria-label="Otwórz powiadomienia"
        >
          🔔
          <span
            v-if="notificationsStore.unreadCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
          >
            {{ notificationsStore.unreadCount }}
          </span>
        </button>
      </div>
    </header>

    <!-- Sidebar powiadomień -->
    <NotificationSidebar v-if="isNotificationsOpen" @close="toggleNotifications" />
    <ToastNotifications ref="toastRef" />

    <!-- Treść strony -->
    <main class="flex-grow container mx-auto p-6 pt-24" role="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useThemeStore } from "./composables/theme";
import { useNotificationsStore } from "./stores/notificationsStore";
import "./assets/main.css";
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
  window.addNotification = addGlobalNotification;
});
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
