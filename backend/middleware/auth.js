const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.error("🚨 Brak tokena w żądaniu!");
        return res.status(401).json({ error: "Brak tokena autoryzacyjnego" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "super_tajne_haslo");

        if (!decoded.id) {
            return res.status(401).json({ error: "Nieprawidłowy token" });
        }

        req.user = { id: decoded.id }; // 🔥 Teraz `req.user.id` zawsze będzie dostępne

        next();
    } catch (error) {
        console.error("❌ Nieprawidłowy token:", error.message);
        return res.status(403).json({ error: "Nieprawidłowy token" });
    }
};

module.exports = authMiddleware;
