<template>
  <div class="card" v-if="partido">
    <h1>{{ partido.name }}</h1>
    <p>{{ partido.description }}</p>
    <img :src="partido.photo" alt="Imagen del Partido" class="partido-image" />
    <div class="date-time">
      {{ new Date(partido.date).toLocaleString() }}
    </div>
    <div class="stars">
      <i v-for="star in parseInt(partido.estrellas)" :key="star" class="fas fa-star"></i>
    </div>
    <div class="content-wrapper">
      <div class="field-wrapper">
        <Field_Component />
        <div class="fieldgrid">
          <div v-for="(player, index) in players" :key="index" :class="['fielditem', { reverse: index % 2 === 0 }]">
            <Player_Component @toggle="() => changeSelected(index)" :isSelected="selectedPlayer === index"
              :notAvailable="player.status === 'reserved'" />
            <span v-if="player.userName" class="player-name" :class="{ 'reverse-name': index % 2 === 0 }">{{ player.userName }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="reserve-button" @click="handleReservePosition">Apuntarse</button>
      <button class="unreserve-button" @click="handleUnreservePosition">Desapuntarse</button>
      <router-link to="/partidos">
        <button class="back-button">Volver</button>
      </router-link>
    </div>
  </div>
  <div class="card" v-else>
    <p>Partido no encontrado.</p>
    <router-link to="/partidos">
      <button class="back-button">Volver</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Field_Component from '@/components/Field_Component.vue';
import Player_Component from '@/components/Player_Component.vue';
import { getCurrentUser } from '@/utils/auth';
import { usePartidoStore } from '@/stores/partidoStore';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';

const route = useRoute();
const partidoStore = usePartidoStore();
const { partido } = storeToRefs(partidoStore);

const partidoId = computed(() => parseInt(route.params.id, 10));
const players = ref([
  { id: 1, status: 'available', userName: null },
  { id: 2, status: 'available', userName: null },
  { id: 3, status: 'available', userName: null },
  { id: 4, status: 'available', userName: null }
]);
const selectedPlayer = ref(null);

const fetchPlayers = async () => {
  await partidoStore.fetchPartido(partidoId.value);

  try {
    const usuarios = await partidoStore.fetchUsuariosPartido(partidoId.value);
    usuarios.forEach(usuario => {
      players.value[usuario.position - 1].status = 'reserved';
      players.value[usuario.position - 1].userName = usuario.userName;
    });

    const currentUser = getCurrentUser();
    const player = usuarios.find(player => player.userName === currentUser.userName);
    if (player) {
      selectedPlayer.value = player.position - 1;
    }
  } catch (error) {
    console.log('No hay jugadores para este partido');
  }
};

const handleReservePosition = async () => {
  if (selectedPlayer.value === null) {
    Swal.fire('Seleccione una posición para reservar.', '', 'warning');
    return;
  }

  const currentUser = getCurrentUser();
  if (currentUser === null) {
    Swal.fire('Por favor, inicia sesión antes de realizar una reserva.', '', 'warning');
    return;
  }

  try {
    const usuarios = await partidoStore.fetchUsuariosPartido(partidoId.value);
    if (usuarios) {
      const player = usuarios.find(player => player.userName === currentUser.userName);
      if (player) {
        Swal.fire('Ya tienes una reserva para este partido.', '', 'info');
        return;
      }
    }
  } catch (error) {
    console.log('No hay jugadores para este partido');
  }

  try {
    await partidoStore.reservePosition(partidoId.value, currentUser.idUser, selectedPlayer.value + 1);
    Swal.fire('Gracias por apuntarte', '¡Te esperamos allí!', 'success');
  } catch (error) {
    console.error('Error reserving position:', error);
  }

  await fetchPlayers();
};

const handleUnreservePosition = async () => {
  const currentUser = getCurrentUser();
  if (currentUser === null) {
    Swal.fire('Por favor, inicia sesión antes de realizar una cancelación.', '', 'warning');
    return;
  }

  try {
    const usuarios = await partidoStore.fetchUsuariosPartido(partidoId.value);
    const player = usuarios.find(player => player.userName === currentUser.userName);
    if (!player) {
      Swal.fire('No tienes una reserva para este partido.', '', 'info');
      return;
    }

    await partidoStore.unreservePosition(partidoId.value, currentUser.idUser);
    Swal.fire('Te has desapuntado del partido', '', 'info').then(() => {
      window.location.reload();
    });
  } catch (error) {
    console.error('Error canceling reservation:', error);
  }

  await fetchPlayers();
  selectedPlayer.value = null;
};

function changeSelected(index) {
  if (players.value[index].status === 'reserved') {
    Swal.fire('Esta posición ya está ocupada.', '', 'info');
    return;
  }
  selectedPlayer.value = selectedPlayer.value === index ? null : index;
}

onMounted(fetchPlayers);
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 0;
}

.card {
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  border-radius: 20px;
  box-shadow: 10px 10px 20px #bebebe, -10px -10px 20px #ffffff;
  padding: 40px;
  margin: 20px;
  text-align: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-10px);
}

.partido-image {
  max-width: 50%;
  height: auto;
  border-radius: 10px;
  margin: 20px 0;
}

.date-time {
  font-size: 1.2rem;
  margin: 10px 0;
  color: #555;
}

.stars {
  margin-top: 10px;
  margin-bottom: 20px;
}

.stars .fa-star {
  color: #FFD700;
  font-size: 24px;
  margin: 0 5px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  margin-top: 5%;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
  border: 2px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #fdfdfd;
}

.field-wrapper {
  position: relative;
  width: 312px;
  height: 210px;
}

.fieldgrid {
  display: grid;
  width: calc(100% - 60px);
  height: 100%;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%)
}

.fielditem {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  transition: scale 0.3s, opacity 0.3s;
}

.fielditem:nth-child(odd) {
  transform: scaleX(-1);
}

.fielditem .player-name {
  background: rgba(0,0,0,.5);
  color: white;
  padding: 0 8px;
  border-radius: 6px;
  bottom: 24px;
  font-size: 12px;
  font-weight: 500;
  left: calc(50% - 6px);
  translate: -50% 0;
  text-transform: capitalize;
  transition: background 0.3s;
  pointer-events: none;
  position: absolute;
}

.fielditem:nth-child(odd) .player-name {
  transform: scaleX(-1);
}

.fielditem.reverse .player-name {
  font-weight: 600;
  text-transform: uppercase;
  transition: scale 0.3s, background 0.3s;
}

.player-name {
  margin-top: 5px;
  font-size: 1rem;
  color: #333;
  transition: color 0.3s;
}

.reverse-name {
  transform: rotate(0deg);
  margin-top: 15px;
}

.fielditem:hover .player-name {
  background: black;
  scale: 1.1;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.back-button,
.reserve-button,
.unreserve-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.unreserve-button {
  background-color: #ff0000;
}

.back-button:hover,
.reserve-button:hover,
.unreserve-button:hover {
  background-color: #0056b3;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.unreserve-button:hover {
  background-color: #880000;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}


h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  color: #222;
  text-shadow: 1px 1px 2px #bbb;
}

p {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 20px;
}

.fielditem span {
  margin-top: 5px;
  font-size: 1rem;
  color: #333;
  transition: color 0.3s;
}
</style>
