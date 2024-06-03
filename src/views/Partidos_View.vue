<template>
    <Navbar />
    <div>
        <FieldSelector_Component />
    </div>
</template>

<script>
import Navbar from '@/components/Navbar_Component.vue';
import FieldSelector_Component from '@/components/FieldSelector_Component.vue';

export default {
    name: 'PartidosView',
    components: {
        FieldSelector_Component,
        Navbar,
    },
};
</script>
