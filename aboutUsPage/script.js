document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    const container = preloader.querySelector('.container div');
    
    // Duración total: 2s (delay) + 7s (animación) + 1s (espera final) = 10s
    const totalDuration = 10000;

    // Agregar un event listener para el final de la animación
    container.addEventListener('animationend', function() {
        setTimeout(function() {
            document.body.classList.add('loaded');
        }, 1000); // Espera 1 segundo después de que la animación termine
    });

    // Fallback en caso de que el evento animationend no se dispare
    setTimeout(function() {
        if (!document.body.classList.contains('loaded')) {
            document.body.classList.add('loaded');
        }
    }, totalDuration);
});