<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelSesiones />
    </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu_Component.vue';
import DashboardPanelSesiones from '@/components/DashboardPanelSesiones_Component.vue';

export default {
    name: 'SesionIntranetView',
    components: {
        LeftMenu,
        DashboardPanelSesiones,
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

.sesiones-container {
}
</style>
