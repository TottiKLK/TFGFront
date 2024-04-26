<template>
    <div class="home-container">
        <div class="background-blur"></div>
        <div class="call-to-action">
            <button @click="scrollToProducts">Ver productos</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeComponent',
    methods: {
        scrollToProducts() {
            const productsSection = this.$el.querySelector('#productos');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        },
    },
};
</script>

<style scoped>
.home-container {
    background-image: url('/src/assets/fondo.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    height: 900px;
    margin: 15vh auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    border: 3px solid black;
}

.background-blur {
    background-image: url('/src/assets/fondo.png');
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(8px);
    z-index: -1;
}

.call-to-action {
    background-color: #ffffff;
    color: #ffffff;
    border: none;
    padding: 0.8rem 1.6rem;
    cursor: pointer;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 1px;
    transition: background-color 0.3s, box-shadow 0.3s;
    position: relative;
    z-index: 1;
}

.call-to-action button {
    background-color: #f28d35;
    color: #ffffff;
    border: 2px solid #ffffff;
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.call-to-action button:hover,
.call-to-action button:focus {
    background-color: #ca7d2e;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
}
</style>