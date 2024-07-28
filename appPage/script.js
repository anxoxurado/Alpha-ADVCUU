document.addEventListener('DOMContentLoaded', () => {
    fetchTopCafes();
    fetchTopRestaurantes();
});

function fetchTopCafes() {
    fetch('http://localhost:3000/lugares/TopCafes')
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
                    <div class="gradient-card g-orange"></div>
                    <img src="${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}" class="local-image" alt="">
                    <div class="card-info">
                        <h2 class="local-name">${lugar.nombre_lugar}</h2>
                        <p class="local-description"><span id="cat1">${lugar.caracteristica_1}</span> - <span id="cat2">${lugar.caracteristica_2}</span> - <span id="cat3">${lugar.caracteristica_3}</span> </p>
                    </div>
                `;

                    divIndividual.addEventListener('click', () => {
                        //es por si el nombre lleva caracteres raros
                        const nombreLugarCodificado = encodeURIComponent(lugar.nombre_lugar);
                        window.location.href = `http://localhost:3000/lugares/cafes?nombre=${nombreLugarCodificado}`;
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
                        window.location.href = `http://localhost:3000/lugares/cafes?nombre=${nombreLugarCodificado}`;
                    });
                }
            });

        })

        .catch(error => {
            console.error('Error fetching data: ', error);
        })
}


function fetchTopRestaurantes() {
    fetch('http://localhost:3000/lugares/TopRestaurantes')
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
                        window.location.href = `http://localhost:3000/lugares?nombre=${nombreLugarCodificado}`;
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
                        window.location.href = `http://localhost:3000/lugares?nombre=${nombreLugarCodificado}`;
                    });
                }
            });
        })

        .catch(error => {
            console.error('Error fetching data: ', error);
        })
}


