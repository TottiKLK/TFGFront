import axios from 'axios';

const API_URL = 'http://localhost:5025';

export async function fetchPartidos() {
  try {
    const response = await axios.get(`${API_URL}/Partido`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los partidos:', error);
    throw error;
  }
}

export async function fetchPartido(partidoId) {
  try {
    const response = await axios.get(`${API_URL}/Partido/${partidoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el partido ${partidoId}:`, error);
    throw error;
  }
}

export async function fetchUsuariosPartido(partidoId) {
  try {
    const response = await axios.get(`${API_URL}/Partido/${partidoId}/usuarios`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los usuarios del partido ${partidoId}:`, error);
    throw error;
  }
}

export async function reservePosition(partidoId, usuarioId, position) {
  try {
    const response = await axios.post(`${API_URL}/Partido/${partidoId}/usuarios/${usuarioId}`, { position }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al reservar la posición:', error.response ? error.response.data : error.message);
    throw error;
  }
}
