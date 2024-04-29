<template>
    <div class="reservation-page">
        <div class="reservation-header">
            <h1>ZONA DE RESERVAS</h1>
        </div>
        <div class="courts-container">
            <div class="court-card" v-for="court in courts" :key="court.id">
                <div class="court-image">
                    <img :src="court.image" alt="Court Image" />
                </div>
                <div class="court-info">
                    <h3>{{ court.name }}</h3>
                    <p>Court Reservation</p>
                    <button class="reserve-button">RESERVAR</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            courts: [
            { id: 1, name: 'Pista Render', image: require('../assets/Pista.png' )},
            { id: 1, name: 'Pista prueba', image: require('../assets/Pista.png' )},
            { id: 1, name: 'Pista keloke', image: require('../assets/Pista.png' )},
            { id: 1, name: 'Pista principiantes', image: require('../assets/Pista.png' )},
            { id: 1, name: 'Pista Render', image: require('../assets/Pista.png' )},
            { id: 1, name: 'Pista Render', image: require('../assets/Pista.png' )},
            ],
            
        };
    },
};
</script>

<style scoped>
.reservation-page {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 130px;
    text-align: center;
}

.reservation-header h1 {
    margin-bottom: 2rem;
}

.courts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.court-card {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.court-image img {
    width: 100%;
    height: auto;
    display: block;
}

.court-info {
    padding: 1rem;
}

.reserve-button {
    background-color: #004d40;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.reserve-button:hover {
    background-color: #02675b;
}
</style>