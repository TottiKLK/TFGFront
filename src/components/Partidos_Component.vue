<template>
  <div class="container">
    <h1>{{ partido.name }}</h1>
    <p>{{ partido.description }}</p>
    <div class="details">
      <div class="svg-container">
        <!-- SVG específico del partido -->
        <svg width="312" height="210" viewBox="0 0 312 210" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="312" height="210" fill="white"/>
          <rect x="7" y="7" width="298" height="196" stroke="black" stroke-width="2"/>
          <line x1="57" y1="8" x2="57" y2="202" stroke="black" stroke-width="2"/>
          <line x1="56" y1="105" x2="258" y2="105" stroke="black" stroke-width="2"/>
          <line x1="257" y1="8" x2="257" y2="202" stroke="black" stroke-width="2"/>
          <line x1="158" y1="-1.74846e-07" x2="158" y2="210" stroke="black" stroke-width="4"/>
        </svg>
      </div>
    </div>
    <button @click="goBack">Volver</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchPartidos } from '@/services/partidosService';

export default {
  name: 'PartidoDetailView',
  setup() {
    const partido = ref({});

    onMounted(async () => {
      const partidos = await fetchPartidos();
      const id = parseInt(this.$route.params.id);
      partido.value = partidos.find(p => p.idPartido === id);
    });

    const goBack = () => {
      this.$router.push({ name: 'ZonaPartidos' });
    };

    return { partido, goBack };
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
