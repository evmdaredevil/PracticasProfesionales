<?php
$host = 'localhost';
$port = '5433';
$dbname = 'PortalMuni';
$user = 'postgres';
$password = 'cenapred';

if (!isset($_GET['table'])) {
    die("Table parameter is missing in the URL.");
}

$table = $_GET['table'];

$connection = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$connection) {
    die("Connection failed");
}

$query = "SELECT ST_AsGeoJSON(geometry) AS geojson FROM $table";
echo "Query: $query"; // Debugging

$result = pg_query($connection, $query);

if (!$result) {
    die("Query failed: " . pg_last_error($connection));
}

$geojson = [
    'type' => 'FeatureCollection',
    'features' => [],
];

while ($row = pg_fetch_assoc($result)) {
    $feature = json_decode($row['geojson']);
    if ($feature) {
        $geojson['features'][] = $feature;
    } else {
        echo "Invalid GeoJSON data in the database for table: $table";
    }
}

header('Content-Type: application/json');
echo json_encode($geojson);

pg_close($connection);
?>
