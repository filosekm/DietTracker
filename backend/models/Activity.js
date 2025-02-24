const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true }, // Typ aktywności (np. "Bieganie", "Jazda na rowerze")
    duration: { type: Number, required: true }, // Czas trwania w minutach
    caloriesBurned: { type: Number, required: true }, // Spalone kalorie
    createdAt: { type: Date, default: Date.now } // Data dodania aktywności
});

module.exports = mongoose.model("Activity", ActivitySchema);
