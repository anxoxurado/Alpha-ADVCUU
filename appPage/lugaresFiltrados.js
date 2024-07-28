document.getElementById('filtro-lugares').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
        categoria: formData.get('categoria'),
        ambiente: formData.get('ambiente'),
        precio: formData.get('precio')
    };

    fetch('/lugares-filtrados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('lugares-filtrados');
        
        if (data.error) {
            // Esto manejará el caso de 404 (no se encontraron lugares)
            container.innerHTML = `<p>No se que paso</p>`;
        } else if (data.length === 0) {
            container.innerHTML = '<p>No se encontraron lugares que cumplan con los filtros</p>';
        } else {
            if (data.length === 1) {
                const lugar1 = data[0];
                container.innerHTML = `<div class="tarjeta-lugar"> <p>${lugar1.nombre_lugar}</p></div>`;
            } else if (data.length === 2) {
                const lugar1 = data[0];
                const lugar2 = data[1];
                container.innerHTML = `
                <div class="tarjeta-lugar"> <p>${lugar1.nombre_lugar}</p></div>
                <div class="tarjeta-lugar"> <p>${lugar2.nombre_lugar}</p></div>
                `;
            } else {
                const lugar1 = data[0];
                const lugar2 = data[1];
                const lugar3 = data[2];
                container.innerHTML = `
                <div class="tarjeta-lugar"> <p>${lugar1.nombre_lugar}</p></div>
                <div class="tarjeta-lugar"> <p>${lugar2.nombre_lugar}</p></div>
                <div class="tarjeta-lugar"> <p>${lugar3.nombre_lugar}</p></div>
                `;
            }
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
        const container = document.getElementById('lugares-filtrados');
        container.innerHTML = `<p>Error: Ocurrió un problema al conectar con el servidor</p>`;
    });
});