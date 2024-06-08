import { defineStore } from 'pinia';

const API_URL = 'http://padelimapi.retocsv.es/Producto';

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
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error fetching products');
        this.products = await response.json();
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
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error('Error creating product');
        const newProduct = await response.json();
        this.products.push(newProduct);
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
        const response = await fetch(`${API_URL}/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error('Error updating product');
        const updatedProduct = await response.json();
        const index = this.products.findIndex(product => product.id === productId);
        if (index !== -1) {
          this.products[index] = updatedProduct;
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
        const response = await fetch(`${API_URL}/${productId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error deleting product');
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
