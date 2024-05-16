<template>
    <div class="home-container">
        <video autoplay muted loop class="background-video">
            <source src="../assets/videobuenocopia.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="overlay"></div>
        <div class="call-to-action">
            <button @click="$router.push('/sobrenosotros')">Sobre nosotros</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeComponent',
};
</script>

<style scoped>
.home-container {
    width: 100%;
    height: 70vh;
    margin: 0 auto;
    margin-top: 5%;
    margin-bottom: 1%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.background-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
    object-fit: cover; /* Cambiado de contain a cover */
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); /* Filtro oscuro */
    z-index: 0;
}

.call-to-action {
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 30px;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    position: relative;
    z-index: 2;
}

.call-to-action button {
    background-color: #f28d35;
    color: #ffffff;
    border: none;
    padding: 1.5rem 3rem;
    cursor: pointer;
    border-radius: 30px;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
}

.call-to-action button:hover,
.call-to-action button:focus {
    background-color: #e27635;
    transform: scale(1.05);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.4);
}

@media (max-width: 1768px) {
    .home-container {
        margin-top: 15%;
        height: 50vh;
    }
}
</style>
