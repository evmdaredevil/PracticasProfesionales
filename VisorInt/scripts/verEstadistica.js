function verEstadistica() {
    if (
      typeof currentAddedLayer === 'undefined' || currentAddedLayer === 'CENAPREDInfierProfTR100' || currentAddedLayer === 'Susceptibilidad_Laderas_2020' || currentAddedLayer === 'Susceptibilidad_Laderas_2020_Chihuahua'){
      var url = 'http://localhost/Summary/';
      window.open(url, '_blank');}
      else{
    var url = 'http://localhost/Summary/' + currentAddedLayer + '.php';
    window.open(url, '_blank');}
  }