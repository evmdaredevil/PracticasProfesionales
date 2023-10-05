<?php
$host = 'localhost';
$port = '5433';
$dbname = 'PortalMuni';
$user = 'postgres';
$password = 'cenapred';

// Connect to the PostgreSQL database
$dsn = "pgsql:host=$host;port=$port;dbname=$dbname;user=$user;password=$password";
try {
    $pdo = new PDO($dsn);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}

// Query to get a list of tables with geometry columns
$sql = "
    SELECT table_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND data_type = 'USER-DEFINED'
      AND udt_name = 'geometry';
";

$tables = $pdo->query($sql)->fetchAll(PDO::FETCH_COLUMN);

// Close the database connection
$pdo = null;
?>
