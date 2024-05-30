<template>
  <div class="profile-container">
    <h2>Perfil del Usuario</h2>
    <p><strong>Nombre:</strong> {{ currentUser.userName }}</p>
    <p><strong>Email:</strong> {{ currentUser.email }}</p>
    <h3>Compras Realizadas</h3>
    <ul>
      <li v-for="compra in compras" :key="compra.id">
        {{ compra.nombre }} - {{ compra.precioTotal }}€
      </li>
    </ul>

    <button @click="logout">Cerrar Sesión</button>
  </div>
</template>

<script>
import { userService } from '@/services/userService';

export default {
  data() {
    return {
      currentUser: {},
      compras: [],
    };
  },
  mounted() {
    this.loadUserData();
    this.loadUserPurchases();
  },
  methods: {
    loadUserData() {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user) {
        this.currentUser = user;
        console.log('Current user ID:', this.currentUser.idUser);
      } else {
        this.$router.push('/');
      }
    },
    async loadUserPurchases() {
      try {
        const response = await userService.getUserPurchases(this.currentUser.idUser);
        console.log('respuesta recibida:', response);
        const compras = response.data;

        var prueba = response.data;
        console.log('valores prueba:', prueba);
        let prubea2 = response.data;
        console.log('valores prubea2', prubea2);

        console.log(this.currentUser.idUser);
        console.log('Compras:', compras);

        /*if (!compras || compras.length === 0) {
          console.error('No hay compras en la respuesta:', response);
          return;
        }*/

        // Recolectamos todos los productos de todas las compras
        let allProducts = [];

        const primeraCompra = response.find(compra => Array.isArray(compra.productos));

        if (primeraCompra) {
          allProducts = primeraCompra.productos.map(product => ({
            id: product.idProducto,
            nombre: product.nombre,
            precioTotal: product.precioTotal
          }));
        } else {
          console.error('No se encontró ninguna compra con un array de productos.');
        }
        console.log(allProducts);

        this.compras = allProducts;
        console.log('Compras mapeadas:', this.compras);

      } catch (error) {
        console.error('Error al cargar las compras:', error);
      }
    },

    logout() {
      localStorage.removeItem('currentUser');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.profile-container {
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  margin-top: 10%;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #FF4500;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}

button:hover {
  background-color: #E04000;
  transform: scale(1.05);
}
</style>
