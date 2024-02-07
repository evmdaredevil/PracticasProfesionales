<?php
$db = new PDO("pgsql:host=localhost;port=5432;dbname=CERTtest", "postgres", "cenapred");
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$equipoSeleccionado = '';

$query = "SELECT DISTINCT cNombreEquipo FROM grupocert";
$result = $db->query($query);
$equipos = $result->fetchAll(PDO::FETCH_COLUMN);

if (isset($_POST['cNombreEquipo'])) {
    $equipoSeleccionado = $_POST['cNombreEquipo'];

    $queryMiembros = "SELECT nombre, primerapellido, segundoapellido, numerocontacto FROM miembrosgrupocert WHERE cNombreEquipo = :equipo";
    $stmt = $db->prepare($queryMiembros);
    $stmt->bindParam(':equipo', $equipoSeleccionado);
    $stmt->execute();
    $miembros = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visor Grupos CERT</title>
    <link rel="icon" href="rsc/cenapred.png">
    <link rel="stylesheet" href="map.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css">
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
</head>
<body>
    
    <div id="content-container">
    <img class="centered-image" src="rsc\logos_firma conjunta.png"  alt="CERT Logo" width="55%" height="55%">
        <h1>Visor Grupos CERT</h1>
        <div id="map" style="height: 1000px;"></div>
        <h1>Miembros del Equipo:</h1>
        <form method="POST">
            <select name="cNombreEquipo" style="width: 80%; height: 25px; text-align:center">
                <?php
                foreach ($equipos as $equipo) {
                    $selected = ($equipo == $equipoSeleccionado) ? 'selected' : '';
                    echo "<option value='$equipo' $selected>$equipo</option>";
                }
                ?>
            </select>
            <input type="submit" value="Generar Lista de Miembros">
            <br><br>
        </form>

        <?php
        if (isset($miembros)) {
            echo "<h3>Miembros de $equipoSeleccionado:</h3>";
            echo "<ul>";
            foreach ($miembros as $miembro) {
                echo "<li><label><b>Nombre:     </b></label>{$miembro['nombre']} {$miembro['primerapellido']} {$miembro['segundoapellido']}  </br><label><b>Número de contacto:     </b></label>{$miembro['numerocontacto']}</li></br>";
            }
            echo "</ul>";
        }
        ?>
    </div>
    </div>
    

    <script>
        var map = L.map('map').setView([19.4326, -99.1332], 10); 
        L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
            maxZoom: 19,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map);
        var points = <?php
            $db = new PDO("pgsql:host=localhost;port=5432;dbname=CERTtest", "postgres", "cenapred");
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Fetch points and data from the database
            $query = "SELECT ST_AsText(coordenadas) as point, cnombreequipo, cnombreresponsable, csegundoapellidoresponsable, cemail, fechacreacion FROM grupocert";
            $stmt = $db->prepare($query);
            $stmt->execute();
            $points = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // Convert points and data to JavaScript array
            $jsPoints = [];
            foreach ($points as $pointData) {
                $coords = preg_match('/POINT\(([^)]+)\)/', $pointData['point'], $matches);
                if ($coords) {
                    list($lon, $lat) = explode(' ', $matches[1]);
                    $jsPoints[] = [
                        'lat' => $lat,
                        'lon' => $lon,
                        'popupContent' => "Nombre del Equpo: ". $pointData['cnombreequipo'] ."<br>Nombre del Resonsable: " . $pointData['cnombreresponsable'] . " " . $pointData['csegundoapellidoresponsable'] . "<br>Email: " . $pointData['cemail'] . "<br>Fecha de Creación: " . $pointData['fechacreacion']
                    ];
                }
            }

            echo json_encode($jsPoints);
        ?>;
        points.forEach(function (point) {
            var marker = L.marker([point.lat, point.lon]).addTo(map);
            marker.bindPopup(point.popupContent);
        });
    </script>
</body>
</html>
