<!-- src/views/GraficaComprasView.vue -->
<template>
  <div class="admin-dashboard">
      <LeftMenu />
      <div class="grafica-compras">
          <h1>Gráfica de Compras</h1>
          <ComprasChart />
          <div class="total-gastos-container" v-if="totalGastos !== null">
              <h2>Facturación Total = {{ totalGastos }} €</h2>
          </div>
      </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ComprasChart from '@/components/ComprasChart_Component.vue';
import { useUserStore } from '@/stores/userStore';
import LeftMenu from '@/components/LeftMenu_Component.vue';

export default {
  name: 'GraficaComprasView',
  components: {
      ComprasChart,
      LeftMenu
  },
  setup() {
      const router = useRouter();
      const userStore = useUserStore();
      const totalGastos = ref(null);

      const calculateTotalGastos = () => {
          totalGastos.value = userStore.compras.reduce((total, compra) => {
              return total + compra.productos.reduce((sum, producto) => sum + producto.precioTotal, 0);
          }, 0);
      };

      onMounted(async () => {
          await userStore.getAllCompras();
          calculateTotalGastos();
      });

      const goBack = () => {
          router.go(-1);
      };

      return {
          goBack,
          totalGastos
      };
  }
};
</script>

<style scoped>
.admin-dashboard {
  display: flex;
}

.grafica-compras {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
}

.chart-container {
  margin-bottom: 20px;
}

.total-gastos-container {
  text-align: center;
  margin-top: 20px;
  background: rgba(54, 162, 235, 0.2);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.total-gastos-container h2 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}
</style>
