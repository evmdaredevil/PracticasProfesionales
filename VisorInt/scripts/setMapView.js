function setMapView(minX, minY, maxX, maxY) {
    const minLatLng = L.latLng(minY, minX);
    const maxLatLng = L.latLng(maxY, maxX);
    const bounds = L.latLngBounds(minLatLng, maxLatLng);
    map.fitBounds(bounds, { maxBounds: bounds, maxBoundsViscosity: 1 });
  }
  