<template>
    <div class="chart-container">
      <canvas id="comprasChart"></canvas>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'ComprasChart',
    setup() {
      const userStore = useUserStore();
  
      onMounted(async () => {
        try {
          await userStore.getAllCompras();
  
          const comprasData = userStore.compras.map(compra => ({
            usuario: compra.userName,
            total: compra.productos.reduce((sum, prod) => sum + prod.precioTotal, 0)
          }));
  
          const ctx = document.getElementById('comprasChart').getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: comprasData.map(data => data.usuario),
              datasets: [{
                label: 'Dinero gastado en Compras',
                data: comprasData.map(data => data.total),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        } catch (error) {
          console.error('Error setting up chart:', error);
        }
      });
  
      return {};
    }
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 900px;
    height: 400px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  