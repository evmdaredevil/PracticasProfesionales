function geojson2WKT(geoJsonData){
    var type = geoJsonData.geometry.type;
    var coordinates = geoJsonData.geometry.coordinates;
    var wkt = type.toUpperCase() + " (";
    if (type === "Polygon" ) {
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
      if (geoJsonData.properties.radius!=null){
      circleRequest(wkt,geoJsonData.properties.radius);  
      }
      else{
      pointRequest(wkt);
      }
    } else {
      console.error("Unsupported geometry type: " + type);
      return null;
    }
    return wkt;
  }