const express = require("express");
const { updateProfile, getGoals, updateGoals } = require("../controllers/userController"); // Obsługuje edycję profilu
const { register, login, getProfile } = require("../controllers/authController"); // Obsługuje rejestrację, logowanie, pobieranie profilu
const authMiddleware = require("../middleware/auth");

const router = express.Router();

//  Rejestracja użytkownika
router.post("/register", register);

//  Logowanie użytkownika
router.post("/login", login);

//  Pobieranie profilu użytkownika
router.get("/profile", authMiddleware, getProfile);

//  Aktualizacja profilu użytkownika
router.put("/profile", authMiddleware, updateProfile);

//  Pobieranie celów użytkownika
router.get("/goals", authMiddleware, getGoals);

// Aktualizacja celów użytkownika
router.put("/goals", authMiddleware, updateGoals);

module.exports = router;
