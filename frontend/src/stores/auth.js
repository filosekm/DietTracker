import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: (() => {
      try {
        return JSON.parse(localStorage.getItem("user")) || null;
      } catch (e) {
        return null;
      }
    })(),
  }),

  actions: {
    async register(name, email, password) {
      try {
        console.log("📢 Rejestracja użytkownika:", name, email);

        const response = await axios.post("https://backendpraca.onrender.com/api/auth/register", {
          name,
          email,
          password,
        });

        if (response.status === 201) {
          console.log("✅ Rejestracja udana!");
          window.addNotification("✅ Rejestracja udana!", "success");
          await this.login(email, password);
        }
      } catch (error) {
        console.error("❌ Błąd rejestracji:", error.response?.data?.message || error.message);
      }
    },

    async login(email, password) {
      try {
        console.log("📢 Próba logowania:", email);
    
        const response = await axios.post("https://backendpraca.onrender.com/api/auth/login", {
          email,
          password,
        });
    
        if (response.data.token && response.data.user) {
          this.token = response.data.token;
          this.user = response.data.user;
    
          localStorage.setItem("token", this.token);
          localStorage.setItem("user", JSON.stringify(this.user));
    
          axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
          console.log("✅ Logowanie udane:", this.user);
          window.addNotification("✅ Pomyślnie zalogowano!", "success");
        }
      } catch (error) {
        this.token = null; // ❗ Resetujemy token na null, jeśli logowanie się nie powiedzie
        this.user = null;
        console.error("❌ Błąd logowania:", error.response?.data?.message || error.message);
      }
    },

    logout() {
      this.token = null;
      this.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      delete axios.defaults.headers.common["Authorization"];
      window.addNotification("🚪 Wylogowano pomyślnie!", "info");
    },

    // ✅ Dodaj metodę ładowania użytkownika z `localStorage`
    loadUser() {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        this.user = JSON.parse(savedUser);
        console.log("📢 Załadowano użytkownika:", this.user);
      }
    },
  },
});
