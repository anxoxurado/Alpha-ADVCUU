document.addEventListener('DOMContentLoaded', () => {
    fetchTopCafes();
    fetchTopRestaurantes();
    fetchTopBares();
    fetchTopCulturales();
});

// MOSTRAR LOS MEJORES 10 CAFES
function fetchTopCafes() {
    fetch('/lugares/TopCafes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })

        .then(data => {
            const container = document.getElementById('container-cafeterias');

            //Ciclo para recorrer los datos y mostrarlos en la pagina
            data.forEach((lugar, index) => {
                if (index != 0) {
                    const divIndividual = document.createElement('div');
                    divIndividual.classList.add('card-item');

                    divIndividual.innerHTML = `
                    <div class="gradient-card g-blue"></div>
                    <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="">
                    <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        <p class="local-description"><span id="cat1">${lugar.caracteristica_1}</span> - <span id="cat2">${lugar.caracteristica_2}</span> - <span id="cat3">${lugar.caracteristica_3}</span> </p>
                    </div>
                `;

                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `/lugares/cafes?nombre=${nombreLugarCodificado}`;
                        incrementarClicks(lugar.id_lugar);
                    });
                    container.appendChild(divIndividual);
                } else {

                    const imagenLugar = document.getElementById('imagenPrimerCafe');
                    imagenLugar.src = `${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}`;

                    const nombrePrimerLugar = document.getElementById('nombrePrimerCafe')
                    nombrePrimerLugar.textContent = lugar.nombre_lugar;

                    const caracteristica1 = document.getElementById('cat1PrimerCafe');
                    caracteristica1.textContent = lugar.caracteristica_1;

                    const caracteristica2 = document.getElementById('cat2PrimerCafe');
                    caracteristica2.textContent = lugar.caracteristica_2;

                    const caracteristica3 = document.getElementById('cat3PrimerCafe');
                    caracteristica3.textContent = lugar.caracteristica_3;

                    const divIndividual = document.getElementById('cardPrimerCafe');
                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `/lugares/cafes?nombre=${nombreLugarCodificado}`;
                        incrementarClicks(lugar.id_lugar);
                    });
                }
            });

        })

        .catch(error => {
            console.error('Error fetching data: ', error);
        })
}

// MOSTRAR LOS MEJORES 10 RESTAURANTES
function fetchTopRestaurantes() {
    fetch('/lugares/TopRestaurantes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })

        .then(data => {

            const container = document.getElementById('container-restaurantes');
            data.forEach((lugar, index) => {
                if (index != 0) {
                    const divIndividual = document.createElement('div');
                    divIndividual.classList.add('card-item');

                    divIndividual.innerHTML = `
                    <div class="gradient-card g-orange2"></div>
                    <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="">
                    <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        <p class="local-description"><span id="cat1">${lugar.caracteristica_1}</span> - <span id="cat2">${lugar.caracteristica_2}</span> - <span id="cat3">${lugar.caracteristica_3}</span> </p>
                    </div>
                `;

                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `/lugares/restaurantes?nombre=${nombreLugarCodificado}`;
                        incrementarClicks(lugar.id_lugar);
                    });
                    container.appendChild(divIndividual);
                } else {

                    const imagenLugar = document.getElementById('imagenPrimerRestaurante');
                    imagenLugar.src = `${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}`;

                    const nombrePrimerLugar = document.getElementById('nombrePrimerRestaurante')
                    nombrePrimerLugar.textContent = lugar.nombre_lugar;

                    const caracteristica1 = document.getElementById('cat1PrimerRestaurante');
                    caracteristica1.textContent = lugar.caracteristica_1;

                    const caracteristica2 = document.getElementById('cat2PrimerRestaurante');
                    caracteristica2.textContent = lugar.caracteristica_2;

                    const caracteristica3 = document.getElementById('cat3PrimerRestaurante');
                    caracteristica3.textContent = lugar.caracteristica_3;



                    const divIndividual = document.getElementById('cardPrimerRestaurante');

                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `/lugares/restaurantes?nombre=${nombreLugarCodificado}`;
                        incrementarClicks(lugar.id_lugar);
                    });
                }
            });
        })

        .catch(error => {
            console.error('Error fetching data: ', error);
        })
}


// MOSTRAR LOS MEJORES 10 BARES
function fetchTopBares() {
    fetch('/lugares/TopBares')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })

        .then(data => {

            const container = document.getElementById('container-bares');
            data.forEach((lugar, index) => {
                if (index != 0) {
                    const divIndividual = document.createElement('div');
                    divIndividual.classList.add('card-item');

                    divIndividual.innerHTML = `
                    <div class="gradient-card g-red"></div>
                    <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="">
                    <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        <p class="local-description"><span id="cat1">${lugar.caracteristica_1}</span> - <span id="cat2">${lugar.caracteristica_2}</span> - <span id="cat3">${lugar.caracteristica_3}</span> </p>
                    </div>
                `;

                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `/lugares/bares?nombre=${nombreLugarCodificado}`;
                        incrementarClicks(lugar.id_lugar);
                    });
                    container.appendChild(divIndividual);
                } else {

                    const imagenLugar = document.getElementById('imagenPrimerBar');
                    imagenLugar.src = `${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}`;

                    const nombrePrimerLugar = document.getElementById('nombrePrimerBar')
                    nombrePrimerLugar.textContent = lugar.nombre_lugar;

                    const caracteristica1 = document.getElementById('cat1PrimerBar');
                    caracteristica1.textContent = lugar.caracteristica_1;

                    const caracteristica2 = document.getElementById('cat2PrimerBar');
                    caracteristica2.textContent = lugar.caracteristica_2;

                    const caracteristica3 = document.getElementById('cat3PrimerBar');
                    caracteristica3.textContent = lugar.caracteristica_3;



                    const divIndividual = document.getElementById('cardPrimerBar');

                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `/lugares/bares?nombre=${nombreLugarCodificado}`;
                        incrementarClicks(lugar.id_lugar);
                    });
                }
            });
        })

        .catch(error => {
            console.error('Error fetching data: ', error);
        })
}

// MOSTRAR LOS MEJORES 10 CULTURALES
function fetchTopCulturales() {
    fetch('/lugares/TopCulturales')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })

        .then(data => {

            const container = document.getElementById('container-culturales');
            data.forEach((lugar, index) => {
                if (index != 0) {
                    const divIndividual = document.createElement('div');
                    divIndividual.classList.add('card-item');

                    divIndividual.innerHTML = `
                    <div class="gradient-card g-purple"></div>
                    <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="">
                    <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        <p class="local-description"><span id="cat1">${lugar.caracteristica_1}</span> - <span id="cat2">${lugar.caracteristica_2}</span> - <span id="cat3">${lugar.caracteristica_3}</span> </p>
                    </div>
                `;

                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `/lugares/cultural?nombre=${nombreLugarCodificado}`;
                        incrementarClicks(lugar.id_lugar);
                    });
                    container.appendChild(divIndividual);
                } else {

                    const imagenLugar = document.getElementById('imagenPrimerCultural');
                    imagenLugar.src = `${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}`;

                    const nombrePrimerLugar = document.getElementById('nombrePrimerCultural')
                    nombrePrimerLugar.textContent = lugar.nombre_lugar;

                    const caracteristica1 = document.getElementById('cat1PrimerCultural');
                    caracteristica1.textContent = lugar.caracteristica_1;

                    const caracteristica2 = document.getElementById('cat2PrimerCultural');
                    caracteristica2.textContent = lugar.caracteristica_2;

                    const caracteristica3 = document.getElementById('cat3PrimerCultural');
                    caracteristica3.textContent = lugar.caracteristica_3;



                    const divIndividual = document.getElementById('cardPrimerCultural');

                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `/lugares/cultural?nombre=${nombreLugarCodificado}`;
                        incrementarClicks(lugar.id_lugar);
                    });
                }
            });
        })

        .catch(error => {
            console.error('Error fetching data: ', error);
        })
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