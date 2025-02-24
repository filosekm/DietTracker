import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
    state: () => ({
        notifications: [],
        activeNotifications: [], // Aktualnie wyświetlane powiadomienia
        lastNotificationTime: null, // Przechowuje czas ostatniego powiadomienia
    }),
    getters: {
        unreadCount(state) {
            return state.activeNotifications.length;
        },
    },
    actions: {
        checkTimeAndAddNotification() {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();

            const predefinedNotifications = [
                { hour: 7, minute: 0, message: "Czas na śniadanie 🥞", type: "meal" },
                { hour: 10, minute: 0, message: "Nie zapomnij o nawodnieniu! 💧", type: "hydration" },
                { hour: 12, minute: 30, message: "Czas na obiad 🍛", type: "meal" },
                { hour: 15, minute: 0, message: "Czas na przekąskę 🍏", type: "meal" },
                { hour: 18, minute: 30, message: "Czas na kolację 🍽️", type: "meal" },
                { hour: 20, minute: 0, message: "Dodaj swoje dzisiejsze posiłki do aplikacji! 📊", type: "reminder" },
                { hour: 21, minute: 30, message: "Sprawdź swój cel kaloryczny na dzisiaj 🔥", type: "goal" },
            ];

            predefinedNotifications.forEach((notif) => {
                if (notif.hour === hours && notif.minute === minutes) {
                    if (!this.activeNotifications.find(n => n.message === notif.message)) {
                        this.activeNotifications.push({ id: Date.now(), ...notif });
                    }
                }
            });
        },

        autoCheckNotifications() {
            setInterval(() => {
                this.checkTimeAndAddNotification();
            }, 60000); // Sprawdzanie co minutę
        },

        dismiss(id) {
            this.activeNotifications = this.activeNotifications.filter(n => n.id !== id);
        },

        clearAll() {
            this.activeNotifications = [];
        },
    },
});
