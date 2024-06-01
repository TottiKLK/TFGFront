<template>
    <div class="ds-panel">
        <h1>Gestión de Usuarios</h1>
        <form @submit.prevent="nuevoUsuario.idUser ? editarUsuario() : crearUsuario()" class="usuario-form">
            <div class="form-row">
                <input v-model="nuevoUsuario.userName" type="text" placeholder="Nombre del usuario">
                <input v-model="nuevoUsuario.email" type="email" placeholder="Email">
                <input v-model="nuevoUsuario.password" type="password" placeholder="Contraseña">
                <select v-model="nuevoUsuario.rol">
                    <option disabled value="">Seleccione un rol</option>
                    <option value="1">Admin</option>
                    <option value="2">Owner</option>
                    <option value="3">User</option>
                </select>
                <button type="submit">{{ nuevoUsuario.idUser ? 'Editar Usuario' : 'Crear Usuario' }}</button>
            </div>
        </form>
        <div class="usuario-item" v-for="usuario in usuarios" :key="usuario.idUser">
            <div class="detail-row">
                <p>Nombre: {{ usuario.userName }}</p>
                <p>Email: {{ usuario.email }}</p>
                <p>Contraseña: {{ usuario.password }}</p>
                <p>Rol: {{ convertRolToString(usuario.rol) }}</p>
                <button @click="cargarUsuarioParaEdicion(usuario)">Editar</button>
                <button @click="handleEliminarUsuario(usuario)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';

export default {
    name: 'DashboardPanelUsuarios',
    setup() {
        const userStore = useUserStore();
        const nuevoUsuario = ref({ userName: '', email: '', password: '', rol: '', idUser: null });

        const cargarUsuarios = async () => {
            try {
                await userStore.fetchUsers();
            } catch (error) {
                console.error('Error al cargar los usuarios:', error);
            }
        };

        const crearUsuario = async () => {
            try {
                await userStore.createUser(nuevoUsuario.value);
                nuevoUsuario.value = { userName: '', email: '', password: '', rol: '', idUser: null };
            } catch (error) {
                console.error('Error al crear el usuario:', error);
            }
        };

        const editarUsuario = async () => {
            try {
                console.log("Datos antes de actualizar:", nuevoUsuario.value);
                const response = await userStore.updateUser(nuevoUsuario.value.idUser, nuevoUsuario.value);
                console.log("Respuesta de la API:", response); // Verificar la respuesta de la API

                if (response) {
                    const index = userStore.usuarios.findIndex(u => u.idUser === nuevoUsuario.value.idUser);
                    if (index !== -1) {
                        userStore.usuarios[index] = { ...userStore.usuarios[index], ...response };
                    }
                    nuevoUsuario.value = { userName: '', email: '', password: '', rol: '', idUser: null };
                    console.log("Usuario actualizado:", response);
                } else {
                    console.error('La respuesta de la API está vacía');
                }
            } catch (error) {
                console.error('Error al editar el usuario:', error);
            }
        };

        const handleEliminarUsuario = async (usuario) => {
            try {
                await userStore.deleteUser(usuario.idUser);
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        };

        const cargarUsuarioParaEdicion = (usuario) => {
            nuevoUsuario.value = { ...usuario };
        };

        const convertRolToString = (rol) => {
            switch (rol) {
                case 1: return 'Admin';
                case 2: return 'Owner';
                default: return 'User';
            }
        };

        onMounted(cargarUsuarios);

        return {
            usuarios: userStore.usuarios,
            nuevoUsuario,
            cargarUsuarios,
            crearUsuario,
            editarUsuario,
            handleEliminarUsuario,
            cargarUsuarioParaEdicion,
            convertRolToString
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

.usuario-form .form-row,
.usuario-item .detail-row {
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

.usuario-item {
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
