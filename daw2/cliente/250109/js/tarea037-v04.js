// usamos evento load

const URL = 'https://restcountries.com/v3.1/name';

document.getElementById('formulario-buscapais').addEventListener('submit', function (evento) {
    evento.preventDefault(); // no sé que hace esto --- investigar --- importante
    const nombrePaísSolicitado = document.getElementById('nombre-pais').value.toLowerCase().trim();
    if (nombrePaísSolicitado != '') {
        console.log('Vamos a buscar el país: ' + nombrePaísSolicitado);
        obtenerPaís(nombrePaísSolicitado)
        .then(function (params) {
            
        });
    } else {
        console.error('Debes introducir un texto de búsqueda en el formulario.');
        
    }
});

function pintarPaís1(paísJson) {
    document.querySelector('.infoPaís').innerHTML = paísJson[0].capital;
}

function pintarPaís2(paísJson) {
    document.querySelector('.infoPaís').innerHTML = paísJson[0].name.common;
}

function pintarPaís3(paísJson) {
    document.querySelector('.infoPaís').innerHTML =  document.querySelector('.infoPaís').innerHTML + paísJson[0].name.common;
}

function pintarPaís4(paísJson) {
    document.querySelector('.infoPaís').innerHTML = `<img src="${paísJson[0].coatOfArms.png}">`;
}

function obtenerPaís(nombrePaísAObtener) {

    return new Promise( function(promesaOK, promesaFail) {
               
        const miPetición = new XMLHttpRequest(); // readyState vale 0
        miPetición.open('GET', `${URL}/${nombrePaísAObtener}`, true); // readyState vale 1
        console.log('Procedo a enviar la petición.');
        miPetición.send(); // readyState vale 2 al ejecutarse, 3 mientras se hace y 4 al finalizar
        console.log('La petición ha sido enviada.');
        
        miPetición.addEventListener('load', function () {
            if (miPetición.status === 200) { // http status OK
                let paísJson = JSON.parse(miPetición.responseText);
                console.log(paísJson);
                promesaOK(paísJson);
            } else {
                // la petición no ha venido con 200 OK, o sea que se ha respondido pero algo ha pasado
                console.error('La petición ha venido con un estado distinto a [200 OK]');   
                promesaFail('Error en los datos');
            }
        })

    });
}

// seguimos en v05