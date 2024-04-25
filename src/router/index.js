import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '@/views/Home_View.vue';
import App from './App.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
    ]
})