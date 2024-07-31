document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const data = {
        categoria: urlParams.get('categoria'),
        ambiente: urlParams.get('ambiente'),
        precio: urlParams.get('precio')
    };


    fetch('http://localhost:3000/lugares-filtrados', {
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
            container1.innerHTML = `<p>Error: ${data.error}</p>`;
            container2.innerHTML = `<p>Error: ${data.error}</p>`;
        } else if (data.length === 0) {
            container1.innerHTML = '<p>No se encontraron lugares que cumplan con los filtros</p>';
            container2.innerHTML = '<p>No se encontraron lugares que cumplan con los filtros</p>';
        } else {
            let html1 = '';
            let html2 = '';
            data.forEach(lugar => {
                const nombreCodificado= encodeURIComponent(lugar.nombre_lugar);
                if (lugar.nombre_categoria === 'Cafe') {
                html1 += `
                <div class="col-md-4 col-sm-4" onclick="window.location.href='http://localhost:3000/lugares/cafes?nombre=${nombreCodificado}';">
                    <div class="card-item">
                        <div class="gradient-card g-orange"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${nombreCodificado}" />
                        <div class="card-info">
                            <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                </div>
                `;
                html2 += `
                <div class="col-12" onclick="window.location.href='http://localhost:3000/lugares/cafes?nombre=${nombreCodificado}';">
                <div class="card-item">
                    <div class="gradient-card g-orange"></div>
                    <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                    <div class="card-info">
                    <h2 class="local-name">${lugar.nombre_lugar}</h2>
                    </div>
                </div>
                </div>
                `;
                

                
                } else if (lugar.nombre_categoria === 'Restaurante') {
                    html1 += `
                    <div class="col-md-4 col-sm-4" onclick="window.location.href='http://localhost:3000/lugares/restaurantes?nombre=${nombreCodificado}';">
                        <div class="card-item">
                            <div class="gradient-card g-orange"></div>
                            <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                            <div class="card-info">
                                <h2 class="local-name">${lugar.nombre_lugar}</h2>
                            </div>
                        </div>
                    </div>
                    `;
                    html2 += `
                    <div class="col-12" onclick="window.location.href='http://localhost:3000/lugares/restaurantes?nombre=${nombreCodificado}';">
                    <div class="card-item">
                        <div class="gradient-card g-orange"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                        <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                    </div>
                    `;
                } else if (lugar.nombre_categoria === 'Bar') {
                    html1 += `
                    <div class="col-md-4 col-sm-4" onclick="window.location.href='http://localhost:3000/lugares/bares?nombre=${nombreCodificado}';">
                        <div class="card-item">
                            <div class="gradient-card g-orange"></div>
                            <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                            <div class="card-info">
                                <h2 class="local-name">${lugar.nombre_lugar}</h2>
                            </div>
                        </div>
                    </div>
                    `;
                    html2 += `
                    <div class="col-12" onclick="window.location.href='http://localhost:3000/lugares/bares?nombre=${nombreCodificado}';">
                    <div class="card-item">
                        <div class="gradient-card g-orange"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                        <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                    </div>
                    `;
                } else if (lugar.nombre_categoria === 'Cultural') {
                    html1 += `
                    <div class="col-md-4 col-sm-4" onclick="window.location.href='http://localhost:3000/lugares/cultural?nombre=${nombreCodificado}';">
                        <div class="card-item">
                            <div class="gradient-card g-orange"></div>
                            <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                            <div class="card-info">
                                <h2 class="local-name">${lugar.nombre_lugar}</h2>
                            </div>
                        </div>
                    </div>
                    `;
                    html2 += `
                    <div class="col-12" onclick="window.location.href='http://localhost:3000/lugares/cultural?nombre=${nombreCodificado}';">
                    <div class="card-item">
                        <div class="gradient-card g-orange"></div>
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
    window.location.href = 'http://localhost:3000/lugares/todo-cafeterias';
});

const irBares = document.getElementById('irBares');
irBares.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/lugares/todo-bares';
});

const irRestaurantes = document.getElementById('irRestaurantes');
irRestaurantes.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/lugares/todo-restaurantes';
});

const irCultural = document.getElementById('irCultural');
irCultural.addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/lugares/todo-cultural';
});