<template>
    <nav>
        <div class="logo">
            <img src="/src/assets/logo.png" alt="">
        </div>
        <ul>
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/">HOME</router-link></li>
            <li><router-link to="/">HOME</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar_Component',
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