const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, default: 0 },
    proteins: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
});

module.exports = mongoose.model("Meal", MealSchema);
