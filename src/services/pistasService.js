const API_URL = 'http://localhost:5025';

export const fetchPistas = async () => {
    try {
        const response = await fetch(`${API_URL}/Pista`);
        if (!response.ok) {
            throw new Error('Error fetching courts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching courts:', error);
        throw error;
    }
};

export const fetchSesiones = async (pistaId) => {
    try {
        const response = await fetch(`${API_URL}/Sesion/Pista/${pistaId}`);
        if (!response.ok) {
            throw new Error('Error fetching sesiones');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching sesiones:', error);
        throw error;
    }
};

export const createPista = async (pista) => {
    try {
        const response = await fetch(`${API_URL}/Pista`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pista)
        });
        if (!response.ok) {
            throw new Error('Error creating pista');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating pista:', error);
        throw error;
    }
};

export const updatePista = async (id, pista) => {
    try {
        const response = await fetch(`${API_URL}/Pista/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pista)
        });
        if (!response.ok) {
            throw new Error('Error updating pista');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating pista:', error);
        throw error;
    }
};

export const deletePista = async (id) => {
    try {
        const response = await fetch(`${API_URL}/Pista/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error deleting pista');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting pista:', error);
        throw error;
    }
};
