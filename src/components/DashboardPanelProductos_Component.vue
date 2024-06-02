<template>
    <div class="ds-panel">
        <h1>Gestión de Productos</h1>
        <form @submit.prevent="nuevoProducto.idProduct ? editarProducto() : crearProducto()" class="producto-form">
            <div class="form-row">
                <input v-model="nuevoProducto.name_Product" type="text" placeholder="Nombre del producto" required>
                <input v-model="nuevoProducto.product_Description" type="text" placeholder="Descripción" required>
                <input v-model="nuevoProducto.product_Price" type="number" placeholder="Precio" required>
                <input v-model="nuevoProducto.product_Amount" type="number" placeholder="Cantidad" required>
                <input v-model="nuevoProducto.product_Image" type="text" placeholder="URL de la Imagen" required>
                <select v-model="nuevoProducto.idCategoria" required>
                    <option disabled value="">Seleccione una categoría</option>
                    <option value="1">Palas</option>
                    <option value="2">Accesorios</option>
                    <option value="3">Ropa</option>
                </select>
                <button type="submit">{{ nuevoProducto.idProduct ? 'Editar Producto' : 'Crear Producto' }}</button>
            </div>
        </form>
        <div class="producto-item" v-for="producto in productos" :key="producto.idProduct">
            <div class="detail-row">
                <img :src="producto.photo" alt="Imagen del producto" class="product-image">
                <p>Nombre: {{ producto.name_Product }}</p>
                <p>Descripción: {{ producto.product_Description }}</p>
                <p>Precio: {{ producto.product_Price }}€</p>
                <p>Cantidad: {{ producto.product_Amount }}</p>
                <p>Categoría: {{ convertCategoriaToString(producto.idCategoria) }}</p>
                <button @click="cargarProductoParaEdicion(producto)">Editar</button>
                <button @click="handleEliminarProducto(producto)">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { storeToRefs } from 'pinia';

export default {
    name: 'DashboardPanelProductos',
    setup() {
        const productStore = useProductStore();
        const { products, loading, error } = storeToRefs(productStore);
        
        const nuevoProducto = ref({
            name_Product: '', 
            product_Description: '', 
            product_Price: '', 
            product_Amount: '', 
            product_Image: '', 
            idCategoria: '', 
            idProduct: null
        });

        const cargarProductos = async () => {
            await productStore.fetchProducts();
        };

        const crearProducto = async () => {
            if (!nuevoProducto.value.name_Product || !nuevoProducto.value.product_Description || !nuevoProducto.value.product_Price || !nuevoProducto.value.product_Amount || !nuevoProducto.value.product_Image || !nuevoProducto.value.idCategoria) {
                console.error('Todos los campos son obligatorios');
                return;
            }
            await productStore.createProduct(nuevoProducto.value);
            resetNuevoProducto();
        };

        const editarProducto = async () => {
            if (!nuevoProducto.value.name_Product || !nuevoProducto.value.product_Description || !nuevoProducto.value.product_Price || !nuevoProducto.value.product_Amount || !nuevoProducto.value.product_Image || !nuevoProducto.value.idCategoria) {
                console.error('Todos los campos son obligatorios');
                return;
            }
            await productStore.updateProduct(nuevoProducto.value.idProduct, nuevoProducto.value);
            resetNuevoProducto();
        };

        const handleEliminarProducto = async (producto) => {
            await productStore.deleteProduct(producto.idProduct);
        };

        const cargarProductoParaEdicion = (producto) => {
            nuevoProducto.value = { ...producto };
        };

        const convertCategoriaToString = (idCategoria) => {
            switch (idCategoria) {
                case 1: return 'Palas';
                case 2: return 'Accesorios';
                case 3: return 'Ropa';
                default: return 'Desconocido';
            }
        };

        const resetNuevoProducto = () => {
            nuevoProducto.value = { 
                name_Product: '', 
                product_Description: '', 
                product_Price: '', 
                product_Amount: '', 
                product_Image: '', 
                idCategoria: '', 
                idProduct: null 
            };
        };

        onMounted(cargarProductos);

        return {
            productos: products,
            nuevoProducto,
            cargarProductos,
            crearProducto,
            editarProducto,
            handleEliminarProducto,
            cargarProductoParaEdicion,
            convertCategoriaToString,
            resetNuevoProducto,
            loading,
            error
        };
    },
};
</script>

<style scoped>
.ds-panel {
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.producto-form .form-row,
.producto-item .detail-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
}

input,
select,
button {
    flex-grow: 1;
    padding: 8px;
    margin: 0 2px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    background-color: #6c816d;
    color: white;
    cursor: pointer;
    white-space: nowrap;
}

button:hover {
    background-color: #45a049;
}

.producto-item {
    padding: 10px 0;
    border-top: 1px solid #ddd;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.detail-row p {
    margin: 0 5px;
    flex: 1 1 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.product-image {
    width: 100px;
    height: auto;
    border-radius: 5px;
    margin-right: 10px;
}
</style>
