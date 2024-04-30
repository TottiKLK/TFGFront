<template>
    <Navbar_Component />
    <SobreNosotros_Component/>    
</template>

<script>
import Navbar_Component from '../components/Navbar_Component.vue';
import SobreNosotros_Component from '../components/SobreNosotros_Component.vue';

export default{
    name: 'SobreNosotros_view',
    components: {
        Navbar_Component,
        SobreNosotros_Component,
    },
};
</script>

<style scoped>
</style>