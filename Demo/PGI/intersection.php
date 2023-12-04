<?php
$host = 'localhost';
$port = '5433';
$dbname = 'PortalMuni';
$user = 'postgres';
$password = 'cenapred';

try {
    // Connect to PostgreSQL
    $db = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the drawn polygon coordinates from the AJAX request
    $drawnPolygon = json_decode($_POST['drawnPolygon']);

    // Get the active GeoJSON layer coordinates from the database
    $activeLayer = 'curvas_de_nivel'; // Change this to match your active layer
    $query = "SELECT ST_AsGeoJSON(geometry) AS geojson FROM $activeLayer";
    $result = $db->query($query);
    $activeLayerGeoJSON = json_decode($result->fetchColumn());

    // Perform the intersection using PostGIS
    $query = "SELECT ST_AsGeoJSON(ST_Intersection(
        ST_GeomFromGeoJSON(:drawnPolygon),
        ST_GeomFromGeoJSON(:activeLayer)
    )) AS intersection";
    
    $statement = $db->prepare($query);
    $statement->bindParam(':drawnPolygon', json_encode($drawnPolygon));
    $statement->bindParam(':activeLayer', json_encode($activeLayerGeoJSON->features[0]->geometry));
    $statement->execute();
    $intersection = $statement->fetchColumn();

    // Return the intersection result
    echo $intersection;
} catch (PDOException $e) {
    // Handle database connection or query errors
    http_response_code(500);
    echo "Error: " . $e->getMessage();
}
?>
