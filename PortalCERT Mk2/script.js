const overlay = document.getElementById('overlay');
        const cerrarButton = document.getElementById('cerrarButton');

        cerrarButton.addEventListener('click', function () {
            overlay.style.display = 'none';
        });

        // Immediately show the overlay when the page loads
        window.addEventListener('load', function () {
            overlay.style.display = 'block';
        });

        const mapa = L.map('mapa').setView([23.6345, -102.5528], 6); 
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }).addTo(mapa);
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