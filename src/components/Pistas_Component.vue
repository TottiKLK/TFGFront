<template>
    <div class="reservation-page">
        <div class="reservation-header">
            <h1>ZONA DE RESERVAS</h1>
        </div>
        <div class="courts-container">
            <div class="court-card" v-for="court in courts" :key="court.idPista">
                <div class="court-image">
                    <img :src="court.photo" alt="Court Image" />
                </div>
                <div class="court-info">
                    <h3>{{ court.name }}</h3>
                    <p>{{ court.description }}</p>
                    <p>Duración: {{ court.duration }}</p>
                    <p>Precio: {{ court.price }}€</p>
                    <p>Fecha: {{ new Date(court.date).toLocaleString() }}</p>
                    <select v-model="selectedSesiones[court.idPista]" @change="handleSessionChange(court.idPista)">
                        <option value="">Selecciona una sesión</option>
                        <option v-for="sesion in sesiones[court.idPista]" :key="sesion.idSesion" :value="sesion.idSesion">
                            {{ sesion.date }} - {{ sesion.duration }}
                        </option>
                    </select>
                    <button class="reserve-button" @click="reservar(court.idPista)">RESERVAR</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchPistas, fetchSesiones } from '@/services/pistasService.js';

export default {
    name: 'ReservationPage',
    setup() {
        const courts = ref([]);
        const sesiones = ref({});
        const selectedSesiones = ref({});

        const cargarPistas = async () => {
            try {
                courts.value = await fetchPistas();
                courts.value.forEach(court => {
                    fetchSesiones(court.idPista).then(data => {
                        sesiones.value[court.idPista] = data;
                    });
                });
            } catch (error) {
                console.error('Error fetching courts:', error);
            }
        };

        const handleSessionChange = (pistaId) => {
            console.log('Sesión seleccionada para la pista', pistaId, ':', selectedSesiones.value[pistaId]);
        };

        const reservar = (pistaId) => {
            const sesionId = selectedSesiones.value[pistaId];
            if (sesionId) {
                console.log(`Reserva realizada para la pista ${pistaId}, sesión ${sesionId}`);
                // Aquí puedes hacer la lógica de reserva (ej: llamada a la API)
            } else {
                console.log('Seleccione una sesión antes de reservar');
            }
        };

        onMounted(cargarPistas);

        return {
            courts,
            sesiones,
            selectedSesiones,
            cargarPistas,
            handleSessionChange,
            reservar
        };
    }
};
</script>

<style scoped>
.reservation-page {
    max-width: 1000px;
    margin: 0 auto;
    margin-top: 50px;
    text-align: center;
}

.reservation-header h1 {
    margin-bottom: 2rem;
    margin-top: 13%
}

.courts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.court-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.court-image img {
    width: 100%;
    height: auto;
    display: block;
}

.court-info {
    padding: 1rem;
}

.reserve-button {
    background-color: #004d40;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.reserve-button:hover {
    background-color: #02675b;
}
</style>
