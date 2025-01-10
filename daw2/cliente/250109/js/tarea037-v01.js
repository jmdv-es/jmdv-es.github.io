// usamos evento readyState

const URL = 'https://restcountries.com/v3.1/name';

document.getElementById('formulario-buscapais').addEventListener('submit', function (evento) {
    evento.preventDefault(); // no sé que hace esto --- investigar --- importante
    const nombrePaísSolicitado = document.getElementById('nombre-pais').value.toLowerCase().trim();
    if (nombrePaísSolicitado != '') {
        console.log('Vamos a buscar el país: ' + nombrePaísSolicitado);
        obtenerPaís(nombrePaísSolicitado);
    } else {
        console.error('Debes introducir un texto de búsqueda en el formulario.');
        
    }
});

function obtenerPaís(nombrePaísAObtener) {
    const miPetición = new XMLHttpRequest(); // readyState vale 0
    miPetición.open('GET', `${URL}/${nombrePaísAObtener}`, true); // readyState vale 1
    console.log('Procedo a enviar la petición.');
    miPetición.send(); // readyState vale 2 al ejecutarse, 3 mientras se hace y 4 al finalizar
    console.log('La petición ha sido enviada.');
    
    miPetición.addEventListener('readystatechange', function () {
        if (miPetición.readyState === 4) { // estado final
            if (miPetición.status === 200) { // http status OK
                console.log('La petición ha devuelto datos correctamente:');
                console.log(miPetición.responseText); // a ver qué ha venido
                let paísJson = JSON.parse(miPetición.responseText);
                console.log(paísJson);
            } else {
                // la petición no ha venido con 200 OK, o sea que se ha respondido pero algo ha pasado
                console.error('La petición ha venido con un estado distinto a [200 OK]');
                
            }
        } else {
            // El estado de la petición no ha finalizado aún
            // Es decir, aún estará en el 0, 1, 2, 3
        }
    })
    
    // a partir de aquí, continúo el desarrollo en la v02 el desa

}
