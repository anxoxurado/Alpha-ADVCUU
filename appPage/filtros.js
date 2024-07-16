document.addEventListener('DOMContentLoaded', function() {
    const filtroTrigger = document.getElementById('filtro-trigger');
    const menuFiltros = document.getElementById('menu-filtros');
    const rotTriangle = document.querySelector('.rotTriangle');

    filtroTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        
        menuFiltros.classList.toggle('active');
        
        if (menuFiltros.classList.contains('active')) {
            rotTriangle.style.transform = 'rotate(180deg)';
            rotTriangle.style.transition = '0.2s ease-in-out';
        } else {
            rotTriangle.style.transform = 'rotate(90deg)';
        }
    });

    
});