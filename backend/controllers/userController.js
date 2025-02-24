const User = require("../models/User");

// 🔹 Aktualizacja profilu użytkownika
exports.updateProfile = async (req, res) => {
    try {
      const { name, age, weight, height, activity_level } = req.body;
      const user = await User.findById(req.user.id);
  
      if (!user) {
        return res.status(404).json({ error: "Użytkownik nie znaleziony" });
      }
  
      // ✅ Walidacja na backendzie
      if (age <= 0 || isNaN(age)) {
        return res.status(400).json({ error: "Wiek musi być liczbą większą niż 0!" });
      }
      if (weight <= 0 || isNaN(weight)) {
        return res.status(400).json({ error: "Waga musi być większa niż 0!" });
      }
      if (height <= 0 || isNaN(height)) {
        return res.status(400).json({ error: "Wzrost musi być większy niż 0!" });
      }
      if (!["niski", "średni", "wysoki"].includes(activity_level)) {
        return res.status(400).json({ error: "Nieprawidłowy poziom aktywności!" });
      }
  
      user.name = name || user.name;
      user.age = age || user.age;
      user.weight = weight || user.weight;
      user.height = height || user.height;
      user.activity_level = activity_level || user.activity_level;
  
      await user.save();
      res.json(user);
    } catch (error) {
      console.error("Błąd aktualizacji profilu:", error);
      res.status(500).json({ error: "Błąd serwera" });
    }
  };
  
  exports.getGoals = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Użytkownik nie znaleziony" });
      }
      res.json(user.goals);
    } catch (error) {
      console.error("❌ Błąd pobierania celów:", error);
      res.status(500).json({ error: "Błąd serwera" });
    }
  };
  
  // ✅ Aktualizacja celów użytkownika
  exports.updateGoals = async (req, res) => {
    try {
      const { calories, protein, carbs, fats } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Użytkownik nie znaleziony" });
      }
  
      // 🛠 Aktualizacja celów
      user.goals = {
        calories: calories || user.goals.calories,
        protein: protein || user.goals.protein,
        carbs: carbs || user.goals.carbs,
        fats: fats || user.goals.fats
      };
  
      await user.save();
      res.json({ message: "Cele zaktualizowane", goals: user.goals });
    } catch (error) {
      console.error("❌ Błąd aktualizacji celów:", error);
      res.status(500).json({ error: "Błąd serwera" });
    }
  };