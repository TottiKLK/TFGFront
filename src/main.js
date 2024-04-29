import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home_View.vue';
import  ReservasView from '/src/views/Reservas_View.vue';
import PerfilView from '/src/views/Perfil_View.vue';

const routes = [
    {
        path: '/',
        name: 'homeview',
        component: HomeView
    },
    {
        path: '/reservas',
        name: 'reservas',
        component: ReservasView,
    },
    {
        path: '/perfil',
        name: 'perfil',
        component: PerfilView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
