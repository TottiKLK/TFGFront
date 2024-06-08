<template>
    <div class="form-container">
        <h2>Registro</h2>
        <form @submit.prevent="register">
            <input v-model="userData.name" type="text" placeholder="Nombre" required>
            <input v-model="userData.email" type="email" placeholder="Email" required>
            <input v-model="userData.password" type="password" placeholder="Contraseña" required>
            <button type="submit">Registrarse</button>
        </form>
        <button @click="switchToLogin">¿Ya tienes cuenta? Inicia sesión</button>
        <p v-if="error" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { register } from '@/services/authService';

export default {
    data() {
        return {
            userData: {
                name: '',
                email: '',
                password: '',
                rol: 2,  
            },
            error: false,
            errorMessage: '',
        };
    },
    methods: {
        async register() {
            if (this.validateForm()) {
                try {
                    const userData = {
                        UserName: this.userData.name,
                        Email: this.userData.email,
                        Password: this.userData.password,
                        Rol: this.userData.rol
                    };
                    const response = await register(userData);  
                    alert('Registro exitoso, por favor inicie sesión.');
                    console.log(response);  
                    this.switchToLogin();
                } catch (error) {
                    this.error = true;
                    this.errorMessage = 'No se pudo crear la cuenta: ' + (error.response ? error.response.data.message : error.message);
                    console.error('Error al registrar:', error);
                }
            }
        },
        switchToLogin() {
            this.$emit('switch-form');  
        },
        validateForm() {
            if (!this.userData.name || !this.userData.email || !this.userData.password) {
                this.error = true;
                this.errorMessage = 'Todos los campos son obligatorios.';
                return false;
            }
            if (!this.userData.email.includes('@')) {
                this.error = true;
                this.errorMessage = 'Por favor ingrese un correo electrónico válido.';
                return false;
            }
            return true;
        }
    },
}
</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 40px auto;
}

input[type="email"],
input[type="password"],
input[type="text"] {
    width: 94%;
    padding: 10px;
    margin: 0.5rem 0;
    border: 2px solid #cccccc;
    border-radius: 5px;
    transition: border-color 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
    border-color: #FF4500;
    box-shadow: 0 0 8px rgba(255, 69, 0, 0.2);
    outline: none;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #FF4500;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 1%;
    margin-top: 2%;
}

button:hover {
    background-color: #E04000;
    transform: scale(1.05);
}

button+button {
    margin-top: 15px;
}

.error {
    color: #D8000C;
    background-color: #FFD2D2;
    border-radius: 5px;
    padding: 10px;
    margin-top: 15px;
    width: 90%;
    text-align: center;
}
</style>