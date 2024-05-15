<template>
    <footer class="footer-container">
        <div class="footer-content">
            <img src="../assets/logo.png" alt="Logo de la Empresa" class="footer-logo">
            <div class="footer-links">
                <a href="/sobrenosotros">Sobre Nosotros</a>
                <a href="/reservas">Reservas</a>
                <a href="/productos">Productos</a>
            </div>
            <div class="footer-info">
                <p>Email: contacto@padel.com</p>
                <p>Tel: +34 123 456 789</p>
                <p>Dirección: Calle Falsa 123, Madrid, España</p>
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
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #ccc;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1200px;
}

.footer-logo {
    height: 50px;
    margin-bottom: 20px;
}

.footer-links {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.footer-links a {
    color: #000;
    text-decoration: none;
    margin: 0 15px;
    font-size: 16px;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: #f28d35;
}

.footer-info {
    text-align: center;
    font-size: 14px;
}

.footer-info p {
    margin: 5px 0;
}

@media (max-width: 768px) {
    .footer-container {
        padding: 20px 10px;
    }

    .footer-links {
        flex-direction: column;
        align-items: center;
    }

    .footer-links a {
        margin: 10px 0;
    }
}
</style>
