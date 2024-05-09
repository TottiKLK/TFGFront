<template>
    <Navbar_Component />
    <Products />
    <FooterComponent />
</template>

<script>
import Navbar_Component from '../components/Navbar_Component.vue';
import FooterComponent from '../components/Footer_Component.vue';
import Products from '../components/Products_Component.vue';

export default {
    name: 'home_view',
    components: {
        Navbar_Component,
        Products,
        FooterComponent,
    },
};
</script>

<style scoped>
</style>