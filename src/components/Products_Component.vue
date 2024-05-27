<template>
    <div class="products-section">
        <h1 class="title">Nuestros Productos</h1>
        <nav class="products-nav">
            <button v-for="category in categories" :key="category" :class="{ active: activeCategory === category }"
                @click="setActiveCategory(category)">
                {{ category }}
            </button>
            <img class="cart-icon" @click="toggleCart" src="@/assets/imagen_carrito.png" alt="Carrito de compras">
        </nav>
        <div class="products-display">
            <div v-show="activeCategory === 'Palas'" class="product-category">
                <div class="product-card" v-for="product in filteredProducts.palas" :key="product.idProduct">
                    <img :src="product.product_Image" :alt="product.name_Product" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name_Product }}</h3>
                        <p class="product-description">{{ product.product_Description }}</p>
                        <p class="product-price">{{ product.product_Price }}€</p>
                        <button @click="addToCart(product)" class="product-button">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div v-show="activeCategory === 'Accesorios'" class="product-category">
                <div class="product-card" v-for="product in filteredProducts.accesorios" :key="product.idProduct">
                    <img :src="product.product_Image" :alt="product.name_Product" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name_Product }}</h3>
                        <p class="product-description">{{ product.product_Description }}</p>
                        <p class="product-price">{{ product.product_Price }}€</p>
                        <button @click="addToCart(product)" class="product-button">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            <div v-show="activeCategory === 'Ropa'" class="product-category">
                <div class="product-card" v-for="product in filteredProducts.ropa" :key="product.idProduct">
                    <img :src="product.product_Image" :alt="product.name_Product" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name_Product }}</h3>
                        <p class="product-description">{{ product.product_Description }}</p>
                        <p class="product-price">{{ product.product_Price }}€</p>
                        <button @click="addToCart(product)" class="product-button">Añadir al carrito</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showMessage" class="message">{{ message }}</div>
        <CartComponent :cart="cart" v-if="cartVisible" @toggle-cart="toggleCart" @remove-from-cart="removeFromCart"
            @buy-products="buyProducts" />
    </div>
</template>

<script>
import CartComponent from './Cart_Component.vue';
import { getProducts } from '@/services/productsService.js';
import { userService } from '@/services/userService.js';  // Importa userService

export default {
    name: 'ProductsComponent',
    components: {
        CartComponent
    },
    data() {
        return {
            categories: ['Palas', 'Accesorios', 'Ropa'],
            activeCategory: 'Palas',
            products: [],
            filteredProducts: {
                palas: [],
                accesorios: [],
                ropa: []
            },
            cart: [],
            cartVisible: false,
            showMessage: false,
            message: ''
        };
    },
    async created() {
        try {
            const products = await getProducts();
            this.products = products;
            this.filterProducts();
        } catch (error) {
            console.error('Error loading products:', error);
        }
    },
    methods: {
        setActiveCategory(category) {
            this.activeCategory = category;
            this.filterProducts();
        },
        filterProducts() {
            this.filteredProducts.palas = this.products.filter(product => product.idCategoria === 1);
            this.filteredProducts.accesorios = this.products.filter(product => product.idCategoria === 2);
            this.filteredProducts.ropa = this.products.filter(product => product.idCategoria === 3);
        },
        addToCart(product) {
            const cartProduct = this.cart.find(item => item.idProduct === product.idProduct);
            if (cartProduct) {
                cartProduct.quantity++;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
            this.message = `${product.name_Product} añadido al carrito!`;
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
        },
        async buyProducts() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (!currentUser) {
                alert('Debes iniciar sesión para realizar una compra');
                return;
            }

            try {
                const purchaseData = {
                    userId: currentUser.idUser,
                    productos: this.cart.map(product => ({
                        productId: product.idProduct,
                        quantity: product.quantity
                    }))
                };
                await userService.buyProducts(purchaseData);  // Usa userService.buyProducts
                this.cart = [];
                this.message = 'Compra realizada con éxito';
                this.showMessage = true;
                setTimeout(() => {
                    this.showMessage = false;
                }, 3000);
            } catch (error) {
                console.error('Error al realizar la compra:', error);
            }
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

.product-price {
    color: #e27635;
    font-size: 1rem;
    margin-bottom: 0.5rem;
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
