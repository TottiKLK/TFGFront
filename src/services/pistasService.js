import axios from 'axios';

const API_URL = 'http://localhost:5025'; 

export const fetchPistas = async () => {
    try {
        const response = await axios.get(`${API_URL}/Pista`);
        return response.data;
    } catch (error) {
        console.error('Error fetching courts:', error);
        throw error;
    }
};

export const fetchSesiones = async (pistaId) => {
    try {
        const response = await axios.get(`${API_URL}/Sesion`, {
            params: {
                pistaId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching sesiones:', error);
        throw error;
    }
};

export const createPista = async (pista) => {
    try {
        const response = await axios.post(`${API_URL}/Pista`, pista);
        return response.data;
    } catch (error) {
        console.error('Error creating pista:', error);
        throw error;
    }
};

export const updatePista = async (id, pista) => {
    try {
        const response = await axios.put(`${API_URL}/Pista/${id}`, pista);
        return response.data;
    } catch (error) {
        console.error('Error updating pista:', error);
        throw error;
    }
};

export const deletePista = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Pista/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting pista:', error);
        throw error;
    }
};
