<?php
$db = new PDO("pgsql:host=localhost;port=5433;dbname=CERTtest", "postgres", "cenapred");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Consulta para obtener todos los valores posibles de cNombreEquipo
$query = "SELECT DISTINCT cNombreEquipo FROM grupocert";
$result = $db->query($query);
$equipos = $result->fetchAll(PDO::FETCH_COLUMN);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Prueba página registro de miembros</title>
</head>
<body>
    <h1>Selecciona un equipo:</h1>
    <form action="procesar.php" method="POST">
        <select name="cNombreEquipo">
            <?php
            foreach ($equipos as $equipo) {
                echo "<option value='$equipo'>$equipo</option>";
            }
            ?>
        </select>
        <br><br>
        <label for="texto">Texto:</label>
        <input type="text" id="texto" name="texto">
        <br><br>
        <input type="submit" value="Aceptar">
    </form>
</body>
</html>
