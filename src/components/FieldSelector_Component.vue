<template>
  <div class="container">
    <h1>Zona de Partidos</h1>
    <!-- Añadir el campo de búsqueda con animaciones y estilos -->
    <input v-model="searchQuery" @input="filterPartidos" placeholder="Buscar por descripción" class="search-bar animated-input" />
    <div class="partidos-grid">
      <div class="partido-card animated-card" v-for="(match, index) in filteredPartidos" :key="index">
        <img :src="match.photo" alt="Imagen del partido" class="partido-image" />
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
import { onMounted, ref, computed } from 'vue';
import { usePartidoStore } from '@/stores/partidoStore';
import { storeToRefs } from 'pinia';

export default {
  name: 'ZonaPartidos',
  setup() {
    const partidoStore = usePartidoStore();
    const { partidos } = storeToRefs(partidoStore);
    const searchQuery = ref('');

    onMounted(async () => {
      await partidoStore.fetchPartidos();
    });

    const filteredPartidos = computed(() => {
      return partidos.value.filter(match => 
        match.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const filterPartidos = () => {
      filteredPartidos.value;
    };

    return { partidos, searchQuery, filteredPartidos, filterPartidos };
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.container {
  width: 80%;
  margin: auto;
  overflow: hidden;
  text-align: center;
  padding: 20px;
  margin-top: 9%;
}

.search-bar {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search-bar:focus {
  border-color: #50a4c5;
  box-shadow: 0 0 15px #f28d35;
}

.animated-input {
  animation: fadeIn 0.5s ease-in-out;
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
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.partido-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 15px #f28d35;
}

.partido-image {
  width: 100%;
  height: auto;
  border-radius: 10px 10px 0 0; 
}

button {
  width: 100%;
  padding: 10px;
  background-color: #f28d35;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease-in-out;
  text-decoration: none !important;
}

button:hover {
  background-color: #fd7600;
}

.animated-card {
  animation: slideIn 0.5s ease-in-out;
}
</style>