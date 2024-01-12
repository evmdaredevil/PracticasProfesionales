const workspace = 'Analisis';
const layers = [
  'Susceptibilidad_Laderas_2020_Chihuahua',
  'CENAPREDInfierProfTR100',
  'CENAPRED_PuntosCriticos2020',
  'Colonias_INE_2015',
  'Hundimimentos_Municipal',
  'IRCT_2020',
  'SEP_CCT_2015_Mod',
  'Susceptibilidad_Laderas_2020'
];
const map = L.map('map').setView([23.6345, -102.5528], 5);

L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  attribution: '© Google',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  maxZoom: 20,
}).addTo(map);

const layerOrder = [];
let currentAddedLayer;

const layerControlOptions = {};
layers.forEach((layerName, index) => {
  let newLayer;
  newLayer = L.tileLayer.wms('http://localhost:8080/geoserver/' + workspace + '/wms', {
    layers: workspace + ':' + layerName,
    format: 'image/png',
    transparent: true
  });

  layerControlOptions[layerName] = newLayer;

  layerOrder.push(layerName);

  function setMapView(minX, minY, maxX, maxY) {
    const minLatLng = L.latLng(minY, minX);
    const maxLatLng = L.latLng(maxY, maxX);
    const bounds = L.latLngBounds(minLatLng, maxLatLng);

    map.fitBounds(bounds, { maxBounds: bounds, maxBoundsViscosity: 1 });
  }

  layerIndex = index;

  map.on('overlayadd', function(event) {
    const addedLayer = event.layer;
    const layerIndex = layerOrder.indexOf(addedLayer.options.layers.split(':')[1]);
    currentAddedLayer = layers[layerIndex];
    switch (layers[layerIndex]) {
      case 'Susceptibilidad_Laderas_2020_Chihuahua':
        setMapView(-109.2796245414146,25.475300203831356,-103.27247620241886,31.893253282396635)
        break;
      case 'CENAPREDInfierProfTR100':
        setMapView(-102.32952455966438,18.037890399261258,-101.85044171829642,18.539720457791496)
        break;
      case 'CENAPRED_PuntosCriticos2020':
        setMapView(-116.97511291503906,14.688822746276855,-86.81598663330078,32.51572036743164)
        break;
      case 'Colonias_INE_2015':
        setMapView(-117.12506103515625,14.55718994140625,-86.71045684814453,32.71839141845703)
        break;
      case 'Hundimimentos_Municipal':
        setMapView(-108.62871551513672,18.7687931060791,-98.50675964355469,31.78395652770996)
        break;
      case 'IRCT_2020':
        setMapView(-118.36511993408203,14.532097816467285,-86.71040344238281,32.71865463256836)
        break;
      case 'SEP_CCT_2015_Mod':
        setMapView(-118.30111694335938,14.558241844177246,-86.72542572021484,32.716773986816406)
        break;
      case 'Susceptibilidad_Laderas_2020':
        setMapView(-118.30111694335938,14.558241844177246,-86.72542572021484,32.716773986816406)
        break;
      default:
      setMapView(-118.30111694335938,14.558241844177246,-86.72542572021484,32.716773986816406)
    }
    const legendUrl = 'http://localhost:8080/geoserver/' + workspace + '/wms?REQUEST=GetLegendGraphic&LAYER=' + workspace + ':' + layers[layerIndex] + '&FORMAT=image/png';
    document.getElementById('legend').innerHTML = '<img src="' + legendUrl + '" alt="Legend">';
  });

});
const layerControl = L.control.layers(null, layerControlOptions, { collapsed: false }).addTo(map);
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
  edit: {
    featureGroup: drawnItems
  }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function(event) {
  var layer = event.layer;
  drawnItems.clearLayers();
  drawnItems.addLayer(layer);
  // Convert the drawn layer to GeoJSON
  var geoJsonData = draw2Geojson(layer);
  // Convert GeoJSON to WKT
  wktData = geojson2WKT(geoJsonData);
  // Just something to motivate me:
  console.log("Getting here is a W(kt): " + wktData); 
});

function draw2Geojson(layer){
  if (layer instanceof L.Circle) {
    // Handle circles separately
    geoJsonData = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [layer.getLatLng().lng, layer.getLatLng().lat]
      },
      properties: {
        radius: layer.getRadius()
        // You can add other circle properties as needed
      }
    };
  } else {
    // For other layer types, use the default toGeoJSON method
    geoJsonData = layer.toGeoJSON();
  }
  return geoJsonData;
}

