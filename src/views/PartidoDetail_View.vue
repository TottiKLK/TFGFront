<template>
  <div class="card" v-if="match">
    <h1>{{ match.title }}</h1>
    <p>{{ match.description }}</p>
    <div class="content-wrapper">
      <img :src="require(`@/assets/${match.image}`)" alt="Imagen del partido" class="partido-image" />
      <div class="field-wrapper">
        <Field_Component />
        <div class="fieldgrid">
          <div v-for="(availablePosition, index) in availablePositions" :key="index" class="fielditem">
            <Player_Component @toggle="() => changeSelected(index)"
              :isSelected="selectedPlayer === index" :notAvailable="availablePosition" />
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <button class="reserve-button">Reservar</button>
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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Field_Component from '@/components/Field_Component.vue';
import Player_Component from '@/components/Player_Component.vue';

const route = useRoute();
const matchId = computed(() => parseInt(route.params.id, 10)); // Asegúrate de que es un número

const matches = ref([
  { title: 'Partido 1', description: 'Descripción del Partido 1', image: 'p1.jpg' },
  { title: 'Partido 2', description: 'Descripción del Partido 2', image: 'p2.jpg' },
  { title: 'Partido 3', description: 'Descripción del Partido 3', image: 'p3.jpg' },
  { title: 'Partido 4', description: 'Descripción del Partido 4', image: 'p1.jpg' },
  // Añadir más partidos según sea necesario
]);

const match = computed(() => matches.value[matchId.value]);

const availablePositions = ref([true, true, false, false]);
const selectedPlayer = ref(null);

function changeSelected(index) {
  if (selectedPlayer.value === index) {
    selectedPlayer.value = null;
  } else {
    selectedPlayer.value = index;
  }
}
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
  width: 312px; /* Ajusta el tamaño según sea necesario */
  height: 210px; /* Ajusta el tamaño según sea necesario */
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

/* Image Styles */
.partido-image {
  width: 312px; /* Ajusta el tamaño según sea necesario */
  height: 210px; /* Ajusta el tamaño según sea necesario */
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.partido-image:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
