<template>
    <Navbar_Component />
    <UserProfile />
</template>

<script>
import Navbar_Component from '../components/Navbar_Component.vue';
import UserProfile from '../components/UserProfile.vue';  

export default {
    name: 'UserProfileView',
    components: {
        Navbar_Component,
        UserProfile,
    },
};
</script>

<style scoped>
</style>
