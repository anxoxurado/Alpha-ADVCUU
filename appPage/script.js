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
            data.forEach(lugar => {
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
                    window.location.href = `http://localhost:3001/lugares?nombre=${lugar.nombre_lugar}`;
                });
                container.appendChild(divIndividual);
            });
        })

        .catch(error => {
            console.error('Error fetching data: ', error);
        })
}


function fetchTopRestaurantes(){
    fetch('http://localhost:3000/lugares/TopRestaurantes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })

        .then(data => {

            const container = document.getElementById('container-restaurantes');
            data.forEach(lugar => {
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
                    window.location.href = `http://localhost:3001/lugares?nombre=${lugar.nombre_lugar}`;
                });
                container.appendChild(divIndividual);
            });
        })

        .catch(error => {
            console.error('Error fetching data: ', error);
        })
}
