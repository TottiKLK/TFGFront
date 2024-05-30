import axios from 'axios';

const API_URL = 'http://localhost:5025';

export const fetchReservas = async () => {
    try {
        const response = await axios.get(`${API_URL}/Reserva`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reservas:', error);
        throw error;
    }
};

export const fetchReservasByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/Reserva/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reservas by user:', error);
        throw error;
    }
};

export const createReserva = async (reserva) => {
    try {
        const response = await axios.post(`${API_URL}/Reserva`, reserva);
        return response.data;
    } catch (error) {
        console.error('Error creating reserva:', error);
        throw error;
    }
};

export const updateReserva = async (id, reserva) => {
    try {
        const response = await axios.put(`${API_URL}/Reserva/${id}`, reserva);
        return response.data;
    } catch (error) {
        console.error('Error updating reserva:', error);
        throw error;
    }
};

export const deleteReserva = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/Reserva/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting reserva:', error);
        throw error;
    }
};
