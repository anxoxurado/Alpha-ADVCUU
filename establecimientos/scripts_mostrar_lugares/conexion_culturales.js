document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreLugar = urlParams.get('nombre');
    mostrarLugar(nombreLugar);
    mostrarLugaresSimilares(nombreLugar);
});


function mostrarLugar(nombreLugar) {

    const nombreCodificado = encodeURIComponent(nombreLugar);

    //Cuando sea otra lugar que no sea cafe, se debe cambiar la url conforme a la categoria
    fetch(`/api/lugares/cultural?nombre=${nombreCodificado}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then(data => {

            const lugar = data[0];

            const imagenPrincipal = document.getElementById('imagen-principal');
            imagenPrincipal.setAttribute('src', `${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}`);

            const nombreLugar = document.getElementById('nombre-lugar');
            nombreLugar.textContent = lugar.nombre_lugar;

            const calle = document.getElementById('calle-lugar');
            calle.textContent = lugar.calle;

            const numero = document.getElementById('numero-lugar');
            numero.textContent = lugar.numero;

            const colonia = document.getElementById('colonia-lugar');
            colonia.textContent = lugar.colonia;

            const ciudad = document.getElementById('ciudad-lugar');
            ciudad.textContent = lugar.ciudad;

            const caracteristica1 = document.getElementById('caract-1');
            caracteristica1.textContent = lugar.caracteristica_1;

            const caracteristica2 = document.getElementById('caract-2');
            caracteristica2.textContent = lugar.caracteristica_2;

            const caracteristica3 = document.getElementById('caract-3');
            caracteristica3.textContent = lugar.caracteristica_3;

            //mostrar primera imagen
            const imagen1 = document.getElementById('primeraImagen');
            imagen1.setAttribute('src', `${lugar.ruta_imgPrincipal}/${lugar.nombre_imgPrincipal}`);

            //mostrar imagenes extra
            mostrarImagenesExtra(lugar.id_lugar);

            // linkear botones
            const ambiente1 = document.getElementById('ambiente1');
            ambiente1.textContent = lugar.ambiente;

            // el ambiente 2 si es null no se muestra nada
            if (lugar.ambiente2 != null) {
                const ambiente2 = document.getElementById('ambiente2');
                ambiente2.textContent = ', ' + lugar.ambiente2;
            }

            const precio = document.getElementById('precio');
            if (lugar.precio == 1) {
                precio.textContent = '$';
            } else if (lugar.precio == 2) {
                precio.textContent = '$$';
            } else if (lugar.precio == 3) {
                precio.textContent = '$$$';
            } else if (lugar.precio == 4) {
                precio.textContent = '$$$$+';
            }

            const btnMaps = document.getElementById('maps');
            btnMaps.addEventListener('click', () => {
                window.open(`${lugar.link_mapsGoogle}`);
            });

            // Ocultar el loader y mostrar el contenido
            setTimeout(() => {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            }, 200);


        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Aquí puedes agregar código para mostrar un mensaje de error al usuario
        });
}

// Metodo para mostrar lugares similares en el slider
function mostrarLugaresSimilares(nombreLugar) {
    const nombreCodificado = encodeURIComponent(nombreLugar);

    fetch(`/lugares/similares?nombre=${nombreCodificado}`)

        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud, no se encontraron lugares similares');
            }
            return response.json();
        })

        .then(data => {
            const container = document.getElementById('container-similares');

            //Ciclo para recorrer los datos y mostrarlos en la pagina
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

// Esta funcion hace que se muestran las imagenes extra de un lugar
function mostrarImagenesExtra(idLugar) {
    fetch(`/lugares/imagenes?id_lugar=${idLugar}`)

        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud, no se encontraron imagenes');
            }
            return response.json();
        })

        .then(data => {
            const divContenedor = document.getElementById('contenedor-imagenes');
            data.forEach((lugar) => {
                const divImagen = document.createElement('div');
                divImagen.classList.add('card-item');

                divImagen.innerHTML = `
                <img src="${lugar.ruta_imagen}/${lugar.nombre_imagen}" class="local-image" alt="">
            `;
                divContenedor.appendChild(divImagen);
            });
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