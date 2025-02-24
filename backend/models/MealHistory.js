const mongoose = require("mongoose");

const MealHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 🔑 Przypisanie do użytkownika
    name: { type: String, required: true },
    date: { type: String, required: true }, // 📅 Data w formacie YYYY-MM-DD
    meals: [
        {
            product_name: { type: String, required: true },
            calories: { type: Number, required: true },
            protein: { type: Number, required: true },
            carbs: { type: Number, required: true },
            fats: { type: Number, required: true },
        },
    ],
});

module.exports = mongoose.model("MealHistory", MealHistorySchema);
