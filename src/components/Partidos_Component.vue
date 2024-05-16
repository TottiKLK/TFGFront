<template>
    <div class="container">
        <div class="zona-partidos">
            <div class="card" v-for="index in 8" :key="index">
                <h3>Pista {{ index }}</h3>
                <p>Court Reservation</p>
                <button>Reservar</button>
                <div class="svg-container">
                    <svg width="250" height="150" xmlns="http://www.w3.org/2000/svg">
                        <!-- Fondo de la pista -->
                        <rect width="250" height="150" fill="forestgreen" stroke="black" stroke-width="15" />
                        <!-- Líneas de la pista -->
                        <!-- Línea central -->
                        <line x1="125" y1="9" x2="125" y2="141" stroke="red" stroke-width="3" />
                        <!-- Líneas de servicio -->
                        <line x1="40" y1="75" x2="210" y2="75" stroke="white" stroke-width="3" />
                        <line x1="40" y1="9" x2="40" y2="141" stroke="white" stroke-width="3" />
                        <line x1="210" y1="9" x2="210" y2="141" stroke="white" stroke-width="3" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ZonaPartidos'
}
</script>

<style scoped>
.container {
    width: 80%;
    margin: auto;
    overflow: hidden;
}

.zona-partidos {
    text-align: center;
    margin: 20px 0;
}

.card {
    display: inline-block;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 10px;
    padding: 20px;
    width: calc(25% - 40px);
    box-sizing: border-box;
    vertical-align: top;
}

.card h3 {
    margin: 0 0 10px;
}

.card button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
}

.card button:hover {
    background-color: #45a049;
}

.svg-container {
    text-align: center;
    margin: 20px 0;
}
</style>