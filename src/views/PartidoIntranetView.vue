<template>
    <div style="display: flex;">
        <LeftMenuOwner />
        <DashboardPanelPartidos />
    </div>
</template>

<script>
import LeftMenuOwner from '@/components/LeftMenuOwner.vue';
import DashboardPanelPartidos from '@/components/DashboardPanelPartidos_Component.vue';

export default {
    name: 'PartidoIntranetView',
    components: {
        LeftMenuOwner,
        DashboardPanelPartidos,
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
