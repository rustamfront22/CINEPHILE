import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'homepage', component: HomePage},
        {path: '/movies', name: 'moviespage', component: () => import('./pages/MoviesPage.vue')},
        {path: '/tvs', name: 'tvspage', component: () => import('./pages/TvsPage.vue')},
        {path: '/search', name: 'searchpage', component: () => import('./pages/SearchPage.vue')},
    ]
})