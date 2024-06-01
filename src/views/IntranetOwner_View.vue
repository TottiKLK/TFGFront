<template>
    <div style="display: flex;">
        <LeftMenuOwner />
        <DashboardPanel />
    </div>
</template>

<script>
import LeftMenuOwner from '../components/LeftMenuOwner.vue';
import DashboardPanel from '../components/DashboardPanel_Component.vue'

export default {
    name: 'IntranetOwnerView',
    components: {
        LeftMenuOwner,
        DashboardPanel,
    }
};
</script>

<style>
:root{
    --color-1:#161719;
    --color-2: #454ea0;
    --color-3: #f0f0f1;
    --color-4: #383838;
    --color5: #d3d3d3;
}
</style>