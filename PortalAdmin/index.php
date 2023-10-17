<!DOCTYPE html>
<html lang="es">
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portal Administradores CERT</title>
    <link rel="icon" href="rsc/cenapred.png">
    <link rel="stylesheet" href="styles.css">   
    <title>Database Admin</title>
</head>
<body>
    <h1>Administrar Grupos o Miembros</h1>

    <form method="post">
        <label for="action">Seleccione una opción:</label>
        <select name="action">
            <option value="grupos">Administrar Grupos</option>
            <option value="miembros">Administrar Miembros</option>
        </select>
        <input type="submit" value="Elegir">
    

    <?php
    function connectToDatabase() {
        $host = 'localhost';
        $port = '5433';
        $dbname = 'CERTtest';
        $user = 'postgres';
        $password = 'cenapred';
        $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
        return $conn;
    }

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $action = $_POST["action"];
        $conn = connectToDatabase();

        if ($action === "grupos") {
            $query = "SELECT * FROM grupocert";
            $result = pg_query($conn, $query);

            echo "<h2>REGISTROS DE GRUPOS CERT'</h2>";
            echo "<table border='1'>";
            echo "<tr><th>ID</th><th>Nombre del Equipo</th><th>Fecha de Creación</th><th>Nombre del Responsable</th><th>Primer Apellido del Responsable</th><th>Segundo Apellido del Responsable</th><th>Calle</th><th>Colonia</th><th>Ciudad</th><th>Estado</th><th>Teléfono</th><th>Código Postal</th><th>Correo Electrónico</th><th>Acción</th></tr>";
            while ($row = pg_fetch_assoc($result)) {
                echo "<tr>";
                echo "<td>" . $row['id'] . "</td>";
                echo "<td>" . $row['cnombreequipo'] . "</td>";
                echo "<td>" . $row['fechacreacion'] . "</td>";
                echo "<td>" . $row['cnombreresponsable'] . "</td>";
                echo "<td>" . $row['cprimerapellidoresponsable'] . "</td>";
                echo "<td>" . $row['csegundoapellidoresponsable'] . "</td>";
                echo "<td>" . $row['cdomiciliocalle'] . "</td>";
                echo "<td>" . $row['ccolonia'] . "</td>";
                echo "<td>" . $row['cciudad'] . "</td>";
                echo "<td>" . $row['cestado'] . "</td>";
                echo "<td>" . $row['ctelefono'] . "</td>";
                echo "<td>" . $row['cpostal'] . "</td>";
                echo "<td>" . $row['cemail'] . "</td>";
                echo "<td><a href='delete.php?id=" . $row['id'] . "&table=grupocert'>Eliminar</a></td>";
                echo "</tr>";
            }
            echo "</table>";
        } elseif ($action === "miembros") {
            $query = "SELECT * FROM miembrosgrupocert";
            $result = pg_query($conn, $query);

            echo "<h2>REGISTROS DE MIEMBROS DE GRUPOS CERT'</h2>";
            echo "<table border='1'>";
            echo "<tr><th>ID</th><th>Nombre del Equipo</th><th>Nombre</th><th>Primer Apellido</th><th>Segundo Apellido</th><th>Número de Contacto</th><th>Acción</th></tr>";
            while ($row = pg_fetch_assoc($result)) {
                echo "<tr>";
                echo "<td>" . $row['id'] . "</td>";
                echo "<td>" . $row['cnombreequipo'] . "</td>";
                echo "<td>" . $row['nombre'] . "</td>";
                echo "<td>" . $row['primerapellido'] . "</td>";
                echo "<td>" . $row['segundoapellido'] . "</td>";
                echo "<td>" . $row['numerocontacto'] . "</td>";
                echo "<td><a href='delete.php?id=" . $row['id'] . "&table=miembrosgrupocert'>Eliminar</a></td>";
                echo "</tr>";
            }
            echo "</table>";
        }

        pg_close($conn);
    }
    ?>
    </form>
</body>
</html>
