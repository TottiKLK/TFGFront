import axios from 'axios';

const API_URL = 'http://padelimapi.retocsv.es/Usuario';

async function login(loginData) {
    try {
        const API_URL = 'http://padelimapi.retocsv.es/UsuarioLogin/login';
        const response = await axios.post(API_URL, loginData);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || JSON.stringify(error.response.data));
        } else {
            throw new Error('Error al comunicarse con el servidor');
        }
    }
}

async function register(userData) {
    try {
        const payload = {
            UserName: userData.UserName,
            Email: userData.Email,
            Password: userData.Password,
            Rol: userData.Rol === 'Admin' ? 1 : userData.Rol === 'Owner' ? 2 : 3, 
            Reservas: []
        };
        const response = await axios.post(`${API_URL}`, payload);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || JSON.stringify(error.response.data));
        } else {
            throw new Error('Error al comunicarse con el servidor');
        }
    }
}

function logout() {
    localStorage.removeItem('user');
}

function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export { login, register, logout, getCurrentUser };
