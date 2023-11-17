<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visor Estados/Municipios</title>
    <link rel="icon" href="rsc/cenapred.png">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.css"/>
    <link rel="stylesheet" href="map.css" /> 
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-draw@1.0.4/dist/leaflet.draw.js"></script>
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

        L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
            maxZoom: 19,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map);

        var overlayLayers = {};
        var layerControl = L.control.layers().addTo(map);
        var drawnItems = new L.FeatureGroup().addTo(map);

        var drawControl = new L.Control.Draw({
            draw: {
                circle: true,
                polygon: false,
                polyline: false,
                rectangle: false,
                marker: false
            },
            edit: {
                featureGroup: drawnItems,
                remove: true
            }
        });
        map.addControl(drawControl);

        map.on('draw:created', function (e) {
            var layer = e.layer;
            drawnItems.clearLayers().addLayer(layer);
            filterDataWithinRadius(layer);
        });

        map.on('draw:edited', function (e) {
            drawnItems.clearLayers();
            var layers = e.layers;
            layers.eachLayer(function (layer) {
                drawnItems.addLayer(layer);
            });
            filterDataWithinRadius(drawnItems);
        });

        map.on('draw:deleted', function () {
            drawnItems.clearLayers();
            for (var tableName in overlayLayers) {
                if (overlayLayers.hasOwnProperty(tableName)) {
                    map.addLayer(overlayLayers[tableName]);
                }
            }
        });

        function filterDataWithinRadius(circle) {
            var radius = circle.getRadius();
            var center = circle.getLatLng();

            // Iterate over loaded layers and filter based on circle's area
            for (var tableName in overlayLayers) {
                if (overlayLayers.hasOwnProperty(tableName)) {
                    var layer = overlayLayers[tableName];
                    layer.eachLayer(function (feature) {
                        var featureLatLng = feature.getLatLng();
                        var distance = center.distanceTo(featureLatLng);

                        if (distance > radius) {
                            map.removeLayer(feature);
                        }
                    });
                }
            }
        }

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

        // Load table names from the JSON file
        fetch('tables_with_geometry.json')
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

                tablesWithGeometry.tables.forEach(function (tableName) {
                    loadGeoJSON(tableName);
                });
            });
    </script>
</body>
</html>
