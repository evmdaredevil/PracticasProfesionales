<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map Viewer</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            background-image: url('rsc/1.jpg');
            background-size: cover;
            background-repeat: no-repeat;
            margin: 0;
            padding: 0;
        }

        #content-container {
            display: block;
            max-width: 80%;
            margin: 0 auto;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        h1 {
    text-align: center;
    background-color: #BD955D;
    color: ghostwhite;
    padding: 20px;
        }

        #map {
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="content-container">
        <h1>Visor de Grupos CERT</h1>
        <div id="map" style="height: 1000px;"></div>
    </div>
    <script>
        var map = L.map('map').setView([19.4326, -99.1332], 10); 

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var points = <?php
            $db = new PDO("pgsql:host=localhost;port=5433;dbname=CERTtest", "postgres", "cenapred");
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Fetch points and data from the database
            $query = "SELECT ST_AsText(coordenadas) as point, cnombreresponsable, csegundoapellidoresponsable, cemail, fechacreacion FROM grupocert";
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
                        'popupContent' => "Name: " . $pointData['cnombreresponsable'] . "<br>Second Name: " . $pointData['csegundoapellidoresponsable'] . "<br>Email: " . $pointData['cemail'] . $pointData['fechacreacion']
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