function geojson2WKT(geoJsonData){
  var type = geoJsonData.geometry.type;
  var coordinates = geoJsonData.geometry.coordinates;
  var wkt = type.toUpperCase() + " (";
  if (type === "Polygon") {
    coordinates.forEach(function (ring) {
      wkt += "(";
      ring.forEach(function (point) {
        wkt += point.join(" ") + ",";
      });
      wkt = wkt.slice(0, -1) + "),";
    });
    wkt = wkt.slice(0, -1) + ")";
    polygonRequest(wkt);
  } else if (type === "Point") {
    wkt += coordinates.join(" ") + ")";
    console.log("Good! Let's now check wether we've got a point or a circle... ");
    if (geoJsonData.properties.radius!=null){
    console.log("Do we have a radius?...  YES! "+ geoJsonData.properties.radius);

    }
    else{
    console.log("Nope! No radius");
    pointRequest(wkt);
    }
  } else {
    console.error("Unsupported geometry type: " + type);
    return null;
  }
  return wkt;
}

function polygonRequest(wktData) {
  const wpsXml = `<?xml version="1.0" encoding="UTF-8"?>
  <wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
    <ows:Identifier>vec:Clip</ows:Identifier>
    <wps:DataInputs>
      <wps:Input>
        <ows:Identifier>features</ows:Identifier>
        <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
          <wps:Body>
            <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:Analisis="www.analisis.com">
              <wfs:Query typeName="Analisis:${currentAddedLayer}"/>
            </wfs:GetFeature>
          </wps:Body>
        </wps:Reference>
      </wps:Input>
      <wps:Input>
        <ows:Identifier>clip</ows:Identifier>
        <wps:Data>
          <wps:ComplexData mimeType="application/wkt"><![CDATA[${wktData}]]></wps:ComplexData>
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
  xml2Map(wpsXml);
}

function pointRequest(wktData) {
  const wpsXml = `<?xml version="1.0" encoding="UTF-8"?><wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>vec:Nearest</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>features</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="1.0.0" outputFormat="GML2" xmlns:Analisis="www.analisis.com">
            <wfs:Query typeName="Analisis:${currentAddedLayer}"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>point</ows:Identifier>
      <wps:Data>
        <wps:ComplexData mimeType="application/wkt"><![CDATA[${wktData}]]></wps:ComplexData>
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
  xml2Map(wpsXml);
}

function xml2Map(wpsXml) {
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
}

function verTabla() {
  if (
    typeof currentAddedLayer === 'undefined' || currentAddedLayer === 'CENAPREDInfierProfTR100' || currentAddedLayer === 'Susceptibilidad_Laderas_2020'){
    var url = 'http://localhost/Tables/';
    window.open(url, '_blank');}else{
  var url = 'http://localhost/Tables/' + currentAddedLayer + '.php';
  window.open(url, '_blank');}
}


function verEstadistica() {
  if (
    typeof currentAddedLayer === 'undefined' || currentAddedLayer === 'CENAPREDInfierProfTR100' || currentAddedLayer === 'Susceptibilidad_Laderas_2020' || currentAddedLayer === 'Susceptibilidad_Laderas_2020_Chihuahua'){
    var url = 'http://localhost/Summary/';
    window.open(url, '_blank');}
    else{
  var url = 'http://localhost/Summary/' + currentAddedLayer + '.php';
  window.open(url, '_blank');}
}

function verGeoJSON() {
  window.open('http://localhost/VGeoserver/geojson.html', '_blank');
}


function descargar() {
  if (
    typeof currentAddedLayer === 'undefined' || currentAddedLayer === 'CENAPREDInfierProfTR100' || currentAddedLayer === 'Susceptibilidad_Laderas_2020' || currentAddedLayer === 'Susceptibilidad_Laderas_2020_Chihuahua' ){
  var link = document.createElement('a');
  link.href = 'http://localhost:8080/geoserver/Analisis/wms?service=WMS&version=1.1.0&request=GetMap&layers=Analisis%3A'+currentAddedLayer+'&bbox=-102.32952455966438%2C18.037890399261258%2C-101.85044171829642%2C18.539720457791496&width=733&height=768&srs=EPSG%3A4326&styles=&format=image%2Fgeotiff';
  link.download = 'downloaded_file.geotiff';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
    }else{
  var link = document.createElement('a');
  link.href = 'http://localhost:8080/geoserver/Analisis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Analisis%3A'+currentAddedLayer+'&maxFeatures=50&outputFormat=SHAPE-ZIP';
  link.download = 'downloaded_file.geotiff';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

    }
}