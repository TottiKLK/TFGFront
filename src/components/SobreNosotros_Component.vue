<template>
    <div class="about-us-container">
        <Navbar_Component />
        <div class="header">
            <h1>Descubre Más Sobre Nosotros</h1>
            <p>En PadelIM, unimos pasión y tecnología para ofrecerte la mejor experiencia en el pádel.
            </p>
        </div>
        <div class="content">
            <div class="section">
                <img src="../assets/1.png" alt="Pista de Pádel" class="image-left">
                <div class="text-right">
                    <h2>Reserva de Pistas</h2>
                    <p>Experimenta el juego en pistas de primera calidad donde cada punto se siente como un campeonato.
                    </p>
                </div>
            </div>
            <div class="section reverse">
                <img src="../assets/2.png" alt="Pala de Pádel" class="image-right">
                <div class="text-left">
                    <h2>Palas Profesionales</h2>
                    <p>Encuentra tu pala ideal, diseñada con la más alta tecnología y pensada para cada estilo de
                        jugador.</p>
                </div>
            </div>
            <div class="section">
                <img src="../assets/3.png" alt="Accesorios de Pádel" class="image-left">
                <div class="text-right">
                    <h2>Accesorios Innovadores</h2>
                    <p>Mejora tu juego con nuestros accesorios, desde overgrips hasta pelotas diseñadas para ofrecer el
                        máximo rendimiento.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar_Component from '../components/Navbar_Component.vue';

export default {
    name: 'SobreNosotrosView',
    components: {
        Navbar_Component,
    },
};
</script>
<style scoped>
.about-us-container {
    text-align: center;
    color: #333;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header h1 {
    font-size: 2.8rem;
    color: #ff9d0a;
    margin-bottom: 1em;
    margin-top: 10%;
}

.header p {
    font-size: 1.4rem;
    color: #000000;
    margin-bottom: 2em;
}

.content .section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2em 0;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.content .reverse {
    flex-direction: row-reverse;
}

.content .section img {
    width: 30%;
    border-radius: 8px;
}

.content .section .text-right,
.content .section .text-left {
    width: 70%;
    padding: 20px;
    font-size: 1.2rem;
}

.content .section h2 {
    font-size: 2.2rem;
    color: #ff9d0a;
}

.content .section p {
    font-size: 1.2rem;
    color: #555;
}
</style>
