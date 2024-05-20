<template>
  <div class="container">
    <h1>Zona de Partidos</h1>
    <div class="partidos-grid">
      <div class="partido-card" v-for="(match, index) in matches" :key="index">
        <img :src="require(`@/assets/${match.image}`)" alt="Imagen del partido" class="partido-image" />
        <h2>{{ match.title }}</h2>
        <p>{{ match.description }}</p>
        <router-link :to="{ name: 'PartidoDetailView', params: { id: index } }">
          <button>Ver detalle del partido</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const matches = ref([
  { title: 'Partido 1', description: 'Descripción del Partido 1', image: 'p1.jpg' },
  { title: 'Partido 2', description: 'Descripción del Partido 2', image: 'p2.jpg' },
  { title: 'Partido 3', description: 'Descripción del Partido 3', image: 'p3.jpg' },
  { title: 'Partido 4', description: 'Descripción del Partido 4', image: 'p1.jpg' },
  // Añadir más partidos según sea necesario
]);
</script>

<style scoped>
.container {
  margin-top: 5%;
  text-align: center;
  padding: 20px;
}

.partidos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.partido-card {
  border: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.partido-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
