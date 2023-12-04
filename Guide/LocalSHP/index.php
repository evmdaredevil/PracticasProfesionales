<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shapefile Visualizer</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <style>
        #map {
            height: 1000px;
        }
    </style>
</head>
<body>

<div id="map"></div>

<script src="leaflet/leaflet.js"></script>
<script src="proj4.js"></script>
<script src="proj4leaflet.js"></script>
<script src="leaflet/leaflet.shpfile.js"></script>
<script src="leaflet/shp.js"></script>

<script>

    var map = L.map('map', {
        center: [0, 0],
        zoom: 2
    });

    //Capa Base (OSM)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    //Para no tener problemas con CORS, la capa debe estar en el mismo directorio que index.php
   var shapefileLayer = new L.Shapefile('http://localhost/LocalSHP/agebs.zip', {
     onEachFeature: function (feature, layer) {
            console.log('Shapefile Feature Properties:', feature.properties);
            // Muestra el atributo CVE_AGEB de la capa
            layer.bindPopup("Attribute: " + feature.properties.CVE_AGEB);
        }
    });
    shapefileLayer.addTo(map);

    var secondshapefileLayer = new L.Shapefile('http://localhost/LocalSHP/zonas_de_cultivo.zip', {
     onEachFeature: function (feature, layer) {
            console.log('Shapefile Feature Properties for Second Layer:', feature.properties);
            // Muestra el atributo CVE_AGEB de la capa
            layer.bindPopup("Attribute: " + feature.properties.CVE_AGEB);
        }
    });
    secondshapefileLayer.addTo(map);
</script>

</body>
</html>
