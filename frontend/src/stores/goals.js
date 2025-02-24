import { defineStore } from "pinia";
import axios from "axios";

export const useGoalsStore = defineStore("goals", {
    state: () => ({
        goals: {
            calories: 2000,
            protein: 100,
            carbs: 250,
            fats: 70,
        },
    }),
    actions: {
        async loadGoals() {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Brak tokena!");

                const response = await axios.get("https://backendpraca.onrender.com/api/users/goals", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                this.goals = response.data;
            } catch (error) {
                console.error("❌ Błąd pobierania celów:", error.response?.data || error.message);
            }
        },

        async updateGoals(newGoals) {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("Brak tokena!");

                const response = await axios.put("https://backendpraca.onrender.com/api/users/goals", newGoals, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                this.goals = response.data.goals;
            } catch (error) {
                console.error("❌ Błąd aktualizacji celów:", error.response?.data || error.message);
            }
        }
    }
});
