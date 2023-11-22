
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

  for (const overlayKey in overlayMaps) {
    map.removeLayer(overlayMaps[overlayKey]);
  }

  for (const overlayKey in overlayMaps) {
    const originalLayer = overlayMaps[overlayKey];

    originalLayer.eachLayer((overlayLayer) => {
      if (overlayLayer.setStyle) {
        const originalGeometry = overlayLayer.toGeoJSON().geometry;
        const convertedGeometry = turf.getType(originalGeometry) === 'Point'
          ? originalGeometry
          : turf.pointOnSurface(originalGeometry);

        const intersection = turf.booleanOverlap(circle, convertedGeometry);

        if (intersection) {
          let intersectionLayer = L.geoJSON(convertedGeometry, {
            style: { opacity: 1 },
            onEachFeature: onEachFeature,
          });

          map.addLayer(intersectionLayer);
        }
      }
    });
  }
});

document.getElementById('generateGeoJSONButton').addEventListener('click', function() {
  if (drawnItems.getLayers().length > 0) {
    const drawnCircle = drawnItems.getLayers()[0];
    const circleCenter = turf.point([drawnCircle.getLatLng().lng, drawnCircle.getLatLng().lat]);
    const circle = turf.circle(circleCenter, drawnCircle.getRadius());

    const filteredGeoJSON = {
      type: 'FeatureCollection',
      features: []
    };

    for (const tableName in overlayMaps) {
      const originalLayer = overlayMaps[tableName];

      originalLayer.eachLayer((overlayLayer) => {
        if (overlayLayer.setStyle) {
          const originalGeometry = overlayLayer.toGeoJSON().geometry;
          const convertedGeometry = turf.getType(originalGeometry) === 'Point'
            ? originalGeometry
            : turf.pointOnSurface(originalGeometry);

          if (turf.booleanOverlap(circle, convertedGeometry)) {
            filteredGeoJSON.features.push({
              type: 'Feature',
              geometry: convertedGeometry,
              properties: overlayLayer.feature.properties
            });
          }
        }
      });
    }

    const filteredGeoJSONString = JSON.stringify(filteredGeoJSON, null, 2);

    const blob = new Blob([filteredGeoJSONString], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'filtered_geojson.json';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert('Please draw a circle on the map before generating GeoJSON.');
  }
});








