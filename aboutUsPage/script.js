document.addEventListener("DOMContentLoaded", function() {
    // Simula un retraso para la animación (por ejemplo, 3 segundos)
    setTimeout(function() {
        // Oculta el preloader y muestra el contenido principal
        document.body.classList.add('loaded');
    }, 30000); // Cambia el tiempo según sea necesario
});
