<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelProductos />
    </div>
</template>

<script>
import { onMounted } from 'vue';
import LeftMenu from '@/components/LeftMenu_Component.vue';
import DashboardPanelProductos from '@/components/DashboardPanelProductos_Component.vue';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';

export default {
    name: 'ProductoIntranetView',
    components: {
        LeftMenu,
        DashboardPanelProductos,
    },
    setup() {
        const productStore = useProductStore();
        const { products, error } = storeToRefs(productStore);

        const loadProductos = async () => {
            await productStore.fetchProducts();
        };

        onMounted(loadProductos);

        return { products, error };
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

.productos-container {
}
</style>
