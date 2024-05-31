// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/Home_View.vue';
import ReservasView from '@/views/Reservas_View.vue';
import PerfilView from '@/views/Perfil_View.vue';
import SobreNosotros from '@/views/SobreNosotros_View.vue';
import Products from '@/views/Products_View.vue';
import PartidosView from '@/views/Partidos_View.vue';
import PartidoDetailView from '@/views/PartidoDetail_View.vue';
import Intranet from '@/views/Intranet_View.vue';
import UsuarioIntranet from '@/views/UsuarioIntranet_View.vue';
import UserProfile from '@/views/UserProfile_View.vue';
import ProductoIntranet from '@/views/ProductoIntranetView.vue';
import PistaIntranet from '@/views/PistaIntranetView.vue';
import SesionIntranet from '@/views/SesionIntranetView.vue';
import PartidoIntranetView from '@/views/PartidoIntranetView.vue';
import IntranetOwner from '@/views/IntranetOwner_View.vue';
import i18n from './i18n';

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
    {
        path: '/sobrenosotros',
        name: 'sobrenosotros',
        component: SobreNosotros,
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
    },
    {
        path: '/partidos',
        name: 'partidos',
        component: PartidosView,
    },
    {
        path: '/partido/:id',
        name: 'PartidoDetailView',
        component: PartidoDetailView,
        props: true
    },
    {
        path: '/intranet',
        name: 'Intranet',
        component: Intranet,
    },
    {
        path: '/usuariointranet',
        name: 'UsuarioIntranet',
        component: UsuarioIntranet,
    },
    {
        path: '/userprofile',
        name: 'UserProfile',
        component: UserProfile,
    },
    {
        path: '/productointranet',
        name: 'ProductoIntranet',
        component: ProductoIntranet,
    },
    {
        path: '/pistaintranet',
        name: 'PistaIntranet',
        component: PistaIntranet,
    },
    {
        path: '/sesionintranet',
        name: 'SesionIntranet',
        component: SesionIntranet,
    },
    {
        path: '/partidointranetView',
        name: 'PartidoIntranetView ',
        component: PartidoIntranetView ,
    },
    {
        path: '/intranetowner',
        name: 'IntranetOwner ',
        component: IntranetOwner ,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

app.use(router);
app.use(i18n);
app.mount('#app');
