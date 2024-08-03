// Función para generar una cadena aleatoria de 3 caracteres
function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}

// Obtén la URL actual
const urlActual = window.location.href;

// Verifica si el parámetro 'nombre' ya está presente en la URL
const parametros = new URLSearchParams(window.location.search);
let carpetaNombre = parametros.get("nombre");

if (!carpetaNombre) {
    // Si 'nombre' no está presente, genera una cadena aleatoria
    carpetaNombre = generarCadenaAleatoria();
    // Redirige a la nueva URL con los dígitos generados
    const urlConParametros = urlActual.split('?')[0]; // Eliminamos los parámetros de la URL actual
    const urlConCadena = `${urlConParametros}?nombre=${carpetaNombre}`; // Redirigimos a la URL con los dígitos generados
    window.location.href = urlConCadena;
} else {
    /* Actualiza la URL para ocultar el parámetro 'nombre'
    const urlSinParametros = urlActual.split('?')[0]; // Eliminamos los parámetros de la URL actual
    const urlConCadena = `${urlSinParametros}${carpetaNombre}`; // Agregamos los dígitos generados a la URL sin parámetros
    window.history.replaceState({}, document.title, urlConCadena);
    */ //Muestra la URL actual en el elemento <p>
    document.getElementById('current-url').textContent = urlConCadena;
}

// Función para manejar archivos (especifica el origen del evento)
function handleFile(files) {
    if (files.length > 0) {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('archivos[]', files[i]);
        }

        // Obtén el nombre de la carpeta desde la URL actual
        const urlPartes = window.location.pathname.split('/');
        const carpetaNombre = urlPartes[urlPartes.length - 1]; // Asumimos que la carpeta nombre es la última parte del pathname

        // Añade el parámetro 'nombre' al FormData
        if (carpetaNombre) {
            formData.append('nombre', carpetaNombre);
        }

        fetch('index.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            // Aquí puedes mostrar un mensaje de éxito o realizar otras acciones después de la subida
        })
        .catch(error => {
            console.error('Error al subir los archivos:', error);
            // Aquí puedes mostrar un mensaje de error
        });
    }
}
