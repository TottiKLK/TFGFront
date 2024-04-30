<template>
    <Navbar_Component />
    <ImgHome />
    <Products>
        <template v-slot:raquetas>
        </template>
        <template v-slot:accesorios>
        </template>
        <template v-slot:ropa>
        </template>
    </Products>
    <FooterComponent />
</template>

<script>
import Navbar_Component from '../components/Navbar_Component.vue';
import ImgHome from '../components/ImgHome_Component.vue';
import Products from '../components/Products_Component.vue';
import FooterComponent from '../components/Footer_Component.vue';

export default {
    name: 'home_view',
    components: {
        Navbar_Component,
        ImgHome,
        Products,
        FooterComponent,
    },
};
</script>

<style scoped>
</style>