<template>
    <nav>
        <div class="logo">
            <img src="" alt="">
        </div>
        <ul>
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/">HOME</router-link></li>
        </ul>
    </nav>
</template>

<script lang="ts">
export default {
    name: 'Navbar',
}
</script>

<style scoped>
nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
}

ul {
    list-style: none;
    display: flex;
    gap: 1em;
}
</style>