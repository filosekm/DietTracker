import { defineStore } from "pinia";
import axios from "axios";

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    activities: [],
  }),
  actions: {
    async loadActivities() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/activities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.activities = response.data;
      } catch (error) {
        console.error("❌ Błąd pobierania aktywności:", error);
      }
    },

    async addActivity(activity) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:5000/api/activities", activity, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.activities.push(response.data);
      } catch (error) {
        console.error("❌ Błąd dodawania aktywności:", error);
      }
    },

    async removeActivity(id) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/activities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.activities = this.activities.filter(activity => activity.id !== id);
      } catch (error) {
        console.error("❌ Błąd usuwania aktywności:", error);
      }
    }
  }
});
