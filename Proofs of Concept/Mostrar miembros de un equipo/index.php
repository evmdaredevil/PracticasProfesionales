<?php
$db = new PDO("pgsql:host=localhost;port=5433;dbname=CERTtest", "postgres", "cenapred");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Consulta para obtener todos los valores posibles de cNombreEquipo
$query = "SELECT DISTINCT cNombreEquipo FROM grupocert";
$result = $db->query($query);
$equipos = $result->fetchAll(PDO::FETCH_COLUMN);

// Verificar si se ha seleccionado un equipo
if (isset($_POST['cNombreEquipo'])) {
    $equipoSeleccionado = $_POST['cNombreEquipo'];

    // Consulta para obtener los miembros del equipo seleccionado
    $queryMiembros = "SELECT nombre, primerapellido, segundoapellido, numerocontacto FROM miembrosgrupocert WHERE cNombreEquipo = :equipo";
    $stmt = $db->prepare($queryMiembros);
    $stmt->bindParam(':equipo', $equipoSeleccionado);
    $stmt->execute();
    $miembros = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Prueba página registro de miembros</title>
</head>
<body>
    <h1>Selecciona un equipo:</h1>
    <form method="POST">
        <select name="cNombreEquipo">
            <?php
            foreach ($equipos as $equipo) {
                $selected = ($equipo == $equipoSeleccionado) ? 'selected' : '';
                echo "<option value='$equipo' $selected>$equipo</option>";
            }
            ?>
        </select>
        <input type="submit" value="Mostrar Miembros">
        <br><br>
    </form>

    <?php
    if (isset($miembros)) {
        echo "<h2>Miembros de $equipoSeleccionado:</h2>";
        echo "<ul>";
        foreach ($miembros as $miembro) {
            echo "<li><label>Nombre del Miembro del Equipo: </label>{$miembro['nombre']} {$miembro['primerapellido']} {$miembro['segundoapellido']} - </br><label>Número de contacto: </label>{$miembro['numerocontacto']}</li></br>";
        }
        echo "</ul>";
    }
    ?>
</body>
</html>
