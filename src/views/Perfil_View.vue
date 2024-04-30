<template>
    <Navbar />
    <div class="perfil-view">
        <Login v-if="mostrarLogin" @cambio="toggleMostrarLogin" />
        <Register v-else @cambio="toggleMostrarLogin" />
    </div>
</template>

<script>
import Login from '../components/Login_Component.vue'
import Register from '../components/Register_Component.vue'
import Navbar from '../components/Navbar_Component.vue';

export default {
    name: 'PerfilView',
    components: {
        Login,
        Register,
        Navbar,
    },
    data() {
        return {
            mostrarLogin: true
        }
    },
    methods: {
        toggleMostrarLogin() {
            this.mostrarLogin = !this.mostrarLogin;
        }
    }
}
</script>

<style scoped>
.perfil-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>