<template>
    <div class="home-container">
        <video autoplay muted loop class="background-video">
            <source src="../assets/videobuenocopia.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="overlay"></div>
        <div class="call-to-action">
            <div class="company-name">PadelIM</div>
        </div>
    </div>
    <div class="about-us-container">
        <Navbar_Component />
        <div class="header">
            <h1>{{$t('home.discover')}}</h1>
                <p>{{$t('home.aboutUs')}}</p>
        </div>
        <div class="content">
            <div class="section">
                <img src="../assets/1.png" alt="Pista de Pádel" class="image">
                <div class="text">
                    <h2>{{$t('home.trackReservation')}}</h2>
                    <p>{{$t('home.trackExperience')}}</p>
                </div>
            </div>
            <div class="section reverse">
                <img src="../assets/2.png" alt="Pala de Pádel" class="image">
                <div class="text">
                    <h2>{{$t('home.proRackets')}}</h2>
                    <p>{{$t('home.findYourRacket')}}</p>
                </div>
            </div>
            <div class="section">
                <img src="../assets/3.png" alt="Accesorios de Pádel" class="image">
                <div class="text">
                    <h2>{{$t('home.innovativeAccessories')}}</h2>
                    <p>{{$t('home.improveYourGame')}}</p>
                </div>
            </div>
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
    object-fit: cover;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
}

.call-to-action {
    padding: 1rem 2rem;
    border-radius: 30px;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    position: relative;
    z-index: 2;
}

.company-name {
    background-color: #f28d35;
    color: #ffffff;
    padding: 1.5rem 3rem;
    border-radius: 30px;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    font-family: 'Poppins', sans-serif; /* Aplicar la fuente Poppins */
}

.company-name:hover,
.company-name:focus {
    background-color: #e27635;
    transform: scale(1.05);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.4);
}

.about-us-container {
    text-align: center;
    color: #333;
    font-family: 'Poppins', sans-serif; /* Aplicar la fuente Poppins */
    max-width: 1200px;
    margin: 0 auto;
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

@media (max-width: 1768px) {
    .home-container {
        margin-top: 15%;
        height: 50vh;
    }
}

</style>
