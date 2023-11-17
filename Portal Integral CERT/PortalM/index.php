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
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Registro de Miembros CERT</title>
    <link rel="icon" href="rsc/cenapred.png">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div id="overlay">
        <div id="disclaimer">
            <br>
            
            <br>
            <p>La Escuela Nacional de Protección Civil está orientada a la formación sistemática e institucionalizada de capital humano que realiza actividades de la gestión integral del riesgo, como prevención, mitigación y manejo de emergencias.</p>
            <p>El programa de Equipos Comunitarios de Respuesta a Emergencias (CERT, por sus siglas en inglés) es una iniciativa impulsada por el CENAPRED, para ser implementada localmente, que enseña a las personas a prepararse mejor para los peligros que pueden afectar a sus comunidades.</p>
            <p>Para una mejor coordinación, el sistema requiere el registro de sus participantes y la ubicación de los equipos CERT que formalmente se van constituyendo en el país.</p>
            <br>
            
            <br>
            <button id="cerrarButton">CERRAR</button>
        </div>
    </div>
    <form action="insertar_registro.php" method="POST">
    <h3>Registro de Miembros Equipo CERT</h3>
    <p>En este apartado recabaremos la información del miembro del equipo CERT que se ha conformado. Favor de llenar todos los campos.</p>
    <h1>Formulario de Registro de Miembro CERT</h1>
    <label>Selecciona un equipo:</label>
    <select name="cNombreEquipo">
        <?php
        foreach ($equipos as $equipo) {
            echo "<option value='$equipo'>$equipo</option>";
        }
        ?>
    </select>
    <h2>Miembro del Grupo CERT</h2>

    <label for="Nombre">Nombre del Miembro:</label>
    <input type="text" id="Nombre" name="Nombre" required><br>

    <label for="PrimerApellido">Primer Apellido del Miembro:</label>
    <input type="text" id="PrimerApellido" name="PrimerApellido" required><br>

    <label for="SegundoApellido">Segundo Apellido del Miembro:</label>
    <input type="text" id="SegundoApellido" name="SegundoApellido" required><br>

    <label for="NumeroContacto">Número de Contacto del Miembro:</label>
    <input type="text" id="NumeroContacto" name="NumeroContacto" required><br>

    <button type="submit">Guardar Registro</button>
    </br></br>
    <img class="centered-image" src="rsc\logos_firma conjunta.png"  alt="CERT Logo" width="55%" height="55%">
</form>
<script>
    cerrarButton.addEventListener('click', function () {
    overlay.style.display = 'none';
});
</script>
</body>
</html>
