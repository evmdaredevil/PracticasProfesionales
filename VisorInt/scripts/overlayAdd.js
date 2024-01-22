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