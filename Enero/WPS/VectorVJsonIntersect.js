map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    drawnItems.clearLayers();
    drawnItems.addLayer(layer);
    // Convert the drawn layer to GeoJSON
    var geoJsonData = layer.toGeoJSON();
    // Print the GeoJSON data to the console or use it as needed
    console.log(geoJsonData);
    // Create XML request dynamically with geoJsonData
    var xmlRequest = `<?xml version="1.0" encoding="UTF-8"?>
      <wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
        <ows:Identifier>gs:IntersectionFeatureCollection</ows:Identifier>
        <wps:DataInputs>
          <wps:Input>
            <ows:Identifier>first feature collection</ows:Identifier>
            <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
              <wps:Body>
                <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:Analisis="www.analisis.com">
                  <wfs:Query typeName="Analisis:IRCT_2020"/>
                </wfs:GetFeature>
              </wps:Body>
            </wps:Reference>
          </wps:Input>
          <wps:Input>
            <ows:Identifier>second feature collection</ows:Identifier>
            <wps:Data>
              <wps:ComplexData mimeType="application/json">${JSON.stringify(geoJsonData)}</wps:ComplexData>
            </wps:Data>
          </wps:Input>
        </wps:DataInputs>
        <wps:ResponseForm>
          <wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">
            <ows:Identifier>result</ows:Identifier>
          </wps:RawDataOutput>
        </wps:ResponseForm>
      </wps:Execute>`;
  
    // Simulate sending the XML request to the server
    sendXMLRequest(xmlRequest);
  });
  
  // Simulated function to send XML request to the server
  function sendXMLRequest(xmlRequest) {
    console.log("Simulating sending XML request to the server:", xmlRequest);
    // You would typically use AJAX or another method to send the request to the server
  }
  