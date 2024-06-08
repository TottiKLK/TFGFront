<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelPistas />
    </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu_Component.vue';
import DashboardPanelPistas from '@/components/DashboardPanelPistas_Component.vue';

export default {
    name: 'PistaIntranetView',
    components: {
        LeftMenu,
        DashboardPanelPistas,
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

.pistas-container {
}
</style>
