<?php
try {
    $db = new PDO("pgsql:host=localhost;port=5433;dbname=CERTtest", "postgres", "cenapred");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $cNombreEquipo = $_POST["cNombreEquipo"];
    $FechaCreacion = $_POST["FechaCreacion"];
    $cNombreResponsable = $_POST["cNombreResponsable"];
    $cPrimerApellidoResponsable = $_POST["cPrimerApellidoResponsable"];
    $cSegundoApellidoResponsable = $_POST["cSegundoApellidoResponsable"];
    $cDomicilioCalle = $_POST["cDomicilioCalle"];
    $cColonia = $_POST["cColonia"];
    $cCiudad = $_POST["cCiudad"];
    $cEstado = $_POST["cEstado"];
    $cTelefono = $_POST["cTelefono"];
    $cPostal = $_POST["cPostal"];
    $cEmail = $_POST["cEmail"];
    $Latitud = $_POST["Latitud"];
    $Longitud = $_POST["Longitud"];

    $sql = "INSERT INTO GrupoCERT (cNombreEquipo, FechaCreacion, cNombreResponsable, cPrimerApellidoResponsable, cSegundoApellidoResponsable, cDomicilioCalle, cColonia, cCiudad, cEstado, cTelefono, cPostal, cEmail, coordenadas) 
            VALUES (:cNombreEquipo, :FechaCreacion, :cNombreResponsable, :cPrimerApellidoResponsable, :cSegundoApellidoResponsable, :cDomicilioCalle, :cColonia, :cCiudad, :cEstado, :cTelefono, :cPostal, :cEmail, ST_GeomFromText(:coordenadas, 4326))";
    
    $stmt = $db->prepare($sql);
    $stmt->bindValue(":cNombreEquipo", $cNombreEquipo);
    $stmt->bindValue(":FechaCreacion", $FechaCreacion);
    $stmt->bindValue(":cNombreResponsable", $cNombreResponsable);
    $stmt->bindValue(":cPrimerApellidoResponsable", $cPrimerApellidoResponsable);
    $stmt->bindValue(":cSegundoApellidoResponsable", $cSegundoApellidoResponsable);
    $stmt->bindValue(":cDomicilioCalle", $cDomicilioCalle);
    $stmt->bindValue(":cColonia", $cColonia);
    $stmt->bindValue(":cCiudad", $cCiudad);
    $stmt->bindValue(":cEstado", $cEstado);
    $stmt->bindValue(":cTelefono", $cTelefono);
    $stmt->bindValue(":cPostal", $cPostal);
    $stmt->bindValue(":cEmail", $cEmail);
    $stmt->bindValue(":coordenadas", "POINT($Longitud $Latitud)");
    $stmt->execute();

    $db = null;
    

    echo "Registro exitoso. Los datos se han insertado en la base de datos.";
    echo '<script>
    setTimeout(function() {
        window.location.href = "index.html";
    }, 3000); // 3000 milisegundos = 3 segundos
    </script>';
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
