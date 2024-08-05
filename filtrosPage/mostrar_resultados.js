document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = {
        categoria: urlParams.get('categoria'),
        ambiente: urlParams.get('ambiente'),
        precio: urlParams.get('precio')
    };

    console.log(data.categoria, data.ambiente, data.precio);

    fetch('/lugares-filtrados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const container1 = document.getElementById('container1');
        const container2 = document.getElementById('container2');
        
        if (data.error) {
            container1.innerHTML = '<p>Lo sentimos, no se encontraron lugares que cumplan con los filtros</p>';
            container2.innerHTML = '<p>Lo sentimos, no se encontraron lugares que cumplan con los filtros</p>';
            console.log('Error:', data.error);
            
        } else if (data.length === 0) {
            container1.innerHTML = '<p>No se encontraron lugares que cumplan con los filtros</p>';
            container2.innerHTML = '<p>No se encontraron lugares que cumplan con los filtros</p>';
        } else {
            let html1 = ''; //Este es para vista de computadora
            let html2 = ''; //Este es para vista de celular
            data.forEach(lugar => {
                const nombreCodificado= encodeURIComponent(lugar.nombre_lugar);
                if (lugar.nombre_categoria === 'Cafe') {
                html1 += `
                <div class="col-md-4 col-sm-4" onclick="incrementarClicks(${lugar.id_lugar}), window.location.href='/lugares/cafes?nombre=${nombreCodificado}';">
                    <div class="card-item">
                        <div class="gradient-card g-blue"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}"class="local-image" alt="${nombreCodificado}" />
                        <div class="card-info">
                            <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                </div>
                `;
                html2 += `
                <div class="col-12" onclick="incrementarClicks(${lugar.id_lugar}), window.location.href='/lugares/cafes?nombre=${nombreCodificado}';">
                <div class="card-item">
                    <div class="gradient-card g-blue"></div>
                    <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                    <div class="card-info">
                    <h2 class="local-name">${lugar.nombre_lugar}</h2>
                    </div>
                </div>
                </div>
                `;
                

                
                } else if (lugar.nombre_categoria === 'Restaurante' || lugar.nombre_categoria === 'Restaurante-bar') {
                    html1 += `
                    <div class="col-md-4 col-sm-4" onclick="incrementarClicks(${lugar.id_lugar}), window.location.href='/lugares/restaurantes?nombre=${nombreCodificado}';">
                        <div class="card-item">
                            <div class="gradient-card g-orange2"></div>
                            <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                            <div class="card-info">
                                <h2 class="local-name">${lugar.nombre_lugar}</h2>
                            </div>
                        </div>
                    </div>
                    `;
                    html2 += `
                    <div class="col-12" onclick="incrementarClicks(${lugar.id_lugar}), window.location.href='/lugares/restaurantes?nombre=${nombreCodificado}';">
                    <div class="card-item">
                        <div class="gradient-card g-orange2"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                        <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                    </div>
                    `;
                } else if (lugar.nombre_categoria === 'Bar') {
                    html1 += `
                    <div class="col-md-4 col-sm-4" onclick="incrementarClicks(${lugar.id_lugar}), window.location.href='/lugares/bares?nombre=${nombreCodificado}';">
                        <div class="card-item">
                            <div class="gradient-card g-red"></div>
                            <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                            <div class="card-info">
                                <h2 class="local-name">${lugar.nombre_lugar}</h2>
                            </div>
                        </div>
                    </div>
                    `;
                    html2 += `
                    <div class="col-12" onclick="incrementarClicks(${lugar.id_lugar}), window.location.href='/lugares/bares?nombre=${nombreCodificado}';">
                    <div class="card-item">
                        <div class="gradient-card g-red"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                        <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                    </div>
                    `;
                } else if (lugar.nombre_categoria === 'Cultural') {
                    html1 += `
                    <div class="col-md-4 col-sm-4" onclick="incrementarClicks(${lugar.id_lugar}), window.location.href='/lugares/cultural?nombre=${nombreCodificado}';">
                        <div class="card-item">
                            <div class="gradient-card g-purple"></div>
                            <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                            <div class="card-info">
                                <h2 class="local-name">${lugar.nombre_lugar}</h2>
                            </div>
                        </div>
                    </div>
                    `;
                    html2 += `
                    <div class="col-12" onclick="incrementarClicks(${lugar.id_lugar}), window.location.href='/lugares/cultural?nombre=${nombreCodificado}';">
                    <div class="card-item">
                        <div class="gradient-card g-purple"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                        <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                    </div>
                    `;
                }
            });
            container1.innerHTML = html1;
            container2.innerHTML = html2;
            
            // Ocultar el loader y mostrar el contenido
            setTimeout(() => {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            }, 200);
        }
    })
    .catch(error => {
        console.error('Error de red:', error);
        const container1 = document.getElementById('container1');
        const container2 = document.getElementById('container2');
        container1.innerHTML = `<p>Error: Ocurrió un problema al conectar con el servidor</p>`;
        container2.innerHTML = `<p>Error: Ocurrió un problema al conectar con el servidor</p>`;
    });
});

const irCafeterias = document.getElementById('irCafeterias');
irCafeterias.addEventListener('click', () => {
    window.location.href = '/lugares/todo-cafeterias';
});

const irBares = document.getElementById('irBares');
irBares.addEventListener('click', () => {
    window.location.href = '/lugares/todo-bares';
});

const irRestaurantes = document.getElementById('irRestaurantes');
irRestaurantes.addEventListener('click', () => {
    window.location.href = '/lugares/todo-restaurantes';
});

const irCultural = document.getElementById('irCultural');
irCultural.addEventListener('click', () => {
    window.location.href = '/lugares/todo-cultural';
});

// Funcion para incrementar los clicks de los lugares
function incrementarClicks(lugarId) {
    fetch('/incrementar-clicks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lugarId: lugarId })
    })
        .then(response => response.json())
        .then(data => console.log('Clicks incrementados:', data))
        .catch(error => console.error('Error:', error));
}