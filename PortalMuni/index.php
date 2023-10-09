<!DOCTYPE html>
<html>
<head>
    <title>Map Viewer</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="stylesheet" href="map.css" /> 
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
</head>
<body>
    <div id="map-container">
        <div id="map"></div>
        <div class="page-icon"></div> 
    </div>

    <script>
        var map = L.map('map', {
            center: L.latLng(19.1987, -101.9765), 
            zoom: 10
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var overlayLayers = {};
        var layerControl = L.control.layers().addTo(map); 

        function loadGeoJSON(tableName) {
            fetch(`get_geojson.php?table=${tableName}`)
                .then(response => response.json())
                .then(data => {
                    overlayLayers[tableName] = L.geoJSON(data, {
                        onEachFeature: function (feature, layer) {
                            var popupContent = '<div>';
                            for (var key in feature.properties) {
                                if (feature.properties.hasOwnProperty(key)) {
                                    popupContent += '<strong>' + key + ':</strong> ' + feature.properties[key] + '<br>';
                                }
                            }
                            popupContent += '</div>';
                            layer.bindPopup(popupContent);
                        }
                    });

                    if (map.hasLayer(overlayLayers[tableName])) {
                        map.addLayer(overlayLayers[tableName]);
                    }
                    layerControl.addOverlay(overlayLayers[tableName], tableName);
                });
        }

        fetch('get_tables_with_geometry.php')
            .then(response => response.json())
            .then(tablesWithGeometry => {
                map.on('overlayadd', function (e) {
                    var layer = e.layer;
                    layerControl.addOverlay(layer, e.name);
                });

                map.on('overlayremove', function (e) {
                    var layer = e.layer;
                    layerControl.removeLayer(layer);
                });

                tablesWithGeometry.forEach(function (tableName) {
                    loadGeoJSON(tableName);
                });
            });
    </script>
</body>
</html>
