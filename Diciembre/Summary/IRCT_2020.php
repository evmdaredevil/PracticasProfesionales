<?php
$host = 'localhost';
$port = '5433';
$dbname = 'Analisis';
$user = 'postgres';
$password = 'cenapred';
$table = 'IRCT_2020';

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Connection failed: " . pg_last_error());
}

// Get column names and data types
$queryColumns = "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '$table'";
$resultColumns = pg_query($conn, $queryColumns);

if (!$resultColumns) {
    die("Error in SQL query: " . pg_last_error());
}

$columns = [];
while ($row = pg_fetch_assoc($resultColumns)) {
    $columns[$row['column_name']] = $row['data_type'];
}

// Display statistics for each numeric column
echo "<h1>Estadística sobre:  $table</h1>";
echo "<table border='1'>";
echo "<tr><th>Column</th><th>Max</th><th>Min</th><th>Average</th></tr>";

foreach ($columns as $column => $dataType) {
    // Check if the column is numeric
    if (strpos($dataType, 'numeric') !== false || strpos($dataType, 'integer') !== false || strpos($dataType, 'double') !== false) {
        $queryStats = "SELECT
                        MAX(\"$column\") AS max_value,
                        MIN(\"$column\") AS min_value,
                        AVG(\"$column\") AS avg_value
                    FROM public.\"$table\"";

        $resultStats = pg_query($conn, $queryStats);

        if (!$resultStats) {
            die("Error in SQL query: " . pg_last_error());
        }

        $stats = pg_fetch_assoc($resultStats);

        echo "<tr>";
        echo "<td>$column</td>";
        echo "<td>{$stats['max_value']}</td>";
        echo "<td>{$stats['min_value']}</td>";
        echo "<td>{$stats['avg_value']}</td>";
        echo "</tr>";

        // Add Google Chart for the POB_total column
        if ($column === 'POB_total') {
            echo "<tr><td colspan='4'>";
            echo "<div id='chart_div' style='width: 100%; height: 300px;'></div>";
            echo "</td></tr>";

            // JavaScript code for Google Chart
            echo "<script type='text/javascript' src='https://www.gstatic.com/charts/loader.js'></script>";
            echo "<script type='text/javascript'>";
            echo "google.charts.load('current', {'packages':['corechart']});";
            echo "google.charts.setOnLoadCallback(drawChart);";
            echo "function drawChart() {";
            echo "var data = google.visualization.arrayToDataTable([";
            echo "['Category', 'Value'],";
            
            // Fetch data for the POB_total column
            $queryChart = "SELECT \"$column\" FROM public.\"$table\"";
            $resultChart = pg_query($conn, $queryChart);

            if (!$resultChart) {
                die("Error in SQL query: " . pg_last_error());
            }

            while ($rowChart = pg_fetch_assoc($resultChart)) {
                echo "['', {$rowChart[$column]}],";
            }

            echo "]);";

            echo "var options = {";
            echo "'title': '$column Chart',";
            echo "'curveType': 'function',";
            echo "'legend': { position: 'bottom' }";
            echo "};";

            echo "var chart = new google.visualization.LineChart(document.getElementById('chart_div'));";
            echo "chart.draw(data, options);";
            echo "}";
            echo "</script>";
        }
    }
}

echo "</table>";

pg_close($conn);
?>
