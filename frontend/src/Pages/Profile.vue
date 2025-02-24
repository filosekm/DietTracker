<template>
  <div class="profile-container">
    <h2>Edytuj Profil</h2>
    <form @submit.prevent="updateProfile">
      <label for="name">Imię:</label>
      <input id="name" v-model="profile.name" type="text" required />

      <label for="age">Wiek:</label>
      <input id="age" v-model.number="profile.age" type="number" min="1" required />

      <label for="weight">Waga (kg):</label>
      <input id="weight" v-model.number="profile.weight" type="number" min="1" required />

      <label for="height">Wzrost (cm):</label>
      <input id="height" v-model.number="profile.height" type="number" min="1" required />

      <label for="activity_level">Poziom aktywności:</label>
      <select id="activity_level" v-model="profile.activity_level">
        <option value="niski">Niski</option>
        <option value="średni">Średni</option>
        <option value="wysoki">Wysoki</option>
      </select>

      <button type="submit">Zapisz zmiany</button>
    </form>
    <p v-if="message" class="success-message">{{ message }}</p>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@stores/auth";

export default {
  data() {
    return {
      profile: {
        name: "",
        age: null,
        weight: null,
        height: null,
        activity_level: "średni",
      },
      message: "",
      error: "",
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${useAuthStore().token}` },
      });
      this.profile = response.data;
    } catch (error) {
      this.error = "Nie udało się załadować profilu";
    }
  },
  methods: {
    async updateProfile() {
      try {
        const response = await axios.put("http://localhost:5000/api/users/profile", this.profile, {
          headers: { Authorization: `Bearer ${useAuthStore().token}` },
        });
        this.message = "Profil został zaktualizowany";
        this.error = "";
      } catch (error) {
        this.error = error.response?.data?.error || "Wystąpił błąd";
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f9f9f9;
}
label {
  display: block;
  margin-top: 10px;
}
input, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
button {
  margin-top: 15px;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #218838;
}
.success-message {
  color: green;
  margin-top: 10px;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>