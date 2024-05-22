<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelUsuario />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import LeftMenu from '@/components/LeftMenu_Component.vue';
import DashboardPanelUsuario from '@/components/DashboardPanelUsuario_Component.vue';
import { userService } from '@/services/userService.js';

export default {
    name: 'UsuarioIntranetView',
    components: {
        LeftMenu,
        DashboardPanelUsuario,
    },
    setup() {
        const usuarios = ref([]);
        const error = ref(null);

        const loadUsuarios = async () => {
            try {
                usuarios.value = await userService.getUsers();
            } catch (e) {
                error.value = e.message;
            }
        };

        onMounted(loadUsuarios);

        return { usuarios, error };
    }
};
</script>

<style scoped>
.titulo {
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: 3px solid black;
    background-color: #C09057;
}

.usuarios-container {
}

</style>
