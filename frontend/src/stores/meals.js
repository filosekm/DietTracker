import { defineStore } from "pinia";
import axios from "axios";

export const useMealsStore = defineStore("meals", {
    state: () => ({
        meals: [],
        history: [],
    }),
    actions: {
        async addMeal(product) {
            const newMeal = {
                id: product.id || Date.now(),
                name: product.name || "Nieznany produkt",
                calories: product.calories || 0,
                proteins: product.proteins || 0,
                carbs: product.carbs || 0,
                fats: product.fats || 0,
            };

            this.meals.push(newMeal);
            this.saveMeals();
        },

        async removeMeal(index) {
            this.meals.splice(index, 1);
            this.saveMeals();
        },

        async saveMealGroup(name) {
            if (!name.trim()) {
                alert("Podaj nazwę grupy (np. Obiad, Śniadanie).");
                return;
            }
        
            try {
                const today = new Date().toISOString().split("T")[0]; // 📅 Pobieramy dzisiejszą datę
        
                const mealData = {
                    name,
                    meals: this.meals, // Aktualna lista posiłków do zapisania
                };
        
        
                const response = await axios.post("http://localhost:5000/api/meals/history", mealData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
        
        
                this.history.push(response.data);
                this.clearMeals();
            } catch (error) {
                console.error("❌ Błąd zapisu historii:", error);
            }
        },

        async loadHistory() {
            try {
                const token = localStorage.getItem("token"); // ✅ Pobranie tokena
                const response = await axios.get("http://localhost:5000/api/meals/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.history = response.data;
            } catch (error) {
                console.error("❌ Błąd pobierania historii:", error);
            }
        },

        async deleteMealGroup(id) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5000/api/meals/history/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                this.history = this.history.filter((group) => group.id !== id);
            } catch (error) {
                console.error("❌ Błąd usuwania historii:", error);
            }
        },

        saveMeals() {
            localStorage.setItem("meals", JSON.stringify(this.meals));
        },

        clearMeals() {
            this.meals = [];
            this.saveMeals();
        },
        async fetchTodayMeals() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("🚨 Brak tokena w localStorage!");
                    return;
                }
        
                const response = await axios.get("http://localhost:5000/api/meals/history/today", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
        
                if (response.data && response.data.meals) {
                    this.todayMeals = response.data.meals;
                } else {
                    this.todayMeals = [];
                }
            } catch (error) {
                this.todayMeals = [];
            }
        }
        
    },
});
