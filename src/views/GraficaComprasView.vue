<template>
  <LeftMenu />
    <div class="grafica-compras">
      <button @click="goBack" class="back-button">Volver Atrás</button>
      <h1>Gráfica de Compras</h1>
      <ComprasChart />
      <div class="total-gastos-container" v-if="totalGastos !== null">
        <h2>Beneficios = {{ totalGastos }} €</h2>
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
        if (Array.isArray(userStore.compras) && userStore.compras.length > 0) {
          totalGastos.value = userStore.compras.reduce((total, compra) => {
            return total + (Array.isArray(compra.productos) ? compra.productos.reduce((sum, producto) => sum + producto.precioTotal, 0) : 0);
          }, 0);
        } else {
          totalGastos.value = 0;
        }
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
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: x hidden;
  }

  .grafica-compras {
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100vh;
  }
  
  .back-button {
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    margin-bottom: 20px;
    margin-top: 20px;
  }
  
  .back-button:hover {
    background-color: #454ea0;
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
    max-width: 48.5%;
  }
  
  .total-gastos-container h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    animation: fadeIn 1s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>
  