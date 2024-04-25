r-log<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <img src="@/assets/logo.png" alt="Logo" />
        </div>
        <div class="navbar-menu" v-bind:class="{ active: menuVisible }" v-show="!isMobile || menuVisible">
            <router-link to="/" class="navbar-item">INICIO</router-link>
            <router-link to="" class="navbar-item">INICIO</router-link>
            <router-link to="" class="navbar-item">INICIO</router-link>
            <router-link to="" class="navbar-item">INICIO</router-link>
        </div>
        <div class="navbar-toggler-container" v-if="isMobile" @click="toggleMenu">
            <button class="navbar-toggler">
                <span class="toggler-icon" :class="{ 'toggler-icon-active': menuVisible }"></span>
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar_Component',
    data() {
        return {
            isMobile: false,
            menuVisible: false,
            windowWidth: window.innerWidth,
        }
    },
    mounted() {
        console.log('Component mounted. Current width:', window.innerWidth);
        this.updateIsMobile();
        window.addEventListener('resize', this.updateIsMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateIsMobile)
    },
    methods: {
        updateIsMobile() {
            this.isMobile = window.innerWidth < 768;
        },
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
            console.log('Menu toggled. Menu visible:', this.menuVisible);
        }
    }
}
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    box-shadow: 5px 5px 5px 5px rgb(0 0 0 / 10%);
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
}

@keyframes rotate-logo {
    0% {
        transform: rotate(0deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.navbar-logo img {
    animation: rotate-logo 10s linear infinite;
    width: 40px;
    height: auto;
    border-radius: 50%;
    margin-left: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
}

.navbar-menu {
    display: flex;
    margin-right: 1%;
}

.navbar-item {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 11px;
    font-family: Georgia, 'Times New Roman', Times, serif;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.navbar-item:hover {
    background-color: #f5f5f5;
}

.navbar-toggler {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border: none;
    background: none;
    cursor: pointer;
}

.navbar-toggler-icon {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #333;
    position: relative;
}

.navbar-toggler-icon,
.navbar-toggler-icon::after,
.navbar-toggler-icon::before {
    display: block;
    width: 30px;
    height: 2px;
    background-color: #333;
    transition: transform 0.3s ease-in-out;
}

.navbar-toggler-icon::after,
.navbar-toggler-icon::before {
    content: '';
    position: absolute;
    transition: transform 0.3s ease-in-out;
}

.navbar-toggler-icon::before {
    transform: translateY(-10px);
}

.navbar-toggler-icon::after {
    transform: translateY(10px);
}

.toggler-icon-active {
    background-color: transparent;
}

@media (max-width: 768px) {
    .navbar {
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5rem;
    }

    .navbar-toggler-icon::after,
    .navbar-toggler-icon::before {
        height: 30px;
    }

    .navbar-logo img {
        margin-bottom: 0.5rem;
    }

    .navbar-toggler-container {
        display: flex;
        justify-content: right;
        margin-right: 3%;
        width: 100%;
    }

    .navbar-menu {
        display: none;
        flex-direction: column;
        position: fixed;
        top: 60px;
        left: 0;
        width: 100%;
    }

    .navbar-menu.active {
        display: flex;
        transform: translateX(0%);
    }

    .navbar-item {
        padding: 0.5rem;
        text-align: left;
    }

    .navbar-toggler {
        background: url('/src/assets/menu.png');
        background-size: cover;
        width: 30px;
        height: 30px;
        z-index: 101;
    }
}
</style>