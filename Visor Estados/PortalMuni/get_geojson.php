<?php
$host = 'localhost';
$port = '5433';
$dbname = 'PortalMuni';
$user = 'postgres';
$password = 'cenapred';

$tableName = $_GET['table'];

$db = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");

$query = "SELECT ST_AsGeoJSON(geometry) AS geojson, * FROM $tableName";
$result = $db->query($query);

$geojson = [
    'type' => 'FeatureCollection',
    'features' => []
];

while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $feature = [
        'type' => 'Feature',
        'geometry' => json_decode($row['geojson']),
        'properties' => $row 
    ];
    unset($feature['properties']['geojson']); 
    $geojson['features'][] = $feature;
}

header('Content-Type: application/json');
echo json_encode($geojson);
?>
