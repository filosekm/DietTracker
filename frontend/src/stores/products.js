import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
    state: () => ({
        results: [],
    }),
    actions: {
        async fetchProducts(query) {
            try {
                const response = await fetch(`/api/search?q=${query}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                this.results = data.map(product => ({
                    id: product.id,
                    product_name: product.product_name,
                    brands: product.brands,
                    image_url: product.image_url || null,
                    nutriments: product.nutriments,
                }));
            } catch (error) {
                console.error("Błąd wyszukiwania produktów:", error);
                this.results = [];
            }
        },
    },
});
