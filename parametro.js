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

// Verifica si el path contiene una carpeta con 3 caracteres alfanuméricos
const urlActualPath = window.location.pathname;
const urlPartes = urlActualPath.split('/');
const carpetaActual = urlPartes[urlPartes.length - 1];
const esCadenaAleatoria = /^[a-z0-9]{3}$/.test(carpetaActual);

// Si la última parte del path no es una cadena aleatoria de 3 caracteres, redirige
if (!esCadenaAleatoria) {
    const nuevaCadena = generarCadenaAleatoria();
    const nuevaUrl = `${window.location.origin}${window.location.pathname.replace(/[^\/]*$/, nuevaCadena)}`;
    window.location.href = nuevaUrl;
} else {
    document.getElementById('current-url').textContent = window.location.href;
}

// Función para manejar archivos
function handleFile(files) {
    if (files.length > 0) {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('archivos[]', files[i]);
        }

        const carpetaNombre = carpetaActual; // Reutiliza el valor de carpetaActual

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
