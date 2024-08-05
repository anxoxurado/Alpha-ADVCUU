document.addEventListener('DOMContentLoaded', function () {

    mostrarCafeterias();
});

function mostrarCafeterias(){
    fetch('/lugares/todo?categoria=restaurante')

        .then(response => response.json())

        .then(data => {
            const container1 = document.getElementById('container1');
            const container2 = document.getElementById('container2');

            data.forEach(lugar => {

                const divIndividual1 = document.createElement('div');
                divIndividual1.classList.add('col-md-4', 'col-sm-4');

                const divIndividual2 = document.createElement('div');
                divIndividual2.classList.add('col-12');

                divIndividual1.innerHTML = `
                    <div class="card-item">
                        <div class="gradient-card g-orange2"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                        <div class="card-info">
                            <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                `;
                divIndividual1.addEventListener('click', () => {
                    //es por si el nombre lleva caracteres raros
                    const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                    window.location.href = `/lugares/restaurantes?nombre=${nombreLugarCodificado}`;
                    incrementarClicks(lugar.id_lugar);
                });

                divIndividual2.innerHTML = `
                    <div class="card-item">
                        <div class="gradient-card g-orange2"></div>
                        <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="${lugar.nombre_lugar}" />
                        <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        </div>
                    </div>
                `;

                divIndividual2.addEventListener('click', () => {
                    //es por si el nombre lleva caracteres raros
                    const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                    window.location.href = `/lugares/restaurantes?nombre=${nombreLugarCodificado}`;
                    incrementarClicks(lugar.id_lugar);
                });

                container1.appendChild(divIndividual1);
                container2.appendChild(divIndividual2);
            });
        })
        .catch(error => {
            console.error('Error de red:', error);
            const container1 = document.getElementById('container1');
            const container2 = document.getElementById('container2');
            container1.innerHTML = `<p>Error: Ocurrió un problema al conectar con el servidor</p>`;
            container2.innerHTML = `<p>Error: Ocurrió un problema al conectar con el servidor</p>`;
        });
}

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

const irCafeterias = document.getElementById('irCafeterias');
irCafeterias.addEventListener('click', () => {
    window.location.href = '/lugares/todo-cafeterias';
});

const irBares = document.getElementById('irBares');
irBares.addEventListener('click', () => {
    window.location.href = '/lugares/todo-bares';
});

const irCultural = document.getElementById('irCultural');
irCultural.addEventListener('click', () => {
    window.location.href = '/lugares/todo-cultural';
});


