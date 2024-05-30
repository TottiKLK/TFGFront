<template>
    <div class="ds-panel">
        <h1>Gestión de Sesiones</h1>
        <form @submit.prevent="nuevaSesion.idSesion ? editarSesion() : crearSesion()" class="sesion-form">
            <div class="form-row">
                <input v-model="nuevaSesion.sesionTime" type="text" placeholder="Hora de la sesión (HH:MM)">
                <select v-model="nuevaSesion.idPista">
                    <option disabled value="">Seleccione una pista</option>
                    <option v-for="pista in pistas" :key="pista.idPista" :value="pista.idPista">
                        {{ pista.name }}
                    </option>
                </select>
                <button type="submit">{{ nuevaSesion.idSesion ? 'Editar Sesión' : 'Crear Sesión' }}</button>
            </div>
        </form>
        <div class="sesion-item" v-for="sesion in sesiones" :key="sesion.idSesion">
            <div class="detail-row">
                <p>Hora: {{ sesion.sesionTime }}</p>
                <p>Pista: {{ getPistaName(sesion.idPista) }}</p>
                <button @click="cargarSesionParaEdicion(sesion)">Editar</button>
                <button @click="handleEliminarSesion(sesion)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchSesiones, createSesion, updateSesion, deleteSesion } from '@/services/sesionesService.js';
import { fetchPistas } from '@/services/pistasService.js';

export default {
    name: 'DashboardPanelSesiones',
    setup() {
        const sesiones = ref([]);
        const pistas = ref([]);
        const nuevaSesion = ref({
            sesionTime: '',
            idPista: '',
            idSesion: null
        });

        const cargarSesiones = async () => {
            try {
                const response = await fetchSesiones();
                console.log('Sesiones obtenidas:', response);
                sesiones.value = response.map(s => ({
                    ...s,
                    sesionTime: s.sesionTime ? String(s.sesionTime) : 'Hora no disponible'
                }));
                console.log('Sesiones procesadas:', sesiones.value);
            } catch (error) {
                console.error('Error al cargar las sesiones:', error);
            }
        };

        const cargarPistas = async () => {
            try {
                pistas.value = await fetchPistas();
            } catch (error) {
                console.error('Error al cargar las pistas:', error);
            }
        };

        const crearSesion = async () => {
            try {
                const sesionData = {
                    sesionTime: nuevaSesion.value.sesionTime.trim(),
                    idPista: nuevaSesion.value.idPista
                };
                console.log('Datos de la sesión a crear:', sesionData);
                const sesionCreada = await createSesion(sesionData);
                sesiones.value.push(sesionCreada);
                nuevaSesion.value = { sesionTime: '', idPista: '', idSesion: null };
            } catch (error) {
                console.error('Error al crear la sesión:', error.response ? error.response.data : error.message);
            }
        };

        const editarSesion = async () => {
            try {
                const response = await updateSesion(nuevaSesion.value.idSesion, {
                    sessionTime: nuevaSesion.value.sessionTime.trim(), 
                    idPista: nuevaSesion.value.idPista
                });
                if (response) {
                    const index = sesiones.value.findIndex(s => s.idSesion === nuevaSesion.value.idSesion);
                    if (index !== -1) {
                        sesiones.value[index] = { ...sesiones.value[index], ...response };
                    }
                    nuevaSesion.value = { sessionTime: '', idPista: '', idSesion: null };
                } else {
                    console.error('La respuesta de la API está vacía');
                }
            } catch (error) {
                console.error('Error al editar la sesión:', error);
            }
        };

        const handleEliminarSesion = async (sesion) => {
            try {
                await deleteSesion(sesion.idSesion);
                sesiones.value = sesiones.value.filter(s => s.idSesion !== sesion.idSesion);
            } catch (error) {
                console.error('Error al eliminar la sesión:', error);
            }
        };

        const cargarSesionParaEdicion = (sesion) => {
            nuevaSesion.value = { ...sesion };
        };

        const getPistaName = (idPista) => {
            const pista = pistas.value.find(p => p.idPista === idPista);
            return pista ? pista.name : 'Desconocido';
        };

        onMounted(() => {
            cargarSesiones();
            cargarPistas();
        });

        return {
            sesiones,
            pistas,
            nuevaSesion,
            cargarSesiones,
            crearSesion,
            editarSesion,
            handleEliminarSesion,
            cargarSesionParaEdicion,
            getPistaName
        };
    }
};
</script>

<style scoped>
.ds-panel {
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: none;
}

.sesion-form .form-row,
.sesion-item .detail-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
}

input,
select,
button {
    flex-grow: 1;
    padding: 8px;
    margin: 0 2px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    background-color: #6c816d;
    color: white;
    cursor: pointer;
    white-space: nowrap;
}

button:hover {
    background-color: #45a049;
}

.sesion-item {
    padding: 10px 0;
    border-top: 1px solid #ddd;
}

.detail-row p {
    margin: 0 5px;
    flex: 1 1 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
