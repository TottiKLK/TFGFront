<template>
    <div style="display: flex;">
        <LeftMenu />
        <DashboardPanelProductos />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import LeftMenu from '@/components/LeftMenu_Component.vue';
import DashboardPanelProductos from '@/components/DashboardPanelProductos_Component.vue';
import { productsService } from '@/services/productsService.js';

export default {
    name: 'ProductoIntranetView',
    components: {
        LeftMenu,
        DashboardPanelProductos,
    },
    setup() {
        const productos = ref([]);
        const error = ref(null);

        const loadProductos = async () => {
            try {
                productos.value = await productsService.getProducts();
            } catch (e) {
                error.value = e.message;
            }
        };

        onMounted(loadProductos);

        return { productos, error };
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
