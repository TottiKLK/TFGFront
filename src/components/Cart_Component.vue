<template>
    <div class="cart-dropdown">
        <h3>Carrito de Compras</h3>
        <ul v-if="cart.length > 0">
            <li v-for="(product, index) in cart" :key="index">
                <img :src="product.image" :alt="product.name" class="cart-product-image" />
                <div>
                    <h4>{{ product.name }}</h4>
                    <p>{{ product.description }}</p>
                    <p>Cantidad: {{ product.quantity }}</p>
                    <button @click="removeFromCart(index)" class="remove-product-button">Eliminar</button>
                </div>
            </li>
        </ul>
        <p v-else>El carrito está vacío</p>
        <button @click="toggleCart" class="close-cart-button">Cerrar</button>
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
    top: 100px;
    right: 10px;
    width: 300px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    border-radius: 5px;
    z-index: 100;
    max-height: 500px; /* Limita la altura total del carrito */
    overflow-y: auto;  /* Añade desplazamiento vertical */
}

.cart-dropdown h3 {
    margin-top: 0;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.cart-dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cart-dropdown li {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.cart-product-image {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
}

.cart-dropdown p {
    margin: 0;
}

.close-cart-button {
    background-color: #2c3e50;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
}

.close-cart-button:hover {
    background-color: #e27635;
}
</style>
