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
      fetchAndDisplayTableData(selectedTable);
    });
  });

  // Function to fetch and display table data
  async function fetchAndDisplayTableData(table) {
    const response = await $.get('/getTableData', { tableName: table });
    const data = response.data; // Modify this based on the response structure

    data.forEach(function(point) {
      L.marker([point.lat, point.lng]).addTo(map)
        .bindPopup(`Table: ${table}`)
        .openPopup();
    });
  }
});
