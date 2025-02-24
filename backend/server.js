require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require('compression'); 
const rateLimit = require("express-rate-limit");

const app = express();
app.use(compression()); 
app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuta
  max: 100, // Maksymalnie 100 zapytań na minutę z jednego IP
  message: { error: "Zbyt wiele żądań, spróbuj ponownie później." }
});

app.use(limiter); //

module.exports = (async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Połączono z bazą danych");

    // Importujemy trasy
    const userRoutes = require("./routes/userRoutes");
    app.use("/api/users", userRoutes);

    const authRoutes = require("./routes/auth");
    app.use("/api/auth", authRoutes);

    const productRoutes = require("./routes/productRoutes");
    app.use("/api/products", productRoutes);

    const mealRoutes = require("./routes/mealsRoutes");
    app.use("/api/meals", mealRoutes);
    const activityRoutes = require("./routes/activityRoutes");
    app.use("/api/activities", activityRoutes); // Obsługa aktywności użytkownika
    if (require.main === module) {
      const port = process.env.PORT || 5000;
      app.listen(port);
    }
  } catch (error) {
    console.error("❌ Błąd połączenia z bazą danych:", error.message);
  }
  return app;
})();
