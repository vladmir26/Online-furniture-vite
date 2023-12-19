import { createRouter, createWebHashHistory } from 'vue-router';
import Catalog from "./pages/Catalog.vue"
import Product from "./pages/Product.vue"
import Main from "./pages/Main.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Main
    },
    { 
        path: '/catalog', 
        name: 'catalog', 
        component: Catalog 
    },
    {
        path: '/product',
        name: 'product',
        component: Product
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
}
);



export default router;
