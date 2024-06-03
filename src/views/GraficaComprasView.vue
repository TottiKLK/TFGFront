<template>
    <div class="grafica-compras">
      <h1>Gráfica de Compras</h1>
      <ComprasChart />
      <button @click="goBack" class="back-button">Volver Atrás</button>
    </div>
  </template>
  
  <script>
  import ComprasChart from '@/components/ComprasChart_Component.vue';
  
  export default {
    name: 'GraficaComprasView',
    components: {
      ComprasChart
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  };
  </script>
  
  <style scoped>
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
  </style>
  