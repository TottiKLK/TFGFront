<template>
  <div class="card" v-if="partido">
    <h1>{{ partido.name }}</h1>
    <p>{{ partido.description }}</p>
    <div class="content-wrapper">
      <div class="field-wrapper">
        <Field_Component />
        <div class="fieldgrid">
          <div v-for="(availablePosition, index) in availablePositions" :key="index" class="fielditem">
            <Player_Component @toggle="() => changeSelected(index)" :isSelected="selectedPlayer === index"
              :notAvailable="!availablePosition" />
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
const availablePositions = ref([true, true, true, true]);
const selectedPlayer = ref(null);

const fetchPlayers = async () => {
  await partidoStore.fetchPartido(partidoId.value);

  try {
    const players = await partidoStore.fetchUsuariosPartido(partidoId.value);
    players.forEach((player) => {
      availablePositions.value[player.position - 1] = false; 
    });

    const currentUser = getCurrentUser();
    const player = players.find(player => player.userName === currentUser.userName);
    if (player) {
      selectedPlayer.value = player.position - 1; 
    }
  } catch (error) {
    console.log('No hay jugadores para este partido');
  }
};

const handleReservePosition = async () => {
  if (selectedPlayer.value === null) {
    alert('Seleccione una posición para reservar.');
    return;
  }

  const currentUser = getCurrentUser();
  if (currentUser === null) {
    alert('Por favor, inicia sesión antes de realizar una reserva.');
    return;
  }

  try {
    const players = await partidoStore.fetchUsuariosPartido(partidoId.value);
    if (players) {
      const player = players.find(player => player.userName === currentUser.userName);
      if (player) {
        alert('Ya tienes una reserva para este partido.');
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
    alert('Por favor, inicia sesión antes de realizar una cancelación.');
    return;
  }

  try {
    const players = await partidoStore.fetchUsuariosPartido(partidoId.value);
    const player = players.find(player => player.userName === currentUser.userName);
    if (!player) {
      alert('No tienes una reserva para este partido.');
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
  if (!availablePositions.value[index]) {
    alert('Esta posición ya está ocupada.');
    return;
  }
  selectedPlayer.value = selectedPlayer.value === index ? null : index;
}

onMounted(fetchPlayers);
</script>

<style scoped>
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
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  position: absolute;
  top: 0;
  left: 0;
}

.fielditem {
  display: flex;
  align-items: center;
  margin: 10%;
}

.fielditem:nth-child(odd) {
  transform: scaleX(-1);
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

.back-button:hover,
.reserve-button:hover,
.unreserve-button:hover {
  background-color: #0056b3;
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

</style>
