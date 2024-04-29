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
                    </div>
                </div>
            </div>
            <div v-show="activeCategory === 'Accesorios'" class="product-category">
                <div class="product-card" v-for="product in accesorios" :key="product.id">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
                    </div>
                </div>
            </div>

            <div v-show="activeCategory === 'Ropa'" class="product-category">
                <div class="product-card" v-for="product in ropa" :key="product.id">
                    <img :src="product.image" :alt="product.name" class="product-image" />
                    <div class="product-info">
                        <h3 class="product-name">{{ product.name }}</h3>
                        <p class="product-description">{{ product.description }}</p>
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
    text-align: center;
    margin-top: 2rem;
    padding: 2rem 0;
}

.products-section h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
    text-transform: uppercase;
    font-weight: bold;
}

.products-nav {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.title {
    font-size: 2.5rem;
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.products-nav button {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.products-nav button.active,
.products-nav button:hover {
    border-color: #f28d35;
    background-color: #f28d35;
    color: #fff;
}

.products-display {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.product-card {
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    margin: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px;
}

.product-image {
    width: 100%;
    height: auto;
}

.product-info {
    padding: 1rem;
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
}
</style>