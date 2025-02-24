const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔹 Rejestracja użytkownika
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Użytkownik zarejestrowany" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 🔹 Logowanie użytkownika
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Niepoprawne dane logowania" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Błąd serwera" });
  }
};

// 🔹 Pobieranie profilu użytkownika
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Użytkownik nie znaleziony" });
    }
    res.json(user);
  } catch (error) {
    console.error("Błąd pobierania profilu:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
};

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
