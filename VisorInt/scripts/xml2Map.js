function xml2Map(wpsXml) {
  // Make a POST request to the Geoserver WPS endpoint
  fetch('http://localhost:8080/geoserver/wps', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/xml',
      },
      body: wpsXml,
  })
  .then(response => response.json())
  .then(jsonResult => {
      geojsonLayer = L.geoJSON(jsonResult, {
          onEachFeature: function (feature, layer) {
              // Create a pop-up content dynamically based on feature properties
              var popupContent = "<b>Propiedades:</b><br>";
              for (var key in feature.properties) {
                  popupContent += key + ": " + feature.properties[key] + "<br>";
              }
              layer.bindPopup(popupContent, { maxHeight: 200 });
          },
          style: function (feature) {
              return {
                  color: conditionalFeatures(feature) ? 'red' : 'blue'
              };
          }
      }).addTo(map);
  })
  .catch(error => {
      console.error('Error executing WPS query:', error);
  });
}
