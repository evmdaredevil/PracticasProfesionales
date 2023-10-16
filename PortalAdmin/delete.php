<?php
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id']) && isset($_GET['table'])) {
    $id = $_GET['id'];
    $table = $_GET['table'];

    $host = 'localhost';
    $port = '5433';
    $dbname = 'CERTtest';
    $user = 'postgres';
    $password = 'cenapred';

    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

    if (!$conn) {
        die("Connection failed: " . pg_last_error());
    }

    $query = "DELETE FROM $table WHERE id = $id";
    $result = pg_query($conn, $query);

    if ($result) {
        echo "Registro con la id:  $id  ha sido eliminado exitosamente.";
        echo '<script>
        setTimeout(function() {
            window.location.href = "index.php";
        }, 3000); // 1000 milisegundos = 3 segundos
        </script>';
    } else {
        echo "Error: " . pg_last_error($conn);
    }

    pg_close($conn);
} else {
    echo "Invalid request.";
}
?>
