<template>
    <div class="register-container">
        <form @submit.prevent="register">
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required>
            <button type="submit">Register</button>
        </form>
        <button @click="cambiar">¿Ya tienes cuenta? Inicia sesión</button>
    </div>
</template>

<script>
export default {
    name: 'Register_Component',
    data() {
        return {
            email: '',
            password: '',
            confirmPassword: ''
        }
    },
    methods: {
        register() {
            if (this.password !== this.confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }
            console.log('Registrando con:', this.email, this.password);
        },
        cambiar() {
            this.$emit('cambio');
        }
    }
}
</script>

<style scoped>
html,
body {
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #333;
}

.register-container {
    width: 100%;
    max-width: 450px;
    padding: 40px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.register-container form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

input[type=email],
input[type=password],
button[type=submit] {
    padding: 16px;
    border: 1px solid #000000;
    border-radius: 5px;
    font-size: 18px;
    outline: none;
}

input[type=email],
input[type=password] {
    background: #eee;
}

button[type=submit] {
    background-color: #ff7f50;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: bold;
}

button[type=submit]:hover {
    background-color: #ff4500;
    border-color: #ff4500;
    transform: scale(1.05);
}

.register-container button:not([type="submit"]) {
    background: none;
    border: none;
    color: #ff7f50;
    margin-top: 20px;
    padding: 10px;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
}

.register-container button:not([type="submit"]):hover {
    color: #ff4500;
    font-weight: bold;
}

@media only screen and (max-width: 600px) {
    .register-container {
        width: 90%;
        margin: 0 5%;
    }
}
</style>
