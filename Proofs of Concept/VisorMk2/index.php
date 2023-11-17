<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visor Grupos CERT</title>
    <link rel="icon" href="rsc/cenapred.png">
    <link rel="stylesheet" href="map.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
</head>
<body>
    
    <div id="content-container">
        <h1>Visor Grupos CERT</h1>
        <div id="map" style="height: 1000px;"></div>
    </div>

    <script>
        var map = L.map('map').setView([19.4326, -99.1332], 10); // Centered on Mexico City
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        var points = <?php
            $db = new PDO("pgsql:host=localhost;port=5433;dbname=CERTtest", "postgres", "cenapred");
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Fetch points and data from the database
            $query = "SELECT ST_AsText(coordenadas) as point, cnombreequipo, cnombreresponsable, csegundoapellidoresponsable, cemail, fechacreacion FROM grupocert";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $points = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // Convert points and data to JavaScript array
            $jsPoints = [];
            foreach ($points as $pointData) {
                $coords = preg_match('/POINT\(([^)]+)\)/', $pointData['point'], $matches);
                if ($coords) {
                    list($lon, $lat) = explode(' ', $matches[1]);
                    $jsPoints[] = [
                        'lat' => $lat,
                        'lon' => $lon,
                        'popupContent' => "Nombre del Equpo: ". $pointData['cnombreequipo'] ."<br>Nombre del Resonsable: " . $pointData['cnombreresponsable'] . " " . $pointData['csegundoapellidoresponsable'] . "<br>Email: " . $pointData['cemail'] . "<br>Fecha de Creación: " . $pointData['fechacreacion']
                    ];
                }
            }

            echo json_encode($jsPoints);
        ?>;
        points.forEach(function (point) {
            var marker = L.marker([point.lat, point.lon]).addTo(map);
            marker.bindPopup(point.popupContent);
        });
    </script>
</body>
</html>
