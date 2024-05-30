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