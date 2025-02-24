require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

// ✅ Middleware
app.use(compression());
app.use(express.json());
app.use(cors());

// ✅ Ograniczenie liczby zapytań (Rate Limiting)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuta
  max: 100, // Maksymalnie 100 zapytań na minutę z jednego IP
  message: { error: "Zbyt wiele żądań, spróbuj ponownie później." },
});
app.use(limiter);

// ✅ Ładowanie tras API
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/productRoutes");
const mealRoutes = require("./routes/mealsRoutes");
const activityRoutes = require("./routes/activityRoutes");
const goalsRoutes = require("./routes/goalsRoutes"); // 📌 Dodano obsługę celów dietetycznych

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/goals", goalsRoutes); // 📌 Trasa dla celów dietetycznych

// ✅ Obsługa plików statycznych (Vue frontend)
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Funkcja uruchamiająca serwer
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Połączono z bazą danych MongoDB");

    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Serwer działa na porcie ${port}`));
  } catch (error) {
    console.error("❌ Błąd połączenia z bazą danych:", error.message);
    process.exit(1); // Zatrzymanie aplikacji w razie błędu
  }
};

// ✅ Uruchamiamy serwer, jeśli plik jest głównym modułem
if (require.main === module) {
  startServer();
}

module.exports = app;
