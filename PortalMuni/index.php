<!DOCTYPE html>
<html>
<head>
    <title>Map Viewer</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
</head>
<body>
    <div id="map" style="height: 500px;"></div>

    <script>
        // Define the custom CRS for EPSG:3857 (Web Mercator)
        var customCRS = L.CRS.EPSG3857;

        var map = L.map('map', {
            crs: customCRS,
            center: L.latLng(19.4326, -99.1332), // Set the center directly
            zoom: 10
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        function loadGeoJSON(tableName) {
            fetch(`get_geojson.php?table=${tableName}`)
                .then(response => response.json())
                .then(data => {
                    L.geoJSON(data).addTo(map);
                });
        }

        fetch('get_tables_with_geometry.php')
            .then(response => response.json())
            .then(tablesWithGeometry => {
                var overlayLayers = {};
                tablesWithGeometry.forEach(function(tableName) {
                    overlayLayers[tableName] = L.layerGroup();
                });

                L.control.layers(null, overlayLayers).addTo(map);

                map.on('overlayadd', function(e) {
                    var tableName = e.name;
                    loadGeoJSON(tableName);
                });

                tablesWithGeometry.forEach(function(tableName) {
                    loadGeoJSON(tableName);
                });
            });
    </script>
</body>
</html>
