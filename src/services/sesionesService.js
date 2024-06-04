// sesionesService.js
import axios from 'axios';

const API_URL = 'http://localhost:5025';

export const fetchSesiones = async () => {
  try {
    const response = await axios.get(`${API_URL}/Sesion`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sesiones:', error);
    throw error;
  }
};

export const createSesion = async (sesion) => {
  try {
    const response = await axios.post(`${API_URL}/Sesion`, sesion, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating sesion:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateSesion = async (id, sesion) => {
  try {
    const response = await axios.put(`${API_URL}/Sesion/${id}`, sesion, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Response from server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating sesion:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteSesion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/Sesion/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting sesion:', error.response ? error.response.data : error.message);
    throw error;
  }
};
