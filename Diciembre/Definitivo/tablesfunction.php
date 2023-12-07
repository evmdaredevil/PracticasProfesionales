<?php
function displayTableData($tableName) {
    $host = 'localhost';
    $port = '5433';
    $dbname = 'Analisis';
    $user = 'postgres';
    $password = 'cenapred';
    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
    if (!$conn) {
        die("Connection failed: " . pg_last_error());
    }

    // Query to select all data from the table
    $query = 'SELECT * FROM public."' . $tableName . '"';

    $result = pg_query($conn, $query);

    if (!$result) {
        die("Query failed: " . pg_last_error());
    }

    ?>

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Table Data</title>
    </head>
    <body>

        <h2>Table: <?php echo $tableName; ?></h2>

        <table border="1">
            <tr>
                <?php

                $numFields = pg_num_fields($result);
                for ($i = 0; $i < $numFields; $i++) {
                    echo "<th>" . pg_field_name($result, $i) . "</th>";
                }
                ?>
            </tr>

            <?php
            // Display table data
            while ($row = pg_fetch_assoc($result)) {
                echo "<tr>";
                $numFields = count($row);
                $count = 0;
                foreach ($row as $value) {
                    $count++;
                    // Check if it's the last column and skip it
                    if ($count < $numFields) {
                        echo "<td>$value</td>";
                    }
                }
                echo "</tr>";
            }
            ?>
        </table>

        <?php
        pg_close($conn);
        ?>

    </body>
    </html>

    <?php
}
$tableName = 'IRCT_2020';
displayTableData($tableName);
?>
