import { defineStore } from 'pinia';
import {
  fetchPartidos,
  fetchPartido,
  createPartido,
  updatePartido,
  deletePartido,
  fetchUsuariosPartido,
  reservePosition
} from '@/services/partidosService.js';

export const usePartidoStore = defineStore('partido', {
  state: () => ({
    partidos: [],
    partido: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPartidos() {
      this.loading = true;
      this.error = null;
      try {
        this.partidos = await fetchPartidos();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchPartido(partidoId) {
      this.loading = true;
      this.error = null;
      try {
        this.partido = await fetchPartido(partidoId);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createPartido(partido) {
      this.loading = true;
      this.error = null;
      try {
        const nuevoPartido = await createPartido(partido);
        this.partidos.push(nuevoPartido);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updatePartido(partidoId, partido) {
      this.loading = true;
      this.error = null;
      try {
        const partidoActualizado = await updatePartido(partidoId, partido);
        const index = this.partidos.findIndex(p => p.idPartido === partidoId);
        if (index !== -1) {
          this.partidos[index] = partidoActualizado;
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deletePartido(partidoId) {
      this.loading = true;
      this.error = null;
      try {
        await deletePartido(partidoId);
        this.partidos = this.partidos.filter(p => p.idPartido !== partidoId);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async reservePosition(partidoId, usuarioId, position) {
      this.loading = true;
      this.error = null;
      try {
        await reservePosition(partidoId, usuarioId, position);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async fetchUsuariosPartido(partidoId) {
      this.loading = true;
      this.error = null;
      try {
        return await fetchUsuariosPartido(partidoId);
      } catch (error) {
        this.error = error;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
});
