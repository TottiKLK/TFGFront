<template>
    <div class="about-us-container">
        <Navbar_Component />
        <div class="header">
            <h1>Descubre Más Sobre Nosotros</h1>
            <p>En PadelIM, unimos pasión y tecnología para ofrecerte la mejor experiencia en el pádel.</p>
        </div>
        <div class="content">
            <div class="section">
                <img src="../assets/1.png" alt="Pista de Pádel" class="image">
                <div class="text">
                    <h2>Reserva de Pistas</h2>
                    <p>Experimenta el juego en pistas de primera calidad donde cada punto se siente como un campeonato.
                    </p>
                </div>
            </div>
            <div class="section reverse">
                <img src="../assets/2.png" alt="Pala de Pádel" class="image">
                <div class="text">
                    <h2>Palas Profesionales</h2>
                    <p>Encuentra tu pala ideal, diseñada con la más alta tecnología y pensada para cada estilo de
                        jugador.</p>
                </div>
            </div>
            <div class="section">
                <img src="../assets/3.png" alt="Accesorios de Pádel" class="image">
                <div class="text">
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
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.header h1 {
    font-size: 3rem;
    color: #ff9d0a;
    margin-bottom: 0.5em;
}

.header p {
    font-size: 1.5rem;
    color: #666;
    max-width: 800px;
    margin: 0 auto 2em;
}

.content .section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3em 0;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    transition: transform 0.3s ease-in-out;
}

.content .section:hover {
    transform: translateY(-10px);
}

.content .reverse {
    flex-direction: row-reverse;
}

.content .section img {
    width: 40%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.content .section .text {
    width: 60%;
    padding: 20px;
    text-align: left;
}

.content .section h2 {
    font-size: 2.4rem;
    color: #ff9d0a;
}

.content .section p {
    font-size: 1.3rem;
    color: #555;
    line-height: 1.6;
}
</style>
