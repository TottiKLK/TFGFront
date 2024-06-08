<template>
    <div v-if="visible" class="modal-overlay" @click.self="hideModal">
      <div class="modal-content">
        <p>{{ message }}</p>
        <button @click="hideModal">Cerrar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalComponent',
    props: {
      message: {
        type: String,
        required: true
      },
      visible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      hideModal() {
        this.$emit('update:visible', false);
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
  }
  
  .modal-content p {
    margin: 0 0 10px;
  }
  
  .modal-content button {
    background-color: #e27635;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  