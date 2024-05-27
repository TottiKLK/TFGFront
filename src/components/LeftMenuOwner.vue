<template>
    <div class="ds-left-menu">
        <div class="ds-perfil">
            <div class="info-perfil">
                <span>Owner</span>
            </div>
        </div>

        <div class="ds-menu">
            <ul>
                <li><router-link to="/partidointranetView">Partidos</router-link></li>
            </ul>
        </div>

        <div class="sign-off">
            <a @click="logout" href="#" class="btn-sign-off">
                <span>SALIR</span>
            </a>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
    name: 'LeftMenuOwner',
    setup() {
        const router = useRouter();

        function logout() {
            localStorage.removeItem('currentUser');
            router.push('/');
        }

        return {
            logout,
        };
    },
};
</script>

<style scoped>
.ds-left-menu {
    background: var(--color-1);
    color: #fff;
    width: 250px;
    position: relative;
    padding: 0px 20px;
    transition: margin-left .3s ease-in-out, width .3s ease-in-out;
    overflow-y: hidden; /* Evita el scroll */
    min-height: 100vh;
}

.ds-left-menu.menu-active {
    width: 80px;
    padding: 0px 10px;
}

.ds-left-menu.menu-active .ds-perfil {
    justify-content: center;
}

.ds-left-menu.menu-active .ds-perfil .info-perfil {
    display: none;
}

.ds-left-menu.menu-active ul li a span,
.ds-left-menu.menu-active .sign-off a span {
    visibility: hidden;
    display: none;
}

.ds-left-menu.menu-active ul li a i,
.ds-left-menu.menu-active .sign-off a i {
    margin-right: 0;
}

.ds-left-menu.menu-active .sign-off {
    width: calc(100% - 20px);
}

.ds-left-menu.menu-active .sign-off a,
.ds-left-menu.menu-active ul li a {
    text-align: center;
}

.ds-menu {
    width: 100%;
    height: calc(100% - 150px); /* Ajusta la altura para que no haya overflow */
    padding-bottom: 20px;
    padding-top: 20px;
    border-top: 1px solid #252628;
}

.ds-menu ul {
    list-style-type: none;
    padding-left: 0;
}

.ds-menu ul li a {
    cursor: pointer;
    color: var(--color5);
    background: transparent;
    display: block;
    margin-bottom: 10px;
    padding: 10px 10px; /* Ajusta el padding para botones más pequeños */
    border-radius: 4px;
    text-align: left;
    transition: background-color 0.3s ease;
}

.ds-menu ul li a:hover {
    background: var(--color-2);
    color: #fff;
}

.ds-menu ul li a i {
    margin-right: 10px;
}

.ds-perfil {
    display: flex;
    align-items: center;
    padding: 20px 0px;
    justify-content: left;
    margin-left: 20px;
}

.ds-perfil .info-perfil {
    padding-right: 20px;
}

.ds-perfil .info-perfil span {
    font-size: 16px;
    color: #bcbcbd;
}

.sign-off {
    position: absolute;
    bottom: 0;
    background: var(--color-1);
    width: calc(100% - 40px);
    border-top: 1px solid #252628;
    padding: 15px 0px;
}

.sign-off a.btn-sign-off {
    cursor: pointer;
    color: var(--color5);
    background: transparent;
    display: block;
    padding: 10px;
    border-radius: 4px;
}

.sign-off a.btn-sign-off:hover {
    background: #dd4b39;
    color: #fff;
}
</style>
