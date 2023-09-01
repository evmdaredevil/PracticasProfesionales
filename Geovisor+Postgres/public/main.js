$(document).ready(function() {

  const map = L.map('map').setView([0, 0], 2); 

 
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);


  $.get('/getTables', function(data) {
    const checkboxesDiv = $('#checkboxes');
    data.forEach(function(table) {
      const checkbox = `<label><input type="checkbox" name="tables" value="${table}">${table}</label><br>`;
      checkboxesDiv.append(checkbox);
    });


    $('input[name="tables"]').change(function() {
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      const selectedTable = $(this).val();
      const encodedTable = encodeURIComponent(selectedTable);
      fetchAndDisplayTableData(encodedTable);
    });
  });

  // Function to fetch and display table data
  function fetchAndDisplayTableData(table) {
    $.get('/getTableData', { tableName: table })
      .done(function(response) {
        const data = response; 

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
