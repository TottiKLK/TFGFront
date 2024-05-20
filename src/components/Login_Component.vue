<template>
    <div class="login-container">
      <div v-if="showLoginForm">
        <h2>Iniciar sesion</h2>
        <form @submit.prevent="login">
          <input v-model="userData.name" type="text" placeholder="Nombre de usuario" required>
          <input v-model="userData.password" type="password" placeholder="Contraseña" required>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button @click="switchForm">¿No tienes cuenta? Regístrate</button>
        <p v-if="error" class="error">{{ errorMessage }}</p>
      </div>
      <div v-else>
        <!-- Formulario de Registro -->
        <h2>Registro</h2>
        <form @submit.prevent="register">
          <input v-model="userData.name" type="text" placeholder="Nombre" required>
          <input v-model="userData.email" type="email" placeholder="Email" required>
          <input v-model="userData.password" type="password" placeholder="Contraseña" required>
          <button type="submit">Registrarse</button>
        </form>
        <button @click="switchForm">¿Ya tienes cuenta? Inicia sesión</button>
        <p v-if="error" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { login, register } from '@/services/authService';
  
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
        showLoginForm: true, // Inicializado en true para mostrar la página de inicio de sesión por defecto
      };
    },
    methods: {
      async login() {
        if (this.validateForm()) {
          try {
            const loginRequest = {
              UserName: this.userData.name,
              Password: this.userData.password,
            };
            const userResponse = await login(loginRequest);
            if (userResponse && userResponse.rol !== undefined) {
              localStorage.setItem('currentUser', JSON.stringify(userResponse));
              if (Number(userResponse.rol) === 1) {
                this.$router.push('/intranet');
              } else if (Number(userResponse.rol) === 2) {
                this.$router.push('/');
              }
            } else {
              this.error = true;
              this.errorMessage = 'Credenciales incorrectas.';
            }
          } catch (error) {
            this.handleError(error);
          }
        }
      },
      async register() {
        if (this.validateForm()) {
          try {
            const userData = {
              UserName: this.userData.name,
              Email: this.userData.email,
              Password: this.userData.password,
              Rol: 2
            };
            await register(userData);
            alert('Registro exitoso, por favor inicie sesión.');
            this.switchForm(); // Cambia de nuevo al formulario de login
          } catch (error) {
            this.handleError(error);
          }
        }
      },
      switchForm() {
        this.showLoginForm = !this.showLoginForm;
      },
      validateForm() {
        if (!this.userData.name || !this.userData.password || (!this.showLoginForm && !this.userData.email)) {
          this.error = true;
          this.errorMessage = 'Todos los campos son obligatorios.';
          return false;
        }
        this.error = false;
        return true;
      },
      handleError(error) {
        this.error = true;
        this.errorMessage = 'Error al procesar la solicitud: ' + (error.response && error.response.data.message || 'Un error ha ocurrido');
        console.error('Error:', error);
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
