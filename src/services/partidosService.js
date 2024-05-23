import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5025/', 
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetchPartidos = async () => {
    try {
        const response = await apiClient.get('Partido');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los partidos:', error);
        throw error;
    }
};
