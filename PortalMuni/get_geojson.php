<?php
// Database connection parameters
$host = 'localhost';
$port = '5433';
$dbname = 'PortalMuni';
$user = 'postgres';
$password = 'cenapred';

// Get the table name from the request
$tableName = $_GET['table'];

// Create a database connection
$db = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password");

// Prepare and execute a SQL query to fetch GeoJSON data
$query = "SELECT ST_AsGeoJSON(geometry) AS geojson FROM $tableName";
$result = $db->query($query);

// Fetch the GeoJSON data as an associative array
$data = $result->fetch(PDO::FETCH_ASSOC);

// Output the GeoJSON data with appropriate headers
header('Content-Type: application/json');
echo $data['geojson'];
?>
