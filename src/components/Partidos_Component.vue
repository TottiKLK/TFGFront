<template>
  <div class="container">
    <h1>{{ partido.name }}</h1>
    <p>{{ partido.description }}</p>
    <div class="details">
      <div class="svg-container">
        <svg width="312" height="210" viewBox="0 0 312 210" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="312" height="210" fill="white" />
          <rect x="7" y="7" width="298" height="196" stroke="black" stroke-width="2" />
          <line x1="57" y1="8" x2="57" y2="202" stroke="black" stroke-width="2" />
          <line x1="56" y1="105" x2="258" y2="105" stroke="black" stroke-width="2" />
          <line x1="257" y1="8" x2="257" y2="202" stroke="black" stroke-width="2" />
          <line x1="158" y1="-1.74846e-07" x2="158" y2="210" stroke="black" stroke-width="4" />
          <text v-for="(player, index) in players" :key="index" :x="player.x" :y="player.y"
            :fill="player.status === 'reserved' ? 'red' : player.status === 'selected' ? 'green' : 'black'"
            font-size="24" @click="togglePlayerStatus(player)">
            🏃
          </text>
        </svg>
      </div>
    </div>
    <button @click="reserve">Reservar</button>
    <button @click="goBack">Volver</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchPartido, reservePosition } from '@/services/partidosService';

export default {
  name: 'PartidoDetailView',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const partido = ref({});
    const players = ref([
      { id: 1, status: 'available' },
      { id: 2, status: 'available' },
      { id: 3, status: 'available' },
      { id: 4, status: 'available' }
    ]);

    onMounted(async () => {
      const partidoId = route.params.id;
      partido.value = await fetchPartido(partidoId);

      const usuarios = await fetchUsuariosPartido(partidoId);
      usuarios.forEach(usuario => {
        players.value[usuario.position - 1].status = 'reserved';
      });
    });

    const reserve = async () => {
      try {
        const selectedPlayerIndex = players.value.findIndex(player => player.status === 'selected');
        if (selectedPlayerIndex === -1) {
          alert('No hay jugadores seleccionados para reservar.');
          return;
        }

        if (players.value[selectedPlayerIndex].status === 'reserved') {
          alert('Esta posición ya está reservada.');
          return;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || !currentUser.idUser) {
          alert('Usuario no autenticado.');
          return;
        }

        const userId = currentUser.idUser;
        const partidoId = partido.value.idPartido;
        const position = selectedPlayerIndex + 1; 

        console.log('Reservando posición:');
        console.log('partidoId:', partidoId);
        console.log('userId:', userId);
        console.log('position:', position);

        await reservePosition(partidoId, userId, position);

        players.value[selectedPlayerIndex].status = 'reserved';
        alert('Reserva realizada con éxito');
      } catch (error) {
        console.error('Error al realizar la reserva:', error);
        alert('Error al realizar la reserva');
      }
    };

    const selectPlayer = (index) => {
      players.value.forEach(player => {
        if (player.status === 'selected') player.status = 'available';
      });
      if (players.value[index].status === 'available') {
        players.value[index].status = 'selected';
      }
    };

    const goBack = () => {
      router.push({ name: 'ZonaPartidos' });
    };

    return {
      partido,
      players,
      reserve,
      selectPlayer,
      goBack
    };
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.details {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
}

.svg-container {
  width: 312px;
  height: 210px;
  margin-top: 20px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
