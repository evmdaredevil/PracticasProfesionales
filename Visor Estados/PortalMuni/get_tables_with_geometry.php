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

header('Content-Type: application/json');
echo json_encode($tablesWithGeometry);
?>
