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
                    <p>Precio: {{ court.price }}€</p>
                    <p>Fecha: {{ new Date(court.date).toLocaleString() }}</p>
                    <select v-model="selectedSesiones[court.idPista]" @change="handleSessionChange(court.idPista)"
                        class="session-select">
                        <option value="">Selecciona una sesión</option>
                        <option v-for="sesion in sesionesFiltradas(court.idPista)" :key="sesion.idSesion"
                            :value="sesion.idSesion">
                            {{ sesion.sesionTime }}
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
                const sesionesPromises = courts.value.map(async (court) => {
                    const response = await fetchSesiones(court.idPista);
                    sesiones.value[court.idPista] = response.map(s => ({
                        ...s,
                        sesionTime: s.sesionTime ? String(s.sesionTime) : 'Hora no disponible'
                    }));
                });
                await Promise.all(sesionesPromises);
            } catch (error) {
                console.error('Error fetching courts or sesiones:', error);
            }
        };

        const sesionesFiltradas = (pistaId) => {
            return sesiones.value[pistaId] || [];
        };

        const handleSessionChange = (pistaId) => {
            console.log('Sesión seleccionada para la pista', pistaId, ':', selectedSesiones.value[pistaId]);
        };

        const reservar = (pistaId) => {
            const sesionId = selectedSesiones.value[pistaId];
            if (sesionId) {
                console.log(`Reserva realizada para la pista ${pistaId}, sesión ${sesionId}`);
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
            sesionesFiltradas,
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
    font-family: Arial, sans-serif;
}

.reservation-header h1 {
    margin-bottom: 2rem;
    margin-top: 13%;
    color: #333;
}

.courts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
}

.court-card {
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.2s ease-in-out;
}

.court-card:hover {
    transform: translateY(-5px);
}

.court-image img {
    width: 100%;
    height: auto;
    display: block;
}

.court-info {
    padding: 1.5rem;
    text-align: left;
}

.court-info h3 {
    margin-bottom: 0.5rem;
    color: #333;
}

.court-info p {
    margin-bottom: 0.5rem;
    color: #666;
}

.session-select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 1rem;
    color: #333;
}

.session-select:focus {
    outline: none;
    border-color: #007bff;
}

.reserve-button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
}

.reserve-button:hover {
    background-color: #0056b3;
}
</style>
