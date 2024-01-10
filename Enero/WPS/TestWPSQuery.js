map.on(L.Draw.Event.CREATED, function(event) {
  var layer = event.layer;
  drawnItems.clearLayers();
  drawnItems.addLayer(layer);

  const wpsXml = `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>vec:PointBuffers</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>center</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="application/wkt"><![CDATA[POINT (-105.905392 30.618841)]]></wps:ComplexData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>crs</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>EPSG:4326</wps:LiteralData>
      </wps:Data>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>distances</ows:Identifier>
      <wps:Data>
        <wps:LiteralData>503365.25530693686</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  </wps:DataInputs>
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="application/json">
      <ows:Identifier>buffers</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>
  `;

   // Make a POST request to the Geoserver WPS endpoint
  fetch('http://localhost:8080/geoserver/wps', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
    },
    body: wpsXml,
  })
  .then(response => response.json()) // Parse response as JSON
  .then(jsonResult => {
    // Process the JSON result as needed
    console.log(jsonResult);

    // Create a GeoJSON layer and add it to the map
    var geojsonLayer = L.geoJSON(jsonResult, {
      onEachFeature: function (feature, layer) {
        // Create a pop-up content dynamically based on feature properties
        var popupContent = "<b>Propiedades:</b><br>";
        for (var key in feature.properties) {
          popupContent += key + ": " + feature.properties[key] + "<br>";
        }
        layer.bindPopup(popupContent);
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error('Error executing WPS query:', error);
  });
});
