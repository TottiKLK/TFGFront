import { defineStore } from 'pinia';

const API_URL = 'http://localhost:5025/Usuario';
const RESERVA_API_URL = 'http://localhost:5025/Reserva';

export const useUserStore = defineStore('user', {
    state: () => ({
        usuarios: [],
        currentUser: {},
        compras: [],
        reservas: []
    }),
    actions: {
        async fetchUsers() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Error fetching users');
                }
                this.usuarios = await response.json();
            } catch (error) {
                console.error('Error fetching users:', error);
                throw error;
            }
        },
        async createUser(userData) {
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
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formattedData)
                });
                if (!response.ok) {
                    throw new Error('Error creating user');
                }
                const data = await response.json();
                this.usuarios.push(data);
                return data;
            } catch (error) {
                console.error('Error creating user:', error);
                throw error;
            }
        },
        async updateUser(userId, userData) {
            try {
                const response = await fetch(`${API_URL}/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });
                if (!response.ok) {
                    throw new Error('Error updating user');
                }
                const data = await response.json();
                const index = this.usuarios.findIndex(u => u.idUser === userId);
                if (index !== -1) {
                    this.usuarios[index] = { ...this.usuarios[index], ...data };
                }
                return data;
            } catch (error) {
                console.error('Error updating user:', error);
                throw error;
            }
        },
        async deleteUser(userId) {
            try {
                const response = await fetch(`${API_URL}/${userId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Error deleting user');
                }
                this.usuarios = this.usuarios.filter(u => u.idUser !== userId);
            } catch (error) {
                console.error('Error deleting user:', error);
                throw error;
            }
        },
        async getUserPurchases(userId) {
            try {
                const response = await fetch(`${API_URL}/${userId}/compras`);
                if (!response.ok) {
                    throw new Error('Error fetching user purchases');
                }
                this.compras = await response.json();
            } catch (error) {
                console.error('Error fetching user purchases:', error);
                throw error;
            }
        },
        async getAllCompras() {
            try {
                const response = await fetch(`${API_URL}/compras`);
                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(`Error fetching all user purchases: ${errorDetails}`);
                }
                this.compras = await response.json();
            } catch (error) {
                console.error('Error fetching all user purchases:', error);
                throw error;
            }
        },
        async deleteUserPurchase(userId, compraId) {
            try {
                const response = await fetch(`${API_URL}/${userId}/compras/${compraId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Error deleting user purchase');
                }
                this.getUserPurchases(userId);
            } catch (error) {
                console.error('Error deleting user purchase:', error);
                throw error;
            }
        },
        async buyProducts(purchaseData) {
            try {
                const response = await fetch(`${API_URL}/comprar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idUser: purchaseData.userId,
                        productos: purchaseData.productos.map(product => ({
                            idProducto: product.productId,
                            cantidad: product.quantity
                        }))
                    })
                });
                if (!response.ok) {
                    throw new Error('Error buying products');
                }
                return await response.json();
            } catch (error) {
                console.error('Error buying products:', error);
                throw error;
            }
        },
        async getUserReservations(userId) {
            try {
                const response = await fetch(`${RESERVA_API_URL}/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Error fetching user reservations');
                }
                this.reservas = await response.json();
            } catch (error) {
                console.error('Error fetching user reservations:', error);
                throw error;
            }
        },
        async deleteUserReservation(reservationId) {
            try {
                const response = await fetch(`${RESERVA_API_URL}/${reservationId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Error deleting user reservation');
                }
                this.getUserReservations(this.currentUser.idUser);
            } catch (error) {
                console.error('Error deleting user reservation:', error);
                throw error;
            }
        }
    }
});
