<template>
  <div class="products-section">
      <h1 class="title">Nuestros Productos</h1>
      <nav class="products-nav">
          <button v-for="category in categories" :key="category" :class="{ active: activeCategory === category }" @click="setActiveCategory(category)">
              {{ category }}
          </button>
          <img class="cart-icon" @click="toggleCart" src="@/assets/imagen_carrito.png" alt="Carrito de compras" />
      </nav>
      <div class="products-display">
          <div v-show="activeCategory === 'Palas'" class="product-category">
              <div class="product-card" v-for="product in filteredProducts.palas" :key="product.idProduct">
                  <img :src="product.photo" :alt="product.name_Product" class="product-image" />
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
                  <img :src="product.photo" :alt="product.name_Product" class="product-image" />
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
                  <img :src="product.photo" :alt="product.name_Product" class="product-image" />
                  <div class="product-info">
                      <h3 class="product-name">{{ product.name_Product }}</h3>
                      <p class="product-description">{{ product.product_Description }}</p>
                      <p class="product-price">{{ product.product_Price }}€</p>
                      <button @click="addToCart(product)" class="product-button">Añadir al carrito</button>
                  </div>
              </div>
          </div>
      </div>
      <ModalComponent :message="message" v-model:visible="showMessage" />
      <CartComponent :cart="cart" v-if="cartVisible" @toggle-cart="toggleCart" @remove-from-cart="removeFromCart" @buy-products="buyProducts" />
  </div>
</template>

<script>
import CartComponent from './Cart_Component.vue';
import ModalComponent from './PopupCarrito.vue';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { userService } from '@/services/userService.js';

export default {
  name: 'ProductsComponent',
  components: {
      CartComponent,
      ModalComponent
  },
  setup() {
      const productStore = useProductStore();
      const { products, loading, error } = storeToRefs(productStore);

      const categories = ref(['Palas', 'Accesorios', 'Ropa']);
      const activeCategory = ref('Palas');
      const filteredProducts = ref({
          palas: [],
          accesorios: [],
          ropa: []
      });
      const cart = ref([]);
      const cartVisible = ref(false);
      const showMessage = ref(false);
      const message = ref('');

      const setActiveCategory = (category) => {
          activeCategory.value = category;
          filterProducts();
      };

      const filterProducts = () => {
          filteredProducts.value.palas = products.value.filter(product => product.idCategoria === 1);
          filteredProducts.value.accesorios = products.value.filter(product => product.idCategoria === 2);
          filteredProducts.value.ropa = products.value.filter(product => product.idCategoria === 3);
      };

      const addToCart = (product) => {
          const cartProduct = cart.value.find(item => item.idProduct === product.idProduct);
          if (cartProduct) {
              cartProduct.quantity++;
          } else {
              cart.value.push({
                  idProduct: product.idProduct,
                  name: product.name_Product,
                  description: product.product_Description,
                  price: product.product_Price,
                  image: product.photo,
                  quantity: 1
              });
          }
          message.value = `${product.name_Product} añadido al carrito!`;
          showMessage.value = true;
          setTimeout(() => {
              showMessage.value = false;
          }, 3000);
      };

      const toggleCart = () => {
          cartVisible.value = !cartVisible.value;
      };

      const removeFromCart = (index) => {
          cart.value.splice(index, 1);
      };

      const buyProducts = async () => {
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          if (!currentUser) {
              alert('Debes iniciar sesión para realizar una compra');
              return;
          }

          try {
              const purchaseData = {
                  userId: currentUser.idUser,
                  productos: cart.value.map(product => ({
                      productId: product.idProduct,
                      quantity: product.quantity
                  }))
              };
              await userService.buyProducts(purchaseData);
              cart.value = [];
              message.value = 'Compra realizada con éxito';
              showMessage.value = true;
              setTimeout(() => {
                  showMessage.value = false;
              }, 3000);
          } catch (error) {
              console.error('Error al realizar la compra:', error);
          }
      };

      onMounted(async () => {
          await productStore.fetchProducts();
          filterProducts();
      });

      return {
          categories,
          activeCategory,
          filteredProducts,
          cart,
          cartVisible,
          showMessage,
          message,
          setActiveCategory,
          addToCart,
          toggleCart,
          removeFromCart,
          buyProducts,
          loading,
          error
      };
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
