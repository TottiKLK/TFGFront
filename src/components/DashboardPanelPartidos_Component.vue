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
import { usePartidoStore } from '@/stores/partidoStore';
import { storeToRefs } from 'pinia';

export default {
    name: 'DashboardPanelPartidos',
    setup() {
        const partidoStore = usePartidoStore();
        const { partidos, loading, error } = storeToRefs(partidoStore);

        const nuevoPartido = ref({
            name: '', 
            description: '', 
            duration: '', 
            date: '', 
            estrellas: '', 
            idPartido: null
        });

        const cargarPartidos = async () => {
            await partidoStore.fetchPartidos();
        };

        const crearPartido = async () => {
            await partidoStore.createPartido(nuevoPartido.value);
            resetNuevoPartido();
        };

        const editarPartido = async () => {
            await partidoStore.updatePartido(nuevoPartido.value.idPartido, nuevoPartido.value);
            resetNuevoPartido();
        };

        const handleEliminarPartido = async (partido) => {
            await partidoStore.deletePartido(partido.idPartido);
        };

        const cargarPartidoParaEdicion = (partido) => {
            nuevoPartido.value = { ...partido };
        };

        const resetNuevoPartido = () => {
            nuevoPartido.value = {
                name: '', 
                description: '', 
                duration: '', 
                date: '', 
                estrellas: '', 
                idPartido: null
            };
        };

        onMounted(cargarPartidos);

        return {
            partidos,
            nuevoPartido,
            cargarPartidos,
            crearPartido,
            editarPartido,
            handleEliminarPartido,
            cargarPartidoParaEdicion,
            loading,
            error
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
