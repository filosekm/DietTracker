const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const authMiddleware = require("../middleware/authMiddleware"); // Middleware do autoryzacji

// ✅ Pobieranie wszystkich aktywności użytkownika
router.get("/", authMiddleware, async (req, res) => {
    try {
        const activities = await Activity.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: "Błąd pobierania aktywności", error });
    }
});

// ✅ Dodawanie nowej aktywności
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { type, duration, caloriesBurned } = req.body;
        if (!type || !duration || !caloriesBurned) {
            return res.status(400).json({ message: "Wszystkie pola są wymagane" });
        }

        const newActivity = new Activity({
            userId: req.user.id,
            type,
            duration,
            caloriesBurned
        });

        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (error) {
        res.status(500).json({ message: "Błąd dodawania aktywności", error });
    }
});

// ✅ Usuwanie aktywności
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: "Aktywność nie znaleziona" });
        }
        if (activity.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Brak uprawnień do usunięcia tej aktywności" });
        }

        await activity.remove();
        res.json({ message: "Aktywność usunięta" });
    } catch (error) {
        res.status(500).json({ message: "Błąd usuwania aktywności", error });
    }
});

module.exports = router;
