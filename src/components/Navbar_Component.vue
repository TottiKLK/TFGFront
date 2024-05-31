<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <img src="@/assets/logo.png" alt="Logo" />
        </div>
        <div class="navbar-menu" v-bind:class="{ active: menuVisible }" v-show="!isMobile || menuVisible">
            <router-link to="/" class="navbar-item">{{ $t('navbar.home') }}</router-link>
            <router-link to="/Products" class="navbar-item">{{ $t('navbar.products') }}</router-link>
            <router-link to="/reservas" class="navbar-item">{{ $t('navbar.tracks') }}</router-link>
            <router-link to="/partidos" class="navbar-item">{{ $t('navbar.matches') }}</router-link>
            <router-link :to="profileLink" class="navbar-item">{{ currentUser ? currentUser.userName : $t('navbar.login') }}</router-link>
            <div class="language-selector">
                <select v-model="currentLocale" @change="changeLocale">
                    <option value="en">Español</option>
                    <option value="es">English</option>
                </select>
            </div>
        </div>
        <div class="navbar-toggler-container" v-if="isMobile" @click="toggleMenu">
            <button class="navbar-toggler">
                <span class="toggler-icon" :class="{ 'toggler-icon-active': menuVisible }"></span>
            </button>
        </div>
    </nav>
</template>

<script>
import { getCurrentUser } from '@/utils/auth';

export default {
    name: 'Navbar_Component',
    data() {
        return {
            isMobile: false,
            menuVisible: false,
            windowWidth: window.innerWidth,
            currentLocale: this.$i18n.locale,
        }
    },
    computed: {
        profileLink() {
            const currentUser = getCurrentUser();

            if (currentUser) {
                if (currentUser.rol === 1) {
                    return '/intranet';
                } else if (currentUser.rol === 2) {
                    return '/intranetOwner';
                } else {
                    return '/userprofile';
                }
            } else {
                return '/perfil';
            }
        },
        isLoggedIn() {
            return !!localStorage.getItem('currentUser');
        },
        currentUser() {
            return getCurrentUser();
        }
    },
    mounted() {
        console.log('Component mounted. Current width:', window.innerWidth);
        this.updateIsMobile();
        window.addEventListener('resize', this.updateIsMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateIsMobile);
    },
    methods: {
        updateIsMobile() {
            this.isMobile = window.innerWidth < 768;
        },
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
            console.log('Menu toggled. Menu visible:', this.menuVisible);
        },
        changeLocale() {
            this.$i18n.locale = this.currentLocale;
        }
    }
}
</script>
<style scoped>
.flag-icon {
    cursor: pointer;
    width: 30px;
    height: 20px;
    margin: 0 5px;
    border: 2px solid transparent;
}

.flag-icon.active {
    border-color: #555;
}

.language-selector {
    display: flex;
    align-items: center;
}

.mobile-language-selector {
    display: none;
}

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
    margin-bottom: 2%;
}

@keyframes rotate-logo {
    0% {
        transform: rotate(0deg);
    }

    0%,
    100% {
        transform: translateX(0) rotate(0deg);
    }

    25% {
        transform: translateX(40px) rotate(90deg);
    }

    50% {
        transform: rotate(180deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.imagenCarrito {
    width: 30px;
    height: 30px;
}

.navbar-logo img {
    animation: rotate-logo 10s linear infinite;
    width: 60px;
    height: 60px;
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
    font-size: 20px;
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
    .lenguage-selector {
        padding-bottom: 2%;
    }

    .mobile-language-selector {
        display: block;
        padding: 10px;
        width: 100%;
    }

    .navbar {
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
    }

    .navbar-toggler-icon::after,
    .navbar-toggler-icon::before {
        height: 30px;
    }

    .navbar-logo img {
        width: 60px;
        height: 60px;
        margin-bottom: 0.5rem;
    }

    .navbar-toggler-container {
        display: flex;
        justify-content: flex-end;
        margin-right: 2rem;
        width: 100%;
    }

    .navbar-menu {
        display: none;
        flex-direction: column;
        top: 60px;
        left: 50%;
        width: 100%;
        background-color: white;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        width: 100%;
        align-items: center;
        overflow: hidden;
        margin-left: 12%;
        padding-left: 10%;
        padding-right: 10%;
    }

    .navbar-menu.active {
        display: flex;
        transition: transform 03.s ease-in-out;
    }

    .navbar-item {
        display: flex;
        justify-content: center;
        text-align: center;
        font-size: 12px;
        padding: 1rem;
        margin: 0.5rem 0;
    }

    .navbar-toggler {
        background: url('/src/assets/menu.png');
        background-size: contain;
        width: 30px;
        height: 30px;
        z-index: 101;
    }
}
</style>