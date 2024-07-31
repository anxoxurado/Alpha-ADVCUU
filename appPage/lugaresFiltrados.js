document.getElementById('filtro-lugares').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
        categoria: formData.get('categoria'),
        ambiente: formData.get('ambiente'),
        precio: formData.get('precio')
    };

    // Construye la URL con los parámetros del filtro
    const searchParams = new URLSearchParams(data);
    const newPageUrl = `/lugares/resultado-filtro?${searchParams.toString()}`;

    // Redirige a la nueva página
    window.location.href = newPageUrl;
});