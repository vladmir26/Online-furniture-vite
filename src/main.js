import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './variables.scss'
import App from './App.vue'
import Main from './Main.vue'
import Catalog from './Catalog.vue'


const router = createRouter({
    routes: [{
      path: '/',
      name: 'home',
      component: Main
    },
    {
    path: '/catalog',
    name: 'catalog',
    component: Catalog
    }],
    history: createWebHistory()
  })

  createApp(App).mount('#app')
  createApp(App).use(router)

  