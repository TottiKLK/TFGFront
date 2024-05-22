import axios from 'axios';

const API_URL = 'http://localhost:5025/Usuario';

const userService = {
    async getUsers() {
        try {
            const response = await axios.get(`${API_URL}`);
            console.log("Usuarios cargados:", response.data);  
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },


    async createUser(userData) {
        try {
            // Asegúrate de que todos los campos requeridos están presentes
            if (!userData.nombre || !userData.email || !userData.password || !userData.rol) {
                console.error("Todos los campos son obligatorios");
                return;  // Detener la ejecución si algún campo requerido está vacío
            }
    
            // Formatear los datos correctamente
            const formattedData = {
                userName: userData.nombre,  // Asegúrate de que el nombre de la propiedad coincide con el backend
                email: userData.email,
                password: userData.password,
                rol: Number(userData.rol)  // Convertir el rol a número si es necesario
            };
    
            const response = await axios.post(`${API_URL}`, formattedData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
    

    async updateUser(userId, userData) {
        try {
            const response = await axios.put(`${API_URL}/${userId}`, userData);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    async deleteUser(userId) {
        try {
            const response = await axios.delete(`${API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
};

function handleError(error) {
    if (error.response) {
        throw error.response.data;
    } else if (error.request) {
        throw new Error('No response was received from the server.');
    } else {
        throw new Error('Error setting up the request.');
    }
}

export { userService };
