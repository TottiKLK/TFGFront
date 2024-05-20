<template>
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
                        <button @click="removeFromCart(index)" class="remove-product-button">Eliminar</button>
                    </div>
                </div>
            </li>
        </ul>
        <p v-else class="empty-cart-message">El carrito está vacío</p>
    </div>
</template>

<script>
export default {
    name: 'CartComponent',
    props: {
        cart: Array
    },
    methods: {
        toggleCart() {
            this.$emit('toggle-cart');
        },
        removeFromCart(index) {
            this.$emit('remove-from-cart', index);
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
    max-height: 500px; /* Limits the total height of the cart */
    overflow-y: auto;  /* Adds vertical scroll */
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

.cart-item-details p {
    margin: 0.25rem 0;
    font-size: 0.875rem;
    color: #666;
}

.cart-item-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
}

.remove-product-button:hover {
    background-color: #c65d2d;
}

.empty-cart-message {
    font-size: 1rem;
    color: #333;
    text-align: center;
    margin: 2rem 0;
}
</style>
