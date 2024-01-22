function verTabla() {
    if (
      typeof currentAddedLayer === 'undefined' || currentAddedLayer === 'CENAPREDInfierProfTR100' || currentAddedLayer === 'Susceptibilidad_Laderas_2020'){
      var url = 'http://localhost/Tables/';
      window.open(url, '_blank');}else{
    var url = 'http://localhost/Tables/' + currentAddedLayer + '.php';
    window.open(url, '_blank');}
  }