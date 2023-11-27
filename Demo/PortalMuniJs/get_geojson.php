<?php
$host = "localhost";
$port = 5433;
$dbname = "PortalMuni";
$user = "postgres";
$password = "cenapred";

$table = $_GET['table'];

try {
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");

    $query = "SELECT *, ST_AsGeoJSON(geometry) AS geojson FROM $table";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $features = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $properties = $row;
        unset($properties['geometry']); 
        $geometry = json_decode($row['geojson']);
        $feature = [
            'type' => 'Feature',
            'geometry' => $geometry,
            'properties' => $properties,
        ];
        $features[] = $feature;
    }

    $geojson = [
        'type' => 'FeatureCollection',
        'features' => $features,
    ];

    header('Content-Type: application/json');
    echo json_encode($geojson);
} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?>
