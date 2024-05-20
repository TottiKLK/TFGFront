<template>
    <div class="products-section">
        <h1 class="title">Nuestros Productos</h1>
        <nav class="products-nav">
            <button v-for="category in categories" :key="category" :class="{ active: activeCategory === category }"
                @click="activeCategory = category">
                {{ category }}
            </button>
            <img class="cart-icon" @click="toggleCart" src="@/assets/imagen_carrito.png" alt="Carrito de compras">
        </nav>
        <div class="products-display">
            <div v-show="activeCategory === 'Palas'" class="product-category">
                <div class="product-card" v-for="product in palas" :key="product.id">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                        <button @click="addToCart(product)" class="product-button">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div v-show="activeCategory === 'Accesorios'" class="product-category">
                <div class="product-card" v-for="product in accesorios" :key="product.id">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                        <button @click="addToCart(product)" class="product-button">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div v-show="activeCategory === 'Ropa'" class="product-category">
                <div class="product-card" v-for="product in ropa" :key="product.id">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                        <button @click="addToCart(product)" class="product-button">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showMessage" class="message">{{ message }}</div>
        <CartComponent :cart="cart" v-if="cartVisible" @toggle-cart="toggleCart" @remove-from-cart="removeFromCart" />
    </div>
</template>

<script>
import CartComponent from './Cart_Component.vue';

export default {
    name: 'ProductsComponent',
    components: {
        CartComponent
    },
    data() {
        return {
            categories: ['Palas', 'Accesorios', 'Ropa'],
            activeCategory: 'Palas',
            palas: [
                {
                    id: 1,
                    name: 'Pala Modelo Pro',
                    description: 'Una Pala para los jugadores más avanzados.',
                    image: require('@/assets/RaquetaPadel.jpg'),
                },
                {
                    id: 2,
                    name: 'Pala Iniciación',
                    description: 'Perfecta para empezar en el mundo del padel.',
                    image: require('@/assets/RaquetaPadel.jpg'),
                },
                {
                    id: 12,
                    name: 'Pala Iniciación',
                    description: 'Perfecta para empezar en el mundo del padel.',
                    image: require('@/assets/RaquetaPadel.jpg'),
                },
                {
                    id: 122,
                    name: 'Pala Iniciación',
                    description: 'Perfecta para empezar en el mundo del padel.',
                    image: require('@/assets/RaquetaPadel.jpg'),
                },
                {
                    id: 132,
                    name: 'Pala Iniciación',
                    description: 'Perfecta para empezar en el mundo del padel.',
                    image: require('@/assets/RaquetaPadel.jpg'),
                },
                {
                    id: 142,
                    name: 'Pala Iniciación',
                    description: 'Perfecta para empezar en el mundo del padel.',
                    image: require('@/assets/RaquetaPadel.jpg'),
                }
            ],
            accesorios: [
                {
                    id: 3,
                    name: 'Overgrip Comfort',
                    description: 'Mejora tu agarre y juego con el Overgrip Comfort, que proporciona una adherencia excepcional y una sensación suave al tacto.',
                    image: require('@/assets/accesorios.jpg'),
                },
                {
                    id: 4,
                    name: 'Antivibradores ShockFree',
                    description: 'Los Antivibradores ShockFree reducen las vibraciones del impacto y protegen tu brazo, permitiéndote jugar con mayor comodidad.',
                    image: require('@/assets/accesorios.jpg'),
                }
            ],
            ropa: [
                {
                    id: 6,
                    name: 'Camiseta TenisPro',
                    description: 'Mantente fresco en la cancha con la Camiseta TenisPro, fabricada con materiales que absorben la humedad y ofrecen máxima movilidad.',
                    image: require('@/assets/ropa.jpg'),
                },
                {
                    id: 7,
                    name: 'Falda Deportiva Ace',
                    description: 'Con su diseño elegante y tejido flexible, la Falda Deportiva Ace es perfecta para moverse libremente y con estilo.',
                    image: require('@/assets/ropa.jpg'),
                }
            ],
            cart: [],
            cartVisible: false,
            showMessage: false,
            message: ''
        };
    },
    methods: {
        addToCart(product) {
            const cartProduct = this.cart.find(item => item.id === product.id);
            if (cartProduct) {
                cartProduct.quantity++;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            this.message = `${product.name} añadido al carrito!`;
            this.showMessage = true;
            setTimeout(() => {
                this.showMessage = false;
            }, 3000);
        },
        toggleCart() {
            this.cartVisible = !this.cartVisible;
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
        }
    }
};
</script>

<style scoped>
.products-section {
    padding: 2rem;
    margin-top: 4%;
    text-align: center;
    background-color: #ffffff;
}

.title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-transform: uppercase;
    font-weight: bold;
}

.products-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.5rem;
}

.products-nav button {
    background-color: #ffffff;
    border: 2px solid #f28d35;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    margin: 0.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #f28d35;
    flex: 1 0 auto;
    max-width: 150px;
}

.products-nav button.active,
.products-nav button:hover {
    background-color: #f28d35;
    color: #fff;
}

.cart-icon {
    width: 40px;
    margin-left: 1rem;
    cursor: pointer;
}

.products-display {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.product-category {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.product-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 280px;
    margin: 1rem;
}

.product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.product-image {
    width: 100%;
    height: auto;
}

.product-info {
    padding: 1.5rem;
    text-align: center;
}

.product-name {
    font-size: 1.2rem;
    color: #333;
    margin: 0.5rem 0;
}

.product-description {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.product-button {
    background-color: #2c3e50;
    color: #ffffff;
    border: none;
    padding: 0.8rem 1.5rem;
    cursor: pointer;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
    text-transform: uppercase;
}

.product-button:hover {
    background-color: #e27635;
}

.message {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: opacity 0.3s ease;
}

@media (max-width: 768px) {
    .products-nav {
        flex-direction: column;
    }

    .products-nav button {
        margin: 0.5rem 0;
    }

    .products-display {
        flex-direction: column;
    }
}
</style>
