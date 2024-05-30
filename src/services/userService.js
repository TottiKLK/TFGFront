import axios from 'axios';

const API_URL = 'http://localhost:5025/Usuario';

const userService = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserPurchases,
    deleteUserPurchase,
    buyProducts
};

async function getUsers() {
    try {
        const response = await axios.get(API_URL);
        console.log("Usuarios cargados:", response.data);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

async function createUser(userData) {
    if (!userData.userName || !userData.email || !userData.password || !userData.rol) {
        console.error("Todos los campos son obligatorios");
        return;
    }

    const formattedData = {
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
        rol: Number(userData.rol)
    };

    try {
        const response = await axios.post(API_URL, formattedData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

async function updateUser(userId, userData) {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

async function deleteUser(userId) {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

async function getUserPurchases(userId) {
    try {
        const response = await axios.get(`${API_URL}/${userId}/compras`);
        return response.data; // Devolver directamente los datos de la respuesta
    } catch (error) {
        handleError(error);
    }
}

async function deleteUserPurchase(userId, compraId) {
    try {
        const response = await axios.delete(`${API_URL}/${userId}/compras/${compraId}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

async function buyProducts(purchaseData) {
    try {
        const response = await axios.post(`${API_URL}/comprar`, {
            idUser: purchaseData.userId,
            productos: purchaseData.productos.map(product => ({
                idProducto: product.productId,
                cantidad: product.quantity
            }))
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
}

function handleError(error) {
    if (error.response) {
        throw error.response.data;
    } else if (error.request) {
        throw new Error('Sin respuesta.');
    } else {
        throw new Error('Error');
    }
}

export { userService };
