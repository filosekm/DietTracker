const express = require("express");
const axios = require("axios");

const router = express.Router();

// 🔗 Open Food Facts API URL dla wyszukiwania produktów
const OFF_API_URL = "https://pl.openfoodfacts.org/cgi/search.pl";

// 🛒 Endpoint do wyszukiwania produktów
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: "Brak zapytania do wyszukania." });
        }

        console.log(`🔍 Wyszukiwanie produktu: ${query}`);

        // 🔥 Parametry zapytania do Open Food Facts API
        const params = {
            search_terms: query,  
            json: 1,  
            page_size: 20,  
            fields: "product_name,nutriments,countries_tags",  
        };

        console.log("🔗 Wysyłane zapytanie:", `${OFF_API_URL}?${new URLSearchParams(params)}`);

        // 📨 Wysłanie zapytania do Open Food Facts
        const response = await axios.get(OFF_API_URL, { params });

        console.log("📥 Otrzymana odpowiedź API:", response.data);

        let products = response.data.products || [];

        // 🔄 Mapowanie wyników do przejrzystego formatu
        const formattedProducts = products.map((product) => ({
            id: product.code || Date.now(),  // Unikalny identyfikator
            name: product.product_name?.trim() || "Nieznany produkt",
            calories: product.nutriments?.["energy-kcal_100g"] || product.nutriments?.["energy-kcal"] || 0,
            proteins: product.nutriments?.proteins_100g || product.nutriments?.proteins || 0,
            carbs: product.nutriments?.carbohydrates_100g || product.nutriments?.carbohydrates || 0,
            fats: product.nutriments?.fat_100g || product.nutriments?.fat || 0,
            image_url: product.image_url || "", // Opcjonalnie: dodanie obrazka
        }));

        console.log("📋 Wyniki po filtrowaniu:", formattedProducts);

        res.json(formattedProducts);
    } catch (error) {
        console.error("❌ Błąd pobierania danych z Open Food Facts:", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

module.exports = router;
