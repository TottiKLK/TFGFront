<template>
    <div class="ds-panel">
        <h1>Gestión de Partidos</h1>
        <form @submit.prevent="nuevoPartido.idPartido ? editarPartido() : crearPartido()" class="partido-form">
            <div class="form-row">
                <input v-model="nuevoPartido.name" type="text" placeholder="Nombre del partido">
                <input v-model="nuevoPartido.description" type="text" placeholder="Descripción">
                <input v-model="nuevoPartido.duration" type="text" placeholder="Duración">
                <input v-model="nuevoPartido.date" type="datetime-local" placeholder="Fecha y hora">
                <input v-model="nuevoPartido.estrellas" type="number" placeholder="Estrellas" min="1" max="5">
                <button type="submit">{{ nuevoPartido.idPartido ? 'Editar Partido' : 'Crear Partido' }}</button>
            </div>
        </form>
        <div class="partido-item" v-for="partido in partidos" :key="partido.idPartido">
            <div class="detail-row">
                <p>Nombre: {{ partido.name }}</p>
                <p>Descripción: {{ partido.description }}</p>
                <p>Duración: {{ partido.duration }}</p>
                <p>Fecha: {{ new Date(partido.date).toLocaleString() }}</p>
                <p>Estrellas: {{ partido.estrellas }}</p>
                <button @click="cargarPartidoParaEdicion(partido)">Editar</button>
                <button @click="handleEliminarPartido(partido)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchPartidos, createPartido, updatePartido, deletePartido } from '@/services/partidosService.js';

export default {
    name: 'DashboardPanelPartidos',
    setup() {
        const partidos = ref([]);
        const nuevoPartido = ref({
            name: '', 
            description: '', 
            duration: '', 
            date: '', 
            estrellas: '', 
            idPartido: null
        });

        const cargarPartidos = async () => {
            try {
                partidos.value = await fetchPartidos();
            } catch (error) {
                console.error('Error al cargar los partidos:', error);
            }
        };

        const crearPartido = async () => {
            try {
                const partidoCreado = await createPartido(nuevoPartido.value);
                partidos.value.push(partidoCreado);
                nuevoPartido.value = { 
                    name: '', 
                    description: '', 
                    duration: '', 
                    date: '', 
                    estrellas: '', 
                    idPartido: null 
                };
            } catch (error) {
                console.error('Error al crear el partido:', error);
            }
        };

        const editarPartido = async () => {
            try {
                const response = await updatePartido(nuevoPartido.value.idPartido, nuevoPartido.value);
                if (response) {
                    const index = partidos.value.findIndex(p => p.idPartido === nuevoPartido.value.idPartido);
                    if (index !== -1) {
                        partidos.value[index] = { ...partidos.value[index], ...response };
                    }
                    nuevoPartido.value = { 
                        name: '', 
                        description: '', 
                        duration: '', 
                        date: '', 
                        estrellas: '', 
                        idPartido: null 
                    };
                } else {
                    console.error('La respuesta de la API está vacía');
                }
            } catch (error) {
                console.error('Error al editar el partido:', error);
            }
        };

        const handleEliminarPartido = async (partido) => {
            try {
                await deletePartido(partido.idPartido);
                partidos.value = partidos.value.filter(p => p.idPartido !== partido.idPartido);
            } catch (error) {
                console.error('Error al eliminar el partido:', error);
            }
        };

        const cargarPartidoParaEdicion = (partido) => {
            nuevoPartido.value = { ...partido };
        };

        onMounted(cargarPartidos);

        return {
            partidos,
            nuevoPartido,
            cargarPartidos,
            crearPartido,
            editarPartido,
            handleEliminarPartido,
            cargarPartidoParaEdicion
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

.partido-form .form-row,
.partido-item .detail-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
}

.input,
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

.partido-item {
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
