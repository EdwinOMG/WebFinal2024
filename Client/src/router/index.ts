import { createRouter, createWebHistory } from 'vue-router';
import LogPage from './pages/LogPage.vue'; 

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LogPage 
    },
   
    
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;