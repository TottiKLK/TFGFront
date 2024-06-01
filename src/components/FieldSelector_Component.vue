<template>
  <div class="container">
    <h1>Zona de Partidos</h1>
    <div class="partidos-grid">
      <div class="partido-card" v-for="(match, index) in partidos" :key="index">
        <img :src="match.imageUrl" alt="Imagen del partido" class="partido-image" />
        <h2>{{ match.name }}</h2>
        <p>{{ match.description }}</p>
        <p>Duración: {{ match.duration }}</p>
        <p>Fecha: {{ new Date(match.date).toLocaleString() }}</p>
        <p>Estrellas: {{ match.estrellas }}</p>
        <router-link :to="{ name: 'PartidoDetailView', params: { id: match.idPartido } }">
          <button>Ver detalle del partido</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { usePartidoStore } from '@/stores/partidoStore';
import { storeToRefs } from 'pinia';

export default {
  name: 'ZonaPartidos',
  setup() {
    const partidoStore = usePartidoStore();
    const { partidos } = storeToRefs(partidoStore);

    onMounted(async () => {
      await partidoStore.fetchPartidos();
    });

    return { partidos };
  }
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: auto;
  overflow: hidden;
  text-align: center;
  padding: 20px;
  margin-top: 9%;
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
  border-radius: 10px 10px 0 0; 
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
