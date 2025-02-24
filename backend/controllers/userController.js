const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { name, age, weight, height, activity_level } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, {
      name, age, weight, height, activity_level
    }, { new: true });

    if (!user) return res.status(404).json({ message: "Użytkownik nie znaleziony" });

    res.json({ message: "Profil zaktualizowany", user });
  } catch (error) {
    res.status(500).json({ error: "Błąd serwera" });
  }
};
