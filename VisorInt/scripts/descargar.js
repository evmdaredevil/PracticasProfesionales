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