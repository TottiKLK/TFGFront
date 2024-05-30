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
            <select v-model="selectedSesiones[court.idPista]" @change="handleSessionChange(court.idPista)" class="session-select">
              <option value="">Selecciona una sesión</option>
              <option v-for="sesion in sesionesFiltradas(court.idPista)" :key="sesion.idSesion" :value="sesion.idSesion">
                {{ sesion.sesionTime }}
              </option>
            </select>
            <button class="reserve-button" @click="reservar(court.idPista)">RESERVAR</button>
          </div>
        </div>
      </div>
      <div v-if="showPopup" class="popup">
        <div class="popup-content">
          <h2>¡Reserva Completada!</h2>
          <p>Revisa tu perfil para más detalles.</p>
          <button @click="closePopup">Cerrar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { fetchPistas, fetchSesiones } from '@/services/pistasService.js';
  import { createReserva } from '@/services/reservasService.js';
  
  export default {
    name: 'ReservationPage',
    setup() {
      const courts = ref([]);
      const sesiones = ref({});
      const selectedSesiones = ref({});
      const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')));
      const showPopup = ref(false);
  
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
  
      const reservar = async (pistaId) => {
        const sesionId = selectedSesiones.value[pistaId];
        if (sesionId) {
          try {
            const reserva = {
              idUser: currentUser.value.idUser,
              idSesion: sesionId,
              reservationDate: new Date().toISOString(),
              reservationPrice: courts.value.find(court => court.idPista === pistaId).price.toString()
            };
            console.log('Reserva a enviar:', reserva); 
            await createReserva(reserva);
            console.log(`Reserva realizada para la pista ${pistaId}, sesión ${sesionId}`);
            showPopup.value = true;
          } catch (error) {
            console.error('Error creating reserva:', error);
            alert('Error al realizar la reserva');
          }
        } else {
          console.log('Seleccione una sesión antes de reservar');
          alert('Seleccione una sesión antes de reservar');
        }
      };
  
      const closePopup = () => {
        showPopup.value = false;
      };
  
      onMounted(cargarPistas);
  
      return {
        courts,
        sesiones,
        selectedSesiones,
        sesionesFiltradas,
        handleSessionChange,
        reservar,
        showPopup,
        closePopup
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
  
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .popup-content {
    background-color: #fff;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    animation: popIn 0.3s ease-in-out;
  }
  
  .popup-content h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .popup-content p {
    margin-bottom: 1.5rem;
    color: #666;
  }
  
  .popup-content button {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .popup-content button:hover {
    background-color: #0056b3;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes popIn {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }
  </style>
  