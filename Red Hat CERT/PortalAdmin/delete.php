<?php
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['id']) && isset($_GET['table'])) {
    $id = $_GET['id'];
    $table = $_GET['table'];

    $host = 'localhost';
    $port = '5432';
    $dbname = 'CERTtest';
    $user = 'postgres';
    $password = 'cenapred';

    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

    if (!$conn) {
        die("Connection failed: " . pg_last_error());
    }

    if ($table === 'grupocert') {
        // If the table is 'grupocert', fetch the related Miembros first
        $query = "SELECT cnombreequipo FROM grupocert WHERE id = $id";
        $result = pg_query($conn, $query);

        if ($row = pg_fetch_assoc($result)) {
            $equipoName = $row['cnombreequipo'];

            // Delete the Grupo
            $query = "DELETE FROM $table WHERE id = $id";
            $result = pg_query($conn, $query);

            if ($result) {
                echo "Registro con la id: $id ha sido eliminado exitosamente.";
                echo '<script>
                setTimeout(function() {
                    window.location.href = "index.php";
                }, 3000);
                </script>';

                // Delete related Miembros with the same cnombreequipo
                $query = "DELETE FROM miembrosgrupocert WHERE cnombreequipo = '$equipoName'";
                $result = pg_query($conn, $query);

                if ($result) {
                    echo "Los Miembros relacionados con el Grupo '$equipoName' también han sido eliminados.";
                } else {
                    echo "Error al eliminar los Miembros relacionados: " . pg_last_error($conn);
                }
            } else {
                echo "Error: " . pg_last_error($conn);
            }
        } else {
            echo "No se encontró el Grupo con la id: $id";
        }
    } elseif ($table === 'miembrosgrupocert') {
        // If the table is 'miembrosgrupocert', simply delete the Miembro
        $query = "DELETE FROM $table WHERE id = $id";
        $result = pg_query($conn, $query);

        if ($result) {
            echo "Registro con la id: $id ha sido eliminado exitosamente.";
            echo '<script>
            setTimeout(function() {
                window.location.href = "index.php";
            }, 3000);
            </script>';
        } else {
            echo "Error: " . pg_last_error($conn);
        }
    } else {
        echo "Tabla no válida.";
    }

    pg_close($conn);
} else {
    echo "Solicitud no válida.";
}
?>
