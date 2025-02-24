import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router/index";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useMealsStore } from "./stores/meals";
import VueApexCharts from "vue3-apexcharts";
const app = createApp(App);

const pinia = createPinia();
app.use(pinia);



const mealsStore = useMealsStore();



app.use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
});

app.use(router);
app.component("apexchart", VueApexCharts);

app.mount("#app");
