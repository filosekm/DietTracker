const express = require("express");
const MealHistory = require("../models/MealHistory");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
router.post("/history", authMiddleware, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Brak autoryzacji" });
        }

        const { name, meals } = req.body;
        const userId = req.user.id;
        const today = new Date().toISOString().split("T")[0];

        if (!name || !Array.isArray(meals) || meals.length === 0) {
            return res.status(400).json({ error: "Nieprawidłowe dane wejściowe" });
        }

        // ✅ Konwersja `name` na `product_name`
        const formattedMeals = meals.map(meal => ({
            product_name: meal.name || "Nieznany produkt", // 🔥 Zamiana `name` na `product_name`
            calories: meal.calories || 0,
            protein: meal.protein || 0,
            carbs: meal.carbs || 0,
            fats: meal.fats || 0
        }));

        console.log("📥 Otrzymane dane posiłków:", formattedMeals);

        let history = await MealHistory.findOne({ userId, date: today });

        if (history) {
            history.meals.push(...formattedMeals);
        } else {
            history = new MealHistory({ userId, name, date: today, meals: formattedMeals });
        }

        await history.save();
        console.log("✅ Zapisano posiłki w bazie.");
        res.status(201).json(history);
    } catch (error) {
        console.error("❌ Błąd zapisywania historii posiłków:", error.message);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


// 🔥 Pobieranie historii posiłków użytkownika
router.get("/history", authMiddleware, async (req, res) => {
    try {
        const history = await MealHistory.find({ userId: req.user.id}); // ✅ Pobiera tylko posiłki użytkownika
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Błąd pobierania historii" });
    }
});

// 🔥 Zapisywanie historii posiłków
const mongoose = require("mongoose");

router.get("/history/today", authMiddleware, async (req, res) => {
        try {
    
            if (!req.user || !req.user.id) {
                return res.status(401).json({ error: "Nieautoryzowany dostęp" });
            }
    
            // 🔥 Konwersja `userId` na `ObjectId`
            const userId = new mongoose.Types.ObjectId(req.user.id); 
            const today = new Date().toISOString().split("T")[0]; // Format "YYYY-MM-DD"
    
    
            // 🔥 Pobranie wpisu dla użytkownika i dzisiejszej daty
            const history = await MealHistory.findOne({ userId, date: today });
    
            if (!history) {
    
                // 🔥 Debug: Wypiszmy wszystkie wpisy dla użytkownika
                const allUserHistory = await MealHistory.find({ userId });
    
                return res.json({ meals: [] });
            }
    
            res.json({ meals: history.meals });
        } catch (error) {
            res.status(500).json({ error: "Błąd serwera" });
        }
    });

// 🔥 Usuwanie historii posiłków
router.delete("/history/:id", authMiddleware, async (req, res) => {
    try {
        const mealHistory = await MealHistory.findById(req.params.id);

        if (!mealHistory) {
            return res.status(404).json({ error: "Historia nie znaleziona" });
        }

        if (mealHistory.userId.toString() !== req.user.id) {
            return res.status(403).json({ error: "Nie masz uprawnień do usunięcia tego posiłku" });
        }

        await MealHistory.findByIdAndDelete(req.params.id);
        res.json({ message: "Historia usunięta" });
    } catch (error) {
        res.status(500).json({ error: "Błąd podczas usuwania historii" });
    }
});
router.get("/history/:date", async (req, res) => {
    try {
        const { date } = req.params;
        const history = await MealHistory.findOne({ date });

        if (!history) {
            return res.json({ meals: [] });
        }

        res.json(history);
    } catch (error) {
        console.error("❌ Błąd pobierania dzisiejszych posiłków:", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});
module.exports = router;
