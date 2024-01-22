function circleRequest(wktData,radius) {
    const wpsXml = `<?xml version="1.0" encoding="UTF-8"?>
    <wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
    <ows:Identifier>vec:PointBuffers</ows:Identifier>
    <wps:DataInputs>
      <wps:Input>
        <ows:Identifier>center</ows:Identifier>
        <wps:Data>
          <wps:ComplexData mimeType="application/wkt"><![CDATA[${wktData}]]></wps:ComplexData>
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
          <wps:LiteralData>${radius}</wps:LiteralData>
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
    fetch('http://localhost:8080/geoserver/wps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: wpsXml,
      })
      .then(response => response.text())
      .then(xmlResult => {
        circleWkt = xml2Wkt(xmlResult);
        polygonRequest(circleWkt);
  
      })
      .catch(error => {
        console.error('Error executing WPS query:', error);
      });
    };
  