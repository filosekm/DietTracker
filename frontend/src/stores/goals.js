import { defineStore } from "pinia";
import { useActivitiesStore } from "./activitiesStore";

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
        getGoals() {
            const storedGoals = localStorage.getItem("dietGoals");
            if (storedGoals) {
                this.goals = JSON.parse(storedGoals);
                return this.goals;
            }
            return null;
        },
        setGoals(newGoals) {
            this.goals = { ...newGoals };
            localStorage.setItem("dietGoals", JSON.stringify(this.goals));
        },
        // 📌 Nowa metoda: uwzględniamy spalone kalorie
        getAdjustedCalories() {
            const activitiesStore = useActivitiesStore();
            const burnedCalories = activitiesStore.getTotalCaloriesBurned();
            return Math.max(this.goals.calories + burnedCalories, 0);
        }
    }
});
