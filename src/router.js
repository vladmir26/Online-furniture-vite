import { createRouter, createWebHistory } from 'vue-router';
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
        path: '/catalog/', 
        name: 'catalog', 
        component: Catalog 
    },
    {
        path: '/product/:id',
        name: 'product',
        component: Product,
        props: true
    },

    {
      path: '/product/mock:id',
      name: 'product-mock',
      component: Product,
      props: true
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
}
);



export default router;
