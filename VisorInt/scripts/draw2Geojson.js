function draw2Geojson(layer){
    if (layer instanceof L.Circle) {
      // Handle circles separately from points
      geoJsonData = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [layer.getLatLng().lng, layer.getLatLng().lat]
        },
        properties: {
          radius: layer.getRadius()
        }
      };
    } else {
      geoJsonData = layer.toGeoJSON();
    }
    return geoJsonData;
  }