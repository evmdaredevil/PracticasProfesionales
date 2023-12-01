<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shapefile Visualizer</title>
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <style>
        #map {
            height: 500px;
        }
    </style>
</head>
<body>

<div id="map"></div>

<!-- Leaflet JS -->
<script src="leaflet/leaflet.js"></script>
<!-- Proj4Leaflet JS -->
<script src="proj4.js"></script>
<script src="proj4leaflet.js"></script>
<!-- Leaflet Shapefile plugin -->
<script src="leaflet/leaflet.shpfile.js"></script>
<script src="leaflet/shp.js"></script>

<script>

    var map = L.map('map', {
        center: [0, 0],
        zoom: 2
    });

    // Add OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add shapefile layer
   //var shapefileLayer = new L.Shapefile('https://www.inegi.org.mx/contenidos/productos/prod_serv/contenidos/espanol/bvinegi/productos/geografia/imagen_cartografica/1_50_000/889463861379_s.zip', {
   var shapefileLayer = new L.Shapefile('http://localhost/LocalSHP/agebs.zip', {

     onEachFeature: function (feature, layer) {
            console.log('Shapefile Feature Properties:', feature.properties);
            // You can customize popup content here
            layer.bindPopup("Attribute: " + feature.properties.CVE_AGEB);
        }
    });
    shapefileLayer.addTo(map);
</script>

</body>
</html>
