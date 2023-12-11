import { createRouter, createWebHashHistory } from 'vue-router';
import Catalog from "./pages/Catalog.vue"
import Main from "./pages/Main.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Main
    },
    { path: "/catalog", name: 'catalog', component: Catalog }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
}
);



export default router;
