function verGeoJSON() {
    // Check if geojsonLayer exists
    if (!geojsonLayer) {
      console.error("geojsonLayer is not defined.");
      return;
    }
    const geojsonString = JSON.stringify(geojsonLayer.toGeoJSON());
    const blob = new Blob([geojsonString], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported.geojson";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }