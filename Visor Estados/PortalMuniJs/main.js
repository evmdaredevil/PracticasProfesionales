
const map = L.map('map').setView([19.1987, -101.9765], 10);

const googleLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  maxZoom: 20,
}).addTo(map);

const baseMaps = {
  'Google Maps': googleLayer,
};

const overlayMaps = {
  'Agebs': createGeoJSONLayer('agebs'),
  'Asilos': createGeoJSONLayer('asilos'),
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

function createGeoJSONLayer(tableName) {
  const geoJSONLayer = L.geoJSON(null, {
    style: {
      opacity: 1,
    },
    onEachFeature: onEachFeature,
  });

  fetchGeoJSONData(tableName, (geoJSONData) => {
    geoJSONLayer.addData(geoJSONData);
  });

  return geoJSONLayer;
}


function fetchGeoJSONData(tableName, callback) {
  fetch(`get_geojson.php?table=${tableName}`)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      console.error('Error fetching GeoJSON data:', error);
    });
}


function onEachFeature(feature, layer) {
  const properties = feature.properties;
  let popupContent = '<table>';
  for (const key in properties) {
    if (key !== 'geometry') {
      popupContent += `<tr><td>${key}</td><td>${properties[key]}</td></tr>`;
    }
  }
  popupContent += '</table>';
  layer.bindPopup(popupContent);
}

let drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

let drawControl = new L.Control.Draw({
  draw: {
    circle: true,
    marker: false,
    polyline: false,
    polygon: false,
    rectangle: false,
  },
  edit: {
    featureGroup: drawnItems,
    remove: true,
  },
});

map.addControl(drawControl);

map.on('draw:created', function (event) {
  drawnItems.clearLayers();
  const { layer } = event;
  drawnItems.addLayer(layer);

  const circleCenter = turf.point([layer.getLatLng().lng, layer.getLatLng().lat]);
  const circle = turf.circle(circleCenter, layer.getRadius());
  const circleArea = turf.area(circleCenter, layer.getRadius());
  const geojsonURL = "http://localhost/PortalMuniJs/get_geojson.php?table=agebs";

  fetch(geojsonURL)
    .then(response => response.json())
    .then(data => {
      const geojsonLayer = data;

      // Extract the geometry from the GeoJSON layer
      const layerGeometry = geojsonLayer.features[0].geometry;

      // Iterate through all features in layerGeometry
      layerGeometry.coordinates.forEach(featureCoordinates => {
        // Ensure that each LinearRing has at least 4 positions
        if (featureCoordinates.length >= 4) {
          const featureGeometry = turf.polygon([featureCoordinates]);
          // Perform turf.intersect operation for each feature
          const intersectionResult = turf.intersect(circle, featureGeometry);
          // Check if there is an intersection
          if (intersectionResult) {
            console.log("Intersection found:", intersectionResult);
            // Create a new GeoJSON layer with the intersected features
            const intersectionLayer = L.geoJSON(intersectionResult, {
              style: {
                fillOpacity: 0.5,
                color: 'red', // You can customize the style as needed
              },
              onEachFeature: onEachFeature,
            });

            // Add the new layer to the map
            map.addLayer(intersectionLayer);
          } else {
            console.log("No intersection found");
          }
        } else {
          console.log("Invalid LinearRing: Each LinearRing must have 4 or more positions.");
        }
      });
    })
    .catch(error => console.error("Error fetching GeoJSON:", error));
});

