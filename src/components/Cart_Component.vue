<template>
  <div>
    <div class="cart-dropdown">
      <div class="cart-header">
        <h3>Carrito de Compras</h3>
        <button @click="toggleCart" class="close-cart-button">Cerrar</button>
      </div>
      <ul v-if="cart.length > 0">
        <li v-for="(product, index) in cart" :key="index" class="cart-item">
          <img :src="product.image" :alt="product.name" class="cart-product-image" />
          <div class="cart-item-details">
            <h4>{{ product.name }}</h4>
            <p>{{ product.description }}</p>
            <div class="cart-item-actions">
              <p>Cantidad: {{ product.quantity }}</p>
              <p>Precio: {{ product.price }}€</p>
              <button @click="removeFromCart(index)" class="remove-product-button">Eliminar</button>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="empty-cart-message">El carrito está vacío</p>
      <p v-if="cart.length > 0" class="total-price">Total: {{ total }}€</p>
      <button v-if="cart.length > 0" @click="showPurchaseForm" class="buy-button">Comprar</button>
    </div>

    <div v-if="showForm" class="purchase-form-overlay">
      <div class="purchase-form-container">
        <h2>Formulario de Compra</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="address">Dirección:</label>
            <input type="text" id="address" v-model="form.address" required />
          </div>
          <div class="form-group">
            <label for="payment">Método de Pago:</label>
            <select id="payment" v-model="form.payment" required>
              <option value="credit_card">Tarjeta de Crédito</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Transferencia Bancaria</option>
            </select>
          </div>
          <button type="submit" class="submit-button">Confirmar Compra</button>
          <button type="button" @click="closePurchaseForm" class="cancel-button">Cancelar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: 'CartComponent',
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showForm: false,
      form: {
        name: '',
        email: '',
        address: '',
        payment: ''
      }
    };
  },
  computed: {
    total() {
      return this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    }
  },
  methods: {
    toggleCart() {
      this.$emit('toggle-cart');
    },
    removeFromCart(index) {
      this.$emit('remove-from-cart', index);
    },
    showPurchaseForm() {
      this.showForm = true;
    },
    closePurchaseForm() {
      this.showForm = false;
    },
    async submitForm() {
      const templateParams = {
        name: this.form.name,
        email: this.form.email,
        address: this.form.address,
        payment: this.form.payment,
        total: this.total,
        cart: this.cart.map(product => `${product.name} (Cantidad: ${product.quantity}, Precio: ${product.price}€)`).join(', ')
      };

      try {
        await emailjs.send('TFG_gmail', 'template_k7jhm9k', templateParams, 'ivcF6aL9qoqeXdN0W');
        alert('Correo enviado con éxito');
        this.closePurchaseForm();
        this.toggleCart();
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        alert('Error al enviar el correo');
      }
    }
  }
};
</script>


<style scoped>
.cart-dropdown {
  position: fixed;
  top: 20%;
  right: 10px;
  width: 320px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 10px;
  z-index: 1000;
  max-height: 500px;
  overflow-y: auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5rem;
}

.cart-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.cart-header .close-cart-button {
  background-color: #e27635;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
}

.cart-header .close-cart-button:hover {
  background-color: #c65d2d;
}

.cart-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 1rem;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-product-image {
  width: 60px;
  height: 60px;
  margin-right: 1rem;
  border-radius: 5px;
  object-fit: cover;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h4 {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.cart-item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.cart-item-actions p {
  margin: 0;
  font-size: 0.875rem;
  color: #333;
}

.remove-product-button {
  background-color: #e27635;
  color: #ffffff;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;
}

.remove-product-button:hover {
  background-color: #c65d2d;
}

.total-price {
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
}

.buy-button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #e27635;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #c65d2d;
}

.empty-cart-message {
  font-size: 1rem;
  color: #333;
  text-align: center;
  margin: 2rem 0;
}

.purchase-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.purchase-form-container {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
}

.purchase-form-container h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.submit-button,
.cancel-button {
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #e27635;
  color: #ffffff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.submit-button:hover,
.cancel-button:hover {
  background-color: #c65d2d;
}

.cancel-button {
  background-color: #aaa;
}

.cancel-button:hover {
  background-color: #888;
}
</style>
