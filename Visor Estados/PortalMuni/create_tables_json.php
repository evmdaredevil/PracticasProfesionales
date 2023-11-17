<?php
$host = 'localhost';
$port = '5433';
$dbname = 'PortalMuni';
$user = 'postgres';
$password = 'cenapred';

$connection = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$connection) {
    die("Connection failed");
}

$query = "
    SELECT table_name
    FROM information_schema.columns
    WHERE column_name = 'geometry' AND table_schema = 'public';
";

$result = pg_query($connection, $query);

if (!$result) {
    die("Query failed");
}

$tablesWithGeometry = [];
while ($row = pg_fetch_assoc($result)) {
    $tablesWithGeometry[] = $row['table_name'];
}

pg_close($connection);

$data = [
    'tables' => $tablesWithGeometry,
];

// Write the data to a JSON file
$jsonFileName = 'tables_with_geometry.json';
file_put_contents($jsonFileName, json_encode($data));

echo "JSON file created: $jsonFileName";
?>
