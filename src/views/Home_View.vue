<template>
    <Navbar_Component />
    <ImgHome />
</template>

<script>
import Navbar_Component from '../components/Navbar_Component.vue';
import ImgHome from '../components/ImgHome_Component.vue';

export default {
    name: 'home_view',
    components: {
        Navbar_Component,
        ImgHome,
    },
};
</script>

<style scoped></style>