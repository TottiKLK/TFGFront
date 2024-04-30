<template>
    <footer class="footer-container">
        <div class="footer-content">
            <img src="../assets/logo.png" alt="Logo de la Empresa" class="footer-logo">
            <div class="footer-links">
                <a href="/sobrenosotros">Sobre Nosotros</a>
                <a href="/reservas">Reservas</a>
                <a href="/productos">Productos</a>
                <div class="footer-info">
                    <p>Email: contacto@padel.com</p>
                    <p>Tel: +34 123 456 789</p>
                    <p>Dirección: Calle Falsa 123, Madrid, España</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent'
}
</script>

<style scoped>
.footer-container {
    background-color: #d8d8d8;
    color: #000;
    padding: 20px 50px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}

.footer-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    margin: auto;
}

.footer-logo {
    height: 50px;
}

.footer-links a,
.footer-info p {
    color: #000;
    text-decoration: none;
    margin-left: 20px;
    font-size: 16px;
}

.footer-links a:hover {
    text-decoration: underline;
}

.footer-info {
    text-align: center;
    flex-basis: 100%;
    order: 3;
}

@media (max-width: 768px) {
    .footer-container {
        padding: 20px;
        flex-direction: column;
    }

    .footer-content {
        flex-direction: column;
    }

    .footer-links,
    .footer-info {
        text-align: center;
        margin-top: 10px;
    }

    .footer-links a {
        display: block;
        margin-left: 0;
        margin-bottom: 10px;
    }
}
</style>
