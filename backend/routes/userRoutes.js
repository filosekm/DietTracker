const express = require("express");
const { register, login, getProfile, updateProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// 🔹 Rejestracja użytkownika
router.post("/register", register);

// 🔹 Logowanie użytkownika
router.post("/login", login);

// 🔹 Pobieranie profilu użytkownika
router.get("/profile", authMiddleware, getProfile);

// 🔹 Aktualizacja profilu użytkownika
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;
