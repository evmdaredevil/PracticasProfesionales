$(document).ready(function() {
  // Create a Leaflet map
  const map = L.map('map').setView([0, 0], 2); // Default view

  // Add a tile layer to the map (you can choose a different tile layer if needed)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Fetch and populate table names
  $.get('/getTables', function(data) {
    const checkboxesDiv = $('#checkboxes');
    data.forEach(function(table) {
      const checkbox = `<label><input type="checkbox" name="tables" value="${table}">${table}</label><br>`;
      checkboxesDiv.append(checkbox);
    });

    // Handle table selection change
    $('input[name="tables"]').change(function() {
      // Clear the map
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      // Fetch and display data for selected table on the map
      const selectedTable = $(this).val();
      const encodedTable = encodeURIComponent(selectedTable);
      fetchAndDisplayTableData(encodedTable);
    });
  });

  // Function to fetch and display table data
  function fetchAndDisplayTableData(table) {
    $.get('/getTableData', { tableName: table })
      .done(function(response) {
        const data = response; // Assuming your server returns the data directly

        if (data && Array.isArray(data)) {
          data.forEach(function(point) {
            L.marker([point.lat, point.lng]).addTo(map)
              .bindPopup(`Latitude: ${point.lat}<br>Longitude: ${point.lng}`)
              .openPopup();
          });
        } else {
          console.log('No data received from server');
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        console.error('AJAX Error:', textStatus, errorThrown);
      });
  }
});
