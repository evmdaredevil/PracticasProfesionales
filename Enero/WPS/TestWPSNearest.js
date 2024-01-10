const nearestXml = `<?xml version="1.0" encoding="UTF-8"?>
<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
<ows:Identifier>vec:Nearest</ows:Identifier>
<wps:DataInputs>
  <wps:Input>
    <ows:Identifier>features</ows:Identifier>
    <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
      <wps:Body>
        <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:Analisis="www.analisis.com">
          <wfs:Query typeName="Analisis:Hundimimentos_Municipal"/>
        </wfs:GetFeature>
      </wps:Body>
    </wps:Reference>
  </wps:Input>
  <wps:Input>
    <ows:Identifier>point</ows:Identifier>
    <wps:Data>
      <wps:ComplexData mimeType="application/wkt"><![CDATA[POINT ${wkt}]]></wps:ComplexData>
    </wps:Data>
  </wps:Input>
</wps:DataInputs>
<wps:ResponseForm>
  <wps:RawDataOutput mimeType="application/json">
    <ows:Identifier>result</ows:Identifier>
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
    body: nearestXml,
  })
  .then(response => response.text())
  .then(nearestResult => {
    // Process the XML result as needed
    console.log(nearestResult);
  })
  .catch(error => {
    console.error('Error executing WPS query:', error);
  });
