<template>
    <div>
      <Navbar_Component />
      <Pistas_Component />
    </div>
  </template>
  
  <script>
  import Navbar_Component from '../components/Navbar_Component.vue';
  import Pistas_Component from '@/components/Pistas_Component.vue';
  
  export default {
    name: 'reservas_view',
    components: {
      Navbar_Component,
      Pistas_Component,
    },
  };
  </script>
  
  <style scoped>
  </style>
  