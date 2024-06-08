<template>
    <Navbar_Component />
    <ImgHome />
    <FooterComponent />
</template>

<script>
import Navbar_Component from '../components/Navbar_Component.vue';
import ImgHome from '../components/ImgHome_Component.vue';
import FooterComponent from '../components/Footer_Component.vue';

export default {
    name: 'home_view',
    components: {
        Navbar_Component,
        ImgHome,
        FooterComponent,
    },
};
</script>

<style scoped>
</style>