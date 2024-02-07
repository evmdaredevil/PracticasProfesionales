<?php
session_start(); // Inicia la sesión (si no está iniciada)

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $db = new PDO("pgsql:host=localhost;port=5432;dbname=CERTtest", "postgres", "cenapred");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Obtener los datos del formulario
        $cNombreEquipo = $_POST["cNombreEquipo"];
        $nombre = $_POST["Nombre"];
        $primerApellido = $_POST["PrimerApellido"];
        $segundoApellido = $_POST["SegundoApellido"];
        $numeroContacto = $_POST["NumeroContacto"];

        // Insertar el miembro en la tabla MiembrosGrupoCERT
        $query = "INSERT INTO MiembrosGrupoCERT (cNombreEquipo, Nombre, PrimerApellido, SegundoApellido, NumeroContacto)
                  VALUES (:cNombreEquipo, :Nombre, :PrimerApellido, :SegundoApellido, :NumeroContacto)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":cNombreEquipo", $cNombreEquipo, PDO::PARAM_STR);
        $stmt->bindParam(":Nombre", $nombre, PDO::PARAM_STR);
        $stmt->bindParam(":PrimerApellido", $primerApellido, PDO::PARAM_STR);
        $stmt->bindParam(":SegundoApellido", $segundoApellido, PDO::PARAM_STR);
        $stmt->bindParam(":NumeroContacto", $numeroContacto, PDO::PARAM_STR);
        $stmt->execute();

        // Registro exitoso, redirigir a la última página visitada después de 3 segundos
        $_SESSION["last_visited_page"] = $_SERVER["HTTP_REFERER"]; // Guarda la última página visitada
        echo "Miembro registrado correctamente.";
        header("Refresh: 3; URL=" . $_SERVER["HTTP_REFERER"]); // Redirige después de 3 segundos
    } catch (PDOException $e) {
        echo "Error al insertar el miembro: " . $e->getMessage();
    }
} else {
    echo "Acceso no válido.";
}
?>
