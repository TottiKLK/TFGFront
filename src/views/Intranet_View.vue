<template>
    <div class="admin-container">
      <LeftMenu />
      <router-view />
    </div>
  </template>
  
  <script>
  import LeftMenu from '@/components/LeftMenu_Component.vue';
  
  export default {
    name: 'IntranetView',
    components: {
      LeftMenu
    }
  };
  </script>
  
  <style scoped>
  .admin-container {
    display: flex;
  }
  </style>
  