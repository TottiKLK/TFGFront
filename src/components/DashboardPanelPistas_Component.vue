<template>
    <div class="ds-panel">
        <h1>Gestión de Pistas</h1>
        <form @submit.prevent="nuevaPista.idPista ? editarPista() : crearPista()" class="pista-form">
            <div class="form-row">
                <input v-model="nuevaPista.name" type="text" placeholder="Nombre de la pista">
                <input v-model="nuevaPista.description" type="text" placeholder="Descripción">
                <input v-model="nuevaPista.duration" type="text" placeholder="Duración">
                <input v-model="nuevaPista.price" type="number" placeholder="Precio">
                <input v-model="nuevaPista.date" type="datetime-local" placeholder="Fecha">
                <input v-model="nuevaPista.photo" type="text" placeholder="URL de la Imagen">
                <button type="submit">{{ nuevaPista.idPista ? 'Editar Pista' : 'Crear Pista' }}</button>
            </div>
        </form>
        <div class="pista-item" v-for="pista in pistas" :key="pista.idPista">
            <div class="detail-row">
                <img :src="pista.photo" alt="Imagen de la pista" class="pista-image">
                <p>Nombre: {{ pista.name }}</p>
                <p>Descripción: {{ pista.description }}</p>
                <p>Duración: {{ pista.duration }}</p>
                <p>Precio: {{ pista.price }}€</p>
                <p>Fecha: {{ new Date(pista.date).toLocaleString() }}</p>
                <button @click="cargarPistaParaEdicion(pista)">Editar</button>
                <button @click="handleEliminarPista(pista)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchPistas, createPista, updatePista, deletePista } from '@/services/pistasService.js';

export default {
    name: 'DashboardPanelPistas',
    setup() {
        const pistas = ref([]);
        const nuevaPista = ref({
            name: '',
            description: '',
            duration: '',
            price: '',
            date: '',
            photo: '',
            idPista: null
        });

        const cargarPistas = async () => {
            try {
                pistas.value = await fetchPistas();
            } catch (error) {
                console.error('Error al cargar las pistas:', error);
            }
        };

        const crearPista = async () => {
            try {
                const pistaCreada = await createPista(nuevaPista.value);
                pistas.value.push(pistaCreada);
                nuevaPista.value = { name: '', description: '', duration: '', price: '', date: '', photo: '', idPista: null };
            } catch (error) {
                console.error('Error al crear la pista:', error);
            }
        };

        const editarPista = async () => {
            try {
                const response = await updatePista(nuevaPista.value.idPista, nuevaPista.value);
                if (response) {
                    const index = pistas.value.findIndex(p => p.idPista === nuevaPista.value.idPista);
                    if (index !== -1) {
                        pistas.value[index] = { ...pistas.value[index], ...response };
                    }
                    nuevaPista.value = { name: '', description: '', duration: '', price: '', date: '', photo: '', idPista: null };
                } else {
                    console.error('La respuesta de la API está vacía');
                }
            } catch (error) {
                console.error('Error al editar la pista:', error);
            }
        };

        const handleEliminarPista = async (pista) => {
            try {
                await deletePista(pista.idPista);
                pistas.value = pistas.value.filter(p => p.idPista !== pista.idPista);
            } catch (error) {
                console.error('Error al eliminar la pista:', error);
            }
        };

        const cargarPistaParaEdicion = (pista) => {
            nuevaPista.value = { ...pista };
        };

        onMounted(cargarPistas);

        return {
            pistas,
            nuevaPista,
            cargarPistas,
            crearPista,
            editarPista,
            handleEliminarPista,
            cargarPistaParaEdicion
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

.pista-form .form-row,
.pista-item .detail-row {
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

.pista-item {
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

.pista-image {
    width: 100px;
    height: auto;
    border-radius: 5px;
    margin-right: 10px;
}
</style>
