<template>
  <div class="profile-container">
    <h2>Perfil del Usuario</h2>
    <p><strong>Nombre:</strong> {{ currentUser.userName }}</p>
    <p><strong>Email:</strong> {{ currentUser.email }}</p>
    <h3>Compras Realizadas</h3>
    <ul  v-for="compra in compras" :key="compra.id">{{ compra.description }} - {{ new
        Date(compra.date).toLocaleDateString() }}>
      <li>
        hola
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
        const compras = await userService.getUserPurchases(this.currentUser.idUser);
        console.log('Compras:', compras); // Verifica las compras obtenidas
        this.compras = compras.productos.map(product => ({
          description: product.nombre,
          date: new Date().toLocaleDateString(),
          total: product.precioTotal
        }));
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
