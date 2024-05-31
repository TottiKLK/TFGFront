<template>
  <div class="profile-container">
    <h2>Perfil del Usuario</h2>
    <p><strong>Nombre:</strong> {{ currentUser.userName }}</p>
    <p><strong>Email:</strong> {{ currentUser.email }}</p>
    <h3>Compras Realizadas</h3>
    <div v-for="compra in compras" :key="compra.idCompra" class="compra-container">
      <h4>Compra ID: {{ compra.idCompra }}</h4>
      <p><strong>Total:</strong> {{ calcularTotal(compra.productos) }}€</p>
      <ul class="productos-list">
        <li v-for="producto in compra.productos" :key="producto.idProducto" class="producto-item">
          <p>{{ producto.nombre }}</p>
          <p><strong>Cantidad:</strong> {{ producto.cantidad }}</p>
          <p><strong>Precio Total:</strong> {{ producto.precioTotal }}€</p>
        </li>
      </ul>
      <button @click="cancelPurchase(compra.idCompra)">Cancelar Compra</button>
    </div>
    <h3>Reservas de Sesiones</h3>
    <div v-for="reserva in reservas" :key="reserva.idReservation" class="reserva-container">
      <h4>Reserva ID: {{ reserva.idReservation }}</h4>
      <p><strong>Fecha:</strong> {{ reserva.reservationDate }}</p>
      <p><strong>Precio:</strong> {{ reserva.reservationPrice }}€</p>
      <p v-if="reserva.session && reserva.session.pista"><strong>Sesión:</strong> {{ reserva.session.sesionTime }} en {{ reserva.session.pista.name }} ({{ reserva.session.pista.duration }})</p>
      <button @click="cancelReservation(reserva.idReservation)">Cancelar Reserva</button>
    </div>
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
      reservas: [], 
    };
  },
  mounted() {
    this.loadUserData();
    this.loadUserPurchases();
    this.loadUserReservations(); 
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
        this.compras = response; 
      } catch (error) {
        console.error('Error al cargar las compras:', error);
      }
    },
    async loadUserReservations() { 
      try {
        const response = await userService.getUserReservations(this.currentUser.idUser);
        this.reservas = response; 
      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    },
    async cancelPurchase(compraId) {
      try {
        await userService.deleteUserPurchase(this.currentUser.idUser, compraId);
        this.loadUserPurchases(); 
        window.location.reload(); 
      } catch (error) {
        console.error('Error al cancelar la compra:', error);
        alert('Error al cancelar la compra');
      }
    },
    async cancelReservation(reservationId) {
      try {
        await userService.deleteUserReservation(reservationId);
        this.loadUserReservations();
        window.location.reload(); 
      } catch (error) {
        console.error('Error al cancelar la reserva:', error);
        alert('Error al cancelar la reserva');
      }
    },
    calcularTotal(productos) {
      return productos.reduce((total, producto) => total + producto.precioTotal, 0);
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
  max-width: 800px;
  margin: 40px auto;
  margin-top: 10%;
}

.compra-container,
.reserva-container {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.productos-list {
  list-style: none;
  padding: 0;
}

.producto-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 0.5rem 0;
}

.producto-item p {
  margin: 0;
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
