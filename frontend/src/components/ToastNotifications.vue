<template>
    <div class="fixed top-4 right-4 space-y-3 z-50">
      <transition-group name="toast">
        <div v-for="notification in notifications" :key="notification.id"
             class="p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex items-center justify-between border-l-4"
             :class="getNotificationClass(notification.type)">
          <span class="text-gray-900 dark:text-white">
            {{ notification.message }}
          </span>
          <button @click="removeNotification(notification.id)" class="ml-4 text-gray-500 hover:text-red-500">
            ❌
          </button>
        </div>
      </transition-group>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const notifications = ref([]);
  
  // ✅ Dodaje nowe powiadomienie i usuwa po 5 sekundach
  const addNotification = (message, type = "info") => {
    const id = Date.now();
    notifications.value.push({ id, message, type });
  
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };
  
  // ✅ Usuwa powiadomienie z listy
  const removeNotification = (id) => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  };
  
  // ✅ Funkcja zwracająca odpowiedni kolor powiadomienia
  const getNotificationClass = (type) => {
    switch (type) {
      case "success":
        return "border-green-500";
      case "error":
        return "border-red-500";
      case "warning":
        return "border-yellow-500";
      default:
        return "border-blue-500";
    }
  };
  
  // ✅ Eksportujemy `addNotification`, aby używać w innych plikach
  defineExpose({ addNotification });
  </script>
  
  <style>
  .toast-enter-active, .toast-leave-active {
    transition: all 0.5s ease;
  }
  .toast-enter-from, .toast-leave-to {
    opacity: 0;
    transform: translateX(20px);
  }
  </style>
  