const workspace = 'Analisis';
const map = L.map('map').setView([23.6345, -102.5528], 5);

L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  attribution: '© Google',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  maxZoom: 20,
}).addTo(map);

const layerOrder = [];
let currentAddedLayer;
let geojsonLayer;

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
  layerIndex = index;
});
const layerControl = L.control.layers(null, layerControlOptions, { collapsed: true }).addTo(map);
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
  var geoJsonData = draw2Geojson(layer);
  wktData = geojson2WKT(geoJsonData);
});