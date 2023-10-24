
const overlay = document.getElementById('overlay');
const cerrarButton = document.getElementById('cerrarButton');
const estadoDropdown = document.getElementById("cEstado");
const municipioDropdown = document.getElementById("cMunicipio");

cerrarButton.addEventListener('click', function () {
    overlay.style.display = 'none';
});

// Función para cargar los estados desde el archivo CSV
function cargarEstados() {
    fetch("edomuni.csv")
        .then(response => response.text())
        .then(data => {
            const filas = data.split("\n");
            const estados = new Set();

            for (let i = 1; i < filas.length; i++) {
                const columnas = filas[i].split(",");
                estados.add(columnas[0]);
            }


            estados.forEach(estado => {
                const option = document.createElement("option");
                option.value = estado;
                option.textContent = estado;
                estadoDropdown.appendChild(option);
            });
        });
}

function actualizarMunicipios() {
    municipioDropdown.innerHTML = '<option value="">Selecciona un municipio</option>';
    const estadoSeleccionado = estadoDropdown.value;

    if (estadoSeleccionado) {
        fetch("edomuni.csv")
            .then(response => response.text())
            .then(data => {
                const filas = data.split("\n");

                for (let i = 1; i < filas.length; i++) {
                    const columnas = filas[i].split(",");
                    const estado = columnas[0];
                    const municipio = columnas[1];

                    if (estado === estadoSeleccionado) {
                        const option = document.createElement("option");
                        option.value = municipio;
                        option.textContent = municipio;
                        municipioDropdown.appendChild(option);
                    }
                }
            });
    }
}

cargarEstados();

// Immediately show the overlay when the page loads
window.addEventListener('load', function () {
    overlay.style.display = 'block';
});

const mapa = L.map('mapa').setView([23.6345, -102.5528], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(mapa);

const search = new GeoSearch.GeoSearchControl({
    provider: new GeoSearch.OpenStreetMapProvider(),
    });
mapa.addControl(search);
let lastMarker = null;

mapa.on('click', function (e) {
    const latitud = e.latlng.lat;
    const longitud = e.latlng.lng;

    document.getElementById('Latitud').value = latitud;
    document.getElementById('Longitud').value = longitud;
    // Remove the previous marker, if any
    if (lastMarker) {
        mapa.removeLayer(lastMarker);
    }

    // Add a new marker at the clicked location
    lastMarker = L.marker([latitud, longitud]).addTo(mapa);
});