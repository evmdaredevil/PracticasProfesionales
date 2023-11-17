// Definir las variables globales para los dropdowns
const estadoDropdown = document.getElementById("estado");
const municipioDropdown = document.getElementById("municipio");

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
