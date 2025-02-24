const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 🔹 Rejestracja użytkownika
exports.register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Imię, email i hasło są wymagane!" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        // Nie ustawiamy `age`, `weight`, `height` - zostają domyślne wartości
      });
  
      await newUser.save();
      res.status(201).json({ message: "Użytkownik zarejestrowany" });
    } catch (error) {
      console.error("❌ Błąd rejestracji:", error);
      res.status(500).json({ error: "Błąd serwera" });
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

