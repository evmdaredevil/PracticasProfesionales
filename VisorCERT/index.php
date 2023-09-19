<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Map Viewer</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
</head>
<body>
    <div id="map" style="height: 400px;"></div>
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
        $query = "SELECT ST_AsText(coordenadas) as point, cnombreresponsable, csegundoapellidoresponsable, cemail FROM grupocert";
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
                    'popupContent' => "Name: " . $pointData['cnombreresponsable'] . "<br>Second Name: " . $pointData['csegundoapellidoresponsable'] . "<br>Email: " . $pointData['cemail']
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
