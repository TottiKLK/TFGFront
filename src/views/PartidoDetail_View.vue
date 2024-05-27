<template>
  <div class="card" v-if="partido">
    <h1>{{ partido.name }}</h1>
    <p>{{ partido.description }}</p>
    <div class="content-wrapper">
      <div class="field-wrapper">
        <Field_Component />
        <div class="fieldgrid">
          <div v-for="(availablePosition, index) in availablePositions" :key="index" class="fielditem">
            <Player_Component @toggle="() => changeSelected(index)"
              :isSelected="selectedPlayer === index" :notAvailable="!availablePosition" />
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="reserve-button" @click="reservePosition">Reservar</button>
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
import axios from 'axios';
import Field_Component from '@/components/Field_Component.vue';
import Player_Component from '@/components/Player_Component.vue';

const route = useRoute();
const partidoId = computed(() => parseInt(route.params.id, 10));
const partido = ref(null);
const availablePositions = ref([true, true, true, false]); // Initially all positions are available
const selectedPlayer = ref(null);

const fetchPartidoDetails = async () => {
  try {
    const response = await axios.get(`http://localhost:5025/Partido/${partidoId.value}`);
    partido.value = response.data;
    if (partido.value && partido.value.positions) {
      console.log(partido.value.positions); // Añadir este log para verificar los datos
      // Assuming partido.value has an array `positions` indicating the availability
      availablePositions.value = [true, true, true, true]; // Reset the positions
      partido.value.positions.forEach(pos => {
        availablePositions.value[pos.index] = !pos.ocupado;
      });
    } else {
      console.error('No positions found in the response.');
    }
  } catch (error) {
    console.error('Error fetching partido details:', error);
  }
};

const reservePosition = async () => {
  if (selectedPlayer.value === null) {
    alert('Seleccione una posición para reservar.');
    return;
  }
  try {
    const userId = 1; // Replace with the actual user ID
    await axios.post(`http://localhost:5025/Partido/${partidoId.value}/usuarios/${userId}`, {
      position: selectedPlayer.value
    });
    alert('Reserva realizada con éxito.');
    await fetchPartidoDetails(); // Refresh the details to update the UI
  } catch (error) {
    console.error('Error reserving position:', error);
    alert('Error al reservar la posición.');
  }
};

function changeSelected(index) {
  if (!availablePositions.value[index]) {
    alert('Esta posición ya está ocupada.');
    return;
  }
  selectedPlayer.value = selectedPlayer.value === index ? null : index;
}

onMounted(fetchPartidoDetails);
</script>

<style scoped>
/* Global Styles */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f9;
  color: #333;
  margin: 0;
  padding: 0;
}

/* Card Styles */
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

/* Container Styles */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  margin-top: 5%;
}

/* Content Wrapper Styles */
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

/* Field Wrapper Styles */
.field-wrapper {
  position: relative;
  width: 312px;
  height: 210px;
}

/* Field Grid Styles */
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

/* Field Item Styles */
.fielditem {
  display: flex;
  align-items: center;
  margin: 10%;
}

.fielditem:nth-child(odd) {
  transform: scaleX(-1);
}

/* Button Styles */
.buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.back-button, .reserve-button {
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

.back-button:hover, .reserve-button:hover {
  background-color: #0056b3;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

/* Title and Description Styles */
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
