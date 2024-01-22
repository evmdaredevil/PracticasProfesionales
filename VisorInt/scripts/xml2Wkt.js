function xml2Wkt(geoJson) {
    // Parse the JSON string to a JavaScript object
    const parsedGeoJson = JSON.parse(geoJson);
    // Ensure the GeoJSON has the necessary properties
    if (!parsedGeoJson || !parsedGeoJson.type || !parsedGeoJson.features) {
        throw new Error('Invalid GeoJSON format');
    }
    const feature = parsedGeoJson.features[0];
    // Ensure the feature has the necessary properties
    if (!feature || !feature.geometry || !feature.geometry.coordinates) {
        throw new Error('Invalid GeoJSON feature format');
    }
    const geometryType = feature.geometry.type;
    const coordinates = feature.geometry.coordinates;
    // Convert coordinates to WKT format based on the geometry type
    switch (geometryType) {
        case 'Polygon':
            return `POLYGON((${coordinates[0].map(coord => coord.join(' ')).join(', ')}))`;
        default:
            throw new Error(`Unsupported geometry type: ${geometryType}`);
    }
}