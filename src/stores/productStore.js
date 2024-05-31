import { defineStore } from 'pinia';
import axios from 'axios';

const API_URL = 'http://localhost:5025/Producto';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(API_URL);
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createProduct(productData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(API_URL, productData);
        this.products.push(response.data);
      } catch (error) {
        console.error('Error creating product:', error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateProduct(productId, productData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(`${API_URL}/${productId}`, productData);
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
          this.products[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating product:', error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deleteProduct(productId) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`${API_URL}/${productId}`);
        this.products = this.products.filter(product => product.id !== productId);
      } catch (error) {
        console.error('Error deleting product:', error);
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
