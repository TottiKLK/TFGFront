<template>
    <div class="products-section">
        <h1 class="title">NUESTROS PRODUCTOS</h1>
        <nav class="products-nav">
            <button v-for="category in categories" :key="category" :class="{ active: activeCategory === category }"
                @click="activeCategory = category">
                {{ category }}
            </button>
        </nav>
        <div class="products-display">
            <div v-show="activeCategory === 'Palas'" class="product-category">
                <div class="product-card" v-for="product in palas" :key="product.id">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                        <button @click="goToProductDetail(product.id)" class="product-button">Ver detalle</button>
                    </div>
                </div>
            </div>
            <div v-show="activeCategory === 'Accesorios'" class="product-category">
                <div class="product-card" v-for="product in accesorios" :key="product.id">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                        <button @click="goToProductDetail(product.id)" class="product-button">Ver detalle</button>
                    </div>
                </div>
            </div>

            <div v-show="activeCategory === 'Ropa'" class="product-category">
                <div class="product-card" v-for="product in ropa" :key="product.id">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                        <button @click="goToProductDetail(product.id)" class="product-button">Ver detalle</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProductsSectionComponent',
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
                    id: 2,
                    name: 'Pala Iniciación',
                    description: 'Perfecta para empezar en el mundo del padel.',
                    image: require('@/assets/RaquetaPadel.jpg'),
                },
            ],
            accesorios: [
                {
                    id: 1,
                    name: 'Overgrip Comfort',
                    description: 'Mejora tu agarre y juego con el Overgrip Comfort, que proporciona una adherencia excepcional y una sensación suave al tacto.',
                    image: require('@/assets/accesorios.jpg'),
                },
                {
                    id: 2,
                    name: 'Antivibradores ShockFree',
                    description: 'Los Antivibradores ShockFree reducen las vibraciones del impacto y protegen tu brazo, permitiéndote jugar con mayor comodidad.',
                    image: require('@/assets/accesorios.jpg'),
                },
                {
                    id: 2,
                    name: 'Antivibradores ShockFree',
                    description: 'Los Antivibradores ShockFree reducen las vibraciones del impacto y protegen tu brazo, permitiéndote jugar con mayor comodidad.',
                    image: require('@/assets/accesorios.jpg'),
                },
            ],
            ropa: [
                {
                    id: 1,
                    name: 'Camiseta TenisPro',
                    description: 'Mantente fresco en la cancha con la Camiseta TenisPro, fabricada con materiales que absorben la humedad y ofrecen máxima movilidad.',
                    image: require('@/assets/ropa.jpg'),
                },
                {
                    id: 2,
                    name: 'Falda Deportiva Ace',
                    description: 'Con su diseño elegante y tejido flexible, la Falda Deportiva Ace es perfecta para moverse libremente y con estilo.',
                    image: require('@/assets/ropa.jpg'),
                },
                {
                    id: 1,
                    name: 'Camiseta TenisPro',
                    description: 'Mantente fresco en la cancha con la Camiseta TenisPro, fabricada con materiales que absorben la humedad y ofrecen máxima movilidad.',
                    image: require('@/assets/ropa.jpg'),
                },
            ],
        };
    },
};
</script>

<style scoped>
.products-section {
    padding-top: 4rem;
    text-align: center;
}

.products-section h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: #333;
    text-transform: uppercase;
    font-weight: bold;
}

.products-nav {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
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

.title {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #2c3e50;
    font-weight: 600;
    font-family: 'Helvetica Neue', sans-serif;
}

.products-nav button {
    background-color: transparent;
    border: 2px solid #f28d35;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 500;
    margin: 0 1rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #f28d35;
}

.products-nav button.active,
.products-nav button:hover {
    background-color: #f28d35;
    color: #fff;
}

.products-display {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
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
    margin-top: 0;
}

.product-description {
    color: #666;
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .products-display {
        flex-direction: column;
        align-items: center;
    }

    .product-card {
        max-width: 100%;
    }

    .products-nav button {
        font-size: 1rem;
        padding: 0.5rem 0.5rem;
    }
}
</style>