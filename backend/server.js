require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Eksport aplikacji bez `app.listen()`, aby użyć jej w testach
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

    if (require.main === module) {
      const port = process.env.PORT || 5000;
      app.listen(port, () => console.log(`🚀 Serwer działa na porcie ${port}`));
    }
  } catch (error) {
    console.error("❌ Błąd połączenia z bazą danych:", error.message);
  }
  return app;
})();
