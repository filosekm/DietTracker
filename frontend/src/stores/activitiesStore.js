import { defineStore } from "pinia";

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    activities: [], // Lista aktywności
  }),
  actions: {
    addActivity(activity) {
      this.activities.push({
        id: Date.now(),
        type: activity.type,
        duration: activity.duration, // w minutach
        caloriesBurned: activity.caloriesBurned, // spalone kalorie
      });
      this.saveActivities();
    },
    removeActivity(id) {
      this.activities = this.activities.filter(activity => activity.id !== id);
      this.saveActivities();
    },
    saveActivities() {
      localStorage.setItem("activities", JSON.stringify(this.activities));
    },
    loadActivities() {
      const saved = localStorage.getItem("activities");
      if (saved) {
        this.activities = JSON.parse(saved);
      }
    },
    getTotalCaloriesBurned() {
      return this.activities.reduce((total, activity) => total + activity.caloriesBurned, 0);
    }
  }
});
