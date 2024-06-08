import { defineStore } from 'pinia';

const API_URL = 'http://padelimapi.retocsv.es';

export const usePistaStore = defineStore('pista', {
  state: () => ({
    pistas: [],
  }),
  actions: {
    async fetchPistas() {
      try {
        const response = await fetch(`${API_URL}/Pista`);
        const data = await response.json();
        this.pistas = data;
      } catch (error) {
        console.error('Error fetching courts:', error);
        throw error;
      }
    },
    async createPista(pista) {
      try {
        const response = await fetch(`${API_URL}/Pista`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pista)
        });
        const data = await response.json();
        this.pistas.push(data);
      } catch (error) {
        console.error('Error creating pista:', error);
        throw error;
      }
    },
    async updatePista(id, pista) {
      try {
        const response = await fetch(`${API_URL}/Pista/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pista)
        });
        const data = await response.json();
        const index = this.pistas.findIndex(p => p.idPista === id);
        if (index !== -1) {
          this.pistas[index] = { ...this.pistas[index], ...data };
        }
      } catch (error) {
        console.error('Error updating pista:', error);
        throw error;
      }
    },
    async deletePista(id) {
      try {
        await fetch(`${API_URL}/Pista/${id}`, {
          method: 'DELETE'
        });
        this.pistas = this.pistas.filter(p => p.idPista !== id);
      } catch (error) {
        console.error('Error deleting pista:', error);
        throw error;
      }
    },
  },
});
