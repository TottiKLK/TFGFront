import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/Home_View.vue';
import App from './App.vue';
import ReservasView from '@/views/Reservas_View.vue';
import PerfilView from '@/views/Perfil_View.vue';

Vue.use(VueRouter);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
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
    ]
})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');