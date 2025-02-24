import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth"; // Import Pinia

import Home from "../Pages/Home.vue";
import Nutrition from "../Pages/Nutrition.vue";
import Reports from "../Pages/Reports.vue";
import Settings from "../Pages/Settings.vue";
import History from "../Pages/History.vue";
import ShoppingList from "../Pages/ShoppingList.vue";
import Activities from "../Pages/Activities.vue";
import Login from "../Pages/Login.vue";
import Register from "../Pages/Register.vue";
import Profile from "../Pages/Profile.vue";
const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
    { path: "/register", name: "Register", component: Register },
    { path: "/nutrition", name: "Nutrition", component: Nutrition, meta: { requiresAuth: true } },
    { path: "/reports", name: "Reports", component: Reports, meta: { requiresAuth: true } },
    { path: "/settings", name: "Settings", component: Settings, meta: { requiresAuth: true } },
    { path: "/history", name: "History", component: History, meta: { requiresAuth: true } },
    { path: "/shopping-list", name: "Shopping List", component: ShoppingList, meta: { requiresAuth: true } },
    { path: "/activities", component: Activities, meta: { requiresAuth: true } },
    {
        path: "/profile",
        name: "Profile",
        component: Profile, 
        meta: { requiresAuth: true }, 
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 🔹 Middleware sprawdzający autoryzację przed przejściem na stronę
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.token) {
        next("/login"); // Przekierowanie na login, jeśli użytkownik nie jest zalogowany
    } else {
        next();
    }
});

export default router;
