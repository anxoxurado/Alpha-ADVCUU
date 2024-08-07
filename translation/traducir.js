document.addEventListener('DOMContentLoaded', () => {

    const btnIngles = document.getElementById('en');
    const btnEspañol = document.getElementById('es');


    var idiomaGuardado = localStorage.getItem('idioma');    // esta variable guarda el idioma que se selecciono en la pagina


    //Con esta funcion se cambia el idioma a ingles
    if (btnIngles) {
        btnIngles.addEventListener('click', () => {
            traducir('en');
            localStorage.setItem('idioma', 'en');
            recargarPagina();
        });
    } else {
        console.error('El elemento con ID "en" no se encontró');
    }

    //Con esta funcion se cambia el idioma a español
    if (btnEspañol) {
        btnEspañol.addEventListener('click', () => {
            traducir('es');
            localStorage.setItem('idioma', 'es');
            recargarPagina();
        });
    } else {
        console.error('El elemento con ID "en" no se encontró');
    }

    if (idiomaGuardado) {
        traducir(idiomaGuardado);
    }



    function traducir(lenguaje) {
        fetch(`/traducir`)
            .then(response => response.json())
            .then(data => {
                idioma = data[lenguaje];

                const funciones = document.querySelector('.funciones');
                funciones.textContent = idioma.funciones;

                const categorias = document.querySelector('.categorias');
                categorias.textContent = idioma.categorias;

                const PRFs = document.querySelector('.PRFs');
                PRFs.textContent = idioma.PRFs;

                const PRFs2 = document.querySelector('.PRFs2');
                PRFs2.textContent = idioma.PRFs;

                const idiom = document.querySelector('.lenguaje');
                idiom.textContent = idioma.idiom;

                const sobre_nosotros = document.querySelector('.sobre_nosotros');
                sobre_nosotros.textContent = idioma.sobre_nosotros;

                const sobre_nosotros2 = document.querySelector('.sobre_nosotros2');
                sobre_nosotros2.textContent = idioma.sobre_nosotros;

                const comenzar_a_buscar = document.querySelector('.comenzar_a_buscar');
                comenzar_a_buscar.textContent = idioma.comenzar_a_buscar;

                const txt_comercial = document.querySelector('.txt_comercial');
                txt_comercial.textContent = idioma.txt_comercial;

                const de_chihuahua = document.querySelector('.de_chihuahua');
                de_chihuahua.textContent = idioma.de_chihuahua;

                const nuestra_ciudad_necesita = document.querySelector('.nuestra_ciudad_necesita');
                nuestra_ciudad_necesita.textContent = idioma.nuestra_ciudad_necesita;

                const recomendaciones = document.querySelector('.recomendaciones');
                recomendaciones.textContent = idioma.recomendaciones;

                const locales = document.querySelector('.locales');
                locales.textContent = idioma.locales;

                const no_google_maps = document.querySelector('.no_google_maps');
                no_google_maps.textContent = idioma.no_google_maps;

                const directorio_mejor_ciudad = document.querySelector('.directorio_mejor_ciudad');
                directorio_mejor_ciudad.textContent = idioma.directorio_mejor_ciudad;
                
                const confia_elige_animate = document.querySelector('.confia_elige_animate');
                confia_elige_animate.textContent = idioma.confia_elige_animate;
                
                const top_cafeterias = document.querySelector('.top_cafeterias');
                top_cafeterias.textContent = idioma.top_cafeterias;

                const ajusta_tu_plan = document.querySelector('.ajusta_tu_plan');
                ajusta_tu_plan.textContent = idioma.ajusta_tu_plan;

                const cada_plan_diferente = document.querySelector('.cada_plan_diferente');
                cada_plan_diferente.textContent = idioma.cada_plan_diferente;

                const quienes_somos = document.querySelector('.quienes_somos');
                quienes_somos.textContent = idioma.quienes_somos;

                //const mision = document.querySelector('.mision');
                //mision.textContent = idioma.mision;

               // const vision = document.querySelector('.vision');
                //vision.textContent = idioma.vision;

                //const roadmap = document.querySelector('.roadmap');
                //roadmap.textContent = idioma.roadmap;

                const contactanos = document.querySelector('.contactanos');
                contactanos.textContent = idioma.contactanos;

                //const instagram = document.querySelector('.instagram');
                //instagram.textContent = idioma.instagram;

                //const facebook = document.querySelector('.facebook');
                //facebook.textContent = idioma.facebook;

                //const x = document.querySelector('.x');
                //x.textContent = idioma.x;

                //const enviar_correo = document.querySelector('.enviar_correo');
                //enviar_correo.textContent = idioma.enviar_correo;


                //const lenguaje = document.querySelector('.lenguaje');
                //lenguaje.textContent = idioma.lenguaje;

                const comenzar_a_buscar2 = document.querySelector('.comenzar_a_buscar2');
                comenzar_a_buscar2.textContent = idioma.comenzar_a_buscar;

                const cafeterias = document.querySelector('.cafeterias');
                cafeterias.textContent = idioma.cafeterias;

                const restaurantes = document.querySelector('.restaurantes');
                restaurantes.textContent = idioma.restaurantes;

                const bares = document.querySelector('.bares');
                bares.textContent = idioma.bares;

                const culturales = document.querySelector('.culturales');
                culturales.textContent = idioma.culturales;

                const paginas = document.querySelector('.paginas2');
                paginas.textContent = idioma.paginas;

                const navbarElements = document.getElementById('navbarElements');

                if (lenguaje == 'en') {
                    navbarElements.setAttribute('src', '/prototipo/elementos/Navbarelements_en.png');
                }

                if (lenguaje == 'es') {
                    navbarElements.setAttribute('src', '/prototipo/elementos/Navbarelements.png');
                }
                
            });
    }

});

function recargarPagina() {
    this.location.reload();
}