const API_URL = 'http://padelimapi.retocsv.es';

export async function fetchPartidos() {
  try {
    const response = await fetch(`${API_URL}/Partido`);
    if (!response.ok) throw new Error('Error fetching partidos');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los partidos:', error);
    throw error;
  }
}

export async function fetchPartido(partidoId) {
  try {
    const response = await fetch(`${API_URL}/Partido/${partidoId}`);
    if (!response.ok) throw new Error(`Error fetching partido ${partidoId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener el partido ${partidoId}:`, error);
    throw error;
  }
}

export async function fetchUsuariosPartido(partidoId) {
  try {
    const response = await fetch(`${API_URL}/Partido/${partidoId}/usuarios`);
    if (!response.ok) throw new Error(`Error fetching usuarios for partido ${partidoId}`);
    return await response.json();
  } catch (error) {
    console.error(`Error al obtener los usuarios del partido ${partidoId}:`, error);
    throw error;
  }
}

export async function reservePosition(partidoId, usuarioId, position) {
  try {
    const response = await fetch(`${API_URL}/Partido/${partidoId}/usuarios/${usuarioId}?position=${position}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Error reserving position');
    return await response.json();
  } catch (error) {
    console.error('Error al reservar la posición:', error);
    throw error;
  }
}

export async function createPartido(partido) {
  try {
    const response = await fetch(`${API_URL}/Partido`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(partido)
    });
    if (!response.ok) throw new Error('Error creating partido');
    return await response.json();
  } catch (error) {
    console.error('Error al crear el partido:', error);
    throw error;
  }
}

export async function updatePartido(id, partido) {
  try {
    const response = await fetch(`${API_URL}/Partido/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(partido)
    });
    if (!response.ok) throw new Error('Error updating partido');
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar el partido:', error);
    throw error;
  }
}

export async function deletePartido(id) {
  try {
    const response = await fetch(`${API_URL}/Partido/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error deleting partido');
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar el partido:', error);
    throw error;
  }
}

export async function DeleteUsuarioFromPartido(partidoId, usuarioId) {
  try {
    const response = await fetch(`${API_URL}/Partido/${partidoId}/usuarios/${usuarioId}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error deleting usuario from partido');
    return await response.json();
  } catch (error) {
    console.error('Error al eliminar al usuario del partido:', error);
    throw error;
  }
}
