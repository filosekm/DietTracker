<template>
  <transition name="slide">
    <aside
      v-if="isOpen"
      class="fixed top-0 right-0 h-full w-80 shadow-lg transition-all duration-300 z-50"
      :class="isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'"
      role="complementary"
      aria-label="Panel powiadomień"
    >
      <!-- Nagłówek -->
      <header :class="['flex justify-between items-center p-4 border-b', isDarkMode ? 'border-gray-700' : 'border-gray-300']">
        <h2 id="sidebarTitle" class="text-xl font-bold">{{ isDarkMode ? '🌙' : '☀️' }} Powiadomienia</h2>
        <button
          @click="closeSidebar"
          class="text-gray-500 hover:text-red-500 transition duration-200"
          aria-label="Zamknij panel powiadomień"
        >
          ✖
        </button>
      </header>

      <!-- Awatar -->
      <div class="flex flex-col mt-10 items-center gap-4" aria-labelledby="sidebarTitle">
        <div
          class="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold"
          :class="isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'"
          aria-hidden="true"
        >
          {{ initials }}
        </div>
      </div>

      <!-- Panel użytkownika -->
      <section class="p-4 border-t mt-4" :class="isDarkMode ? 'border-gray-700' : 'border-gray-300'" aria-label="Panel użytkownika">
        <p :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'" class="text-center mb-2">
          👤 Zalogowany jako: <strong>{{ authStore.user?.name || 'Nieznany' }}</strong>
        </p>

        <div class="flex flex-col items-center gap-2">
          <button
            v-if="authStore.user"
            @click="goToProfile"
            class="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
            aria-label="Przejdź do profilu"
          >
            👤 Mój profil
          </button>

          <button
            v-if="authStore.user"
            @click="logout"
            class="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
            aria-label="Wyloguj się"
          >
            🚪 Wyloguj się
          </button>

          <button
            v-if="!authStore.user"
            @click="goToLogin"
            class="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            aria-label="Zaloguj się"
          >
            🔑 Zaloguj się
          </button>
        </div>
      </section>

      <!-- 🔔 Lista powiadomień -->
      <section class="p-4 space-y-3" aria-label="Lista powiadomień">
        <ul>
          <li
            v-for="notification in notifications"
            :key="notification.id"
            class="flex justify-between items-center p-3 rounded-lg shadow-sm"
            :class="isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'"
          >
            <span>{{ notification.message }}</span>
            <button
              @click="removeNotification(notification.id)"
              class="text-red-500 hover:text-red-700 transition duration-200"
              :aria-label="`Usuń powiadomienie: ${notification.message}`"
            >
              ❌
            </button>
          </li>
        </ul>

        <p
          v-if="notifications.length === 0"
          class="text-center mt-4"
          :class="isDarkMode ? 'text-gray-400' : 'text-gray-500'"
          aria-live="polite"
        >
          Brak nowych powiadomień.
        </p>
      </section>
    </aside>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useThemeStore } from "../composables/theme";

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const isDarkMode = computed(() => themeStore.theme === "dark");
const isOpen = ref(true);
const notifications = ref([]);

const initials = computed(() => {
  const name = authStore.user?.name || "";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase();
});

const addNotification = (message) => {
  const id = Date.now();
  notifications.value.push({ id, message });
  setTimeout(() => removeNotification(id), 5000);
};

const closeSidebar = () => (isOpen.value = false);
const removeNotification = (id) => {
  notifications.value = notifications.value.filter((n) => n.id !== id);
};

watch(
  () => authStore.user,
  (newUser, oldUser) => {
    if (newUser && !oldUser) {
      addNotification("✅ Pomyślnie zalogowano!");
    } else if (!newUser && oldUser) {
      addNotification("🚪 Wylogowano pomyślnie!");
    }
  }
);

const logout = () => {
  authStore.logout();
  addNotification("🚪 Wylogowano pomyślnie!");
  router.push("/login");
};

const goToProfile = () => router.push("/profile");
const goToLogin = () => router.push("/login");
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
