document.addEventListener("DOMContentLoaded", function () {

    const btnIngles = document.getElementById('en');
    const btnEspañol = document.getElementById('es');

    var idiomaGuardado = localStorage.getItem('idioma'); // esta variable guarda el idioma que se selecciono en la pagina

    

    if (btnIngles) {
        btnIngles.addEventListener('click', () => {
            cambiarIdioma('en');
            localStorage.setItem('idioma', 'en');

        });
    } else {
        console.error('El elemento con ID "en" no se encontró');
    }

    if (btnEspañol) {
        btnIngles.addEventListener('click', () => {
            cambiarIdioma('es');
            localStorage.setItem('idioma', 'es');
        });
    } else {
        console.error('El elemento con ID "en" no se encontró');
    }



    if (!idiomaGuardado) {

        var typed = new Typed(".auto-type", {
            strings: [
                "cafés",
                "negocios locales",
                "bares",
                "restaurantes",
                "puestos",
                "restaurantes",
                "centros culturales",
                "lugares",
            ],
            typeSpeed: 90,
            backSpeed: 50,
            looped: true,
            loopCount: Infinity,
            showCursor: false,
            fadeOut: false,
            smartBackspace: true,
            backspace: (curString, curStrPos) => {
                return {
                    hideWhenDone: true,
                    hideWhenDoneDelay: 0,
                };
            },
        });

        var typed = new Typed(".auto-type_small", {
            strings: [
                "cafés",
                "bares",
                "restaurantes",
                "puestos",
                "restaurantes",
                "centros culturales",
                "lugares",
            ],
            typeSpeed: 90,
            backSpeed: 50,
            looped: true,
            loopCount: Infinity,
            showCursor: false,
            fadeOut: false,
            smartBackspace: true,
            backspace: (curString, curStrPos) => {
                return {
                    hideWhenDone: true,
                    hideWhenDoneDelay: 0,
                };
            },
        });

        var typed = new Typed(".auto-type_mid", {
            strings: [
                "cafés",
                "bares",
                "restaurantes",
                "puestos",
                "restaurantes",
                "centros culturales",
                "lugares",
            ],
            typeSpeed: 90,
            backSpeed: 50,
            looped: true,
            loopCount: Infinity,
            showCursor: false,
            fadeOut: false,
            smartBackspace: true,
            backspace: (curString, curStrPos) => {
                return {
                    hideWhenDone: true,
                    hideWhenDoneDelay: 0,
                };
            },
        });
    }

    if (idiomaGuardado) {
        cambiarIdioma(idiomaGuardado);
    }

    function cambiarIdioma(idioma) {
        if (idioma == 'es') {
            var typed = new Typed(".auto-type", {
                strings: [
                    "cafés",
                    "negocios locales",
                    "bares",
                    "restaurantes",
                    "puestos",
                    "restaurantes",
                    "centros culturales",
                    "lugares",
                ],
                typeSpeed: 90,
                backSpeed: 50,
                looped: true,
                loopCount: Infinity,
                showCursor: false,
                fadeOut: false,
                smartBackspace: true,
                backspace: (curString, curStrPos) => {
                    return {
                        hideWhenDone: true,
                        hideWhenDoneDelay: 0,
                    };
                },
            });

            var typed = new Typed(".auto-type_small", {
                strings: [
                    "cafés",
                    "bares",
                    "restaurantes",
                    "puestos",
                    "restaurantes",
                    "centros culturales",
                    "lugares",
                ],
                typeSpeed: 90,
                backSpeed: 50,
                looped: true,
                loopCount: Infinity,
                showCursor: false,
                fadeOut: false,
                smartBackspace: true,
                backspace: (curString, curStrPos) => {
                    return {
                        hideWhenDone: true,
                        hideWhenDoneDelay: 0,
                    };
                },
            });

            var typed = new Typed(".auto-type_mid", {
                strings: [
                    "cafés",
                    "bares",
                    "restaurantes",
                    "puestos",
                    "restaurantes",
                    "centros culturales",
                    "lugares",
                ],
                typeSpeed: 90,
                backSpeed: 50,
                looped: true,
                loopCount: Infinity,
                showCursor: false,
                fadeOut: false,
                smartBackspace: true,
                backspace: (curString, curStrPos) => {
                    return {
                        hideWhenDone: true,
                        hideWhenDoneDelay: 0,
                    };
                },
            });
        } else if (idioma == 'en') {  // si el idioma guardado es en se cambiara a ingles
            var typed = new Typed(".auto-type", {
                strings: [
                    "coffee shops",
                    "local businesses",
                    "bars",
                    "restaurants",
                    "food trucks",
                    "restaurants",
                    "cultural centers",
                    "places",
                ],
                typeSpeed: 90,
                backSpeed: 50,
                looped: true,
                loopCount: Infinity,
                showCursor: false,
                fadeOut: false,
                smartBackspace: true,
                backspace: (curString, curStrPos) => {
                    return {
                        hideWhenDone: true,
                        hideWhenDoneDelay: 0,
                    };
                },
            });

            var typed = new Typed(".auto-type_small", {
                strings: [
                    "coffee shops",
                    "bars",
                    "restaurants",
                    "food trucks",
                    "restaurants",
                    "cultural centers",
                    "places",
                ],
                typeSpeed: 90,
                backSpeed: 50,
                looped: true,
                loopCount: Infinity,
                showCursor: false,
                fadeOut: false,
                smartBackspace: true,
                backspace: (curString, curStrPos) => {
                    return {
                        hideWhenDone: true,
                        hideWhenDoneDelay: 0,
                    };
                },
            });

            var typed = new Typed(".auto-type_mid", {
                strings: [
                    "coffee shops",
                    "bars",
                    "restaurants",
                    "food trucks",
                    "restaurants",
                    "cultural centers",
                    "places",
                ],
                typeSpeed: 90,
                backSpeed: 50,
                looped: true,
                loopCount: Infinity,
                showCursor: false,
                fadeOut: false,
                smartBackspace: true,
                backspace: (curString, curStrPos) => {
                    return {
                        hideWhenDone: true,
                        hideWhenDoneDelay: 0,
                    };
                },
            });
        }
    }
});
