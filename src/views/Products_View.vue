<template>
    <Navbar_Component />
    <div class="products-page">
        <Products @update-cart="updateCart" />
    </div>
    <FooterComponent />
</template>

<script>
import Navbar_Component from '../components/Navbar_Component.vue';
import FooterComponent from '../components/Footer_Component.vue';
import Products from '../components/Products_Component.vue';

export default {
    name: 'home_view',
    components: {
        Navbar_Component,
        Products,
        FooterComponent,
    },
    data() {
        return {
            cart: []
        };
    },
    methods: {
        updateCart(newCart) {
            this.cart = newCart;
        }
    }
};
</script>

<style scoped>
.products-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}
</style>
