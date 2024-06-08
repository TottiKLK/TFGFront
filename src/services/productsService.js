const API_URL = 'http://padelimapi.retocsv.es/Producto';

const getProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Error fetching products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const createProduct = async (productData) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error('Error creating product');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

const updateProduct = async (productId, productData) => {
    try {
        const response = await fetch(`${API_URL}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        if (!response.ok) {
            throw new Error('Error updating product');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/${productId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error deleting product');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

export { getProducts, createProduct, updateProduct, deleteProduct };
