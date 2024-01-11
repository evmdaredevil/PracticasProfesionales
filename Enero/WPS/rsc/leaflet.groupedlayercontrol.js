// Fix for IE8 support.  See:
// http://stackoverflow.com/questions/3629183/why-doesnt-indexof-work-on-an-array-ie8

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

// A layer control which provides for layer groupings.
// Author: Ishmael Smyrnow
L.Control.GroupedLayers = L.Control.extend({
  options: {
    collapsed: true,
    position: 'topright',
    autoZIndex: true
  },

  initialize: function (baseLayers, groupedOverlays, options) {
    L.Util.setOptions(this, options);

    this._layers = {};
    this._lastZIndex = 0;
    this._handlingClick = false;
    this._groupList = [];
    this._domGroups = [];

    for (var i in baseLayers) {
      this._addLayer(baseLayers[i], i);
    }

    for (i in groupedOverlays) {
      for (j in groupedOverlays[i]) {
        this._addLayer(groupedOverlays[i][j], j, i, true);
      }
    }
  },

  onAdd: function (map) {
    this._initLayout();
    this._update();
    this._setEvents(map);

    map
        .on('layeradd', this._onLayerChange, this)
        .on('layerremove', this._onLayerChange, this);

    return this._container;
  },

  onRemove: function (map) {
    map
        .off('layeradd', this._onLayerChange)
        .off('layerremove', this._onLayerChange);
  },

  addBaseLayer: function (layer, name) {
    this._addLayer(layer, name);
    this._update();
    return this;
  },

  addOverlay: function (layer, name, group) {
    this._addLayer(layer, name, group, true);
    this._update();
    return this;
  },

  removeLayer: function (layer) {
    var id = L.Util.stamp(layer);
    delete this._layers[id];
    this._update();
    return this;
  },

  _initLayout: function () {
    var className = 'leaflet-control-layers',
        container = this._container = L.DomUtil.create('div', className);

    //Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
    container.setAttribute('aria-haspopup', true);

    if (!L.Browser.touch) {
      L.DomEvent.disableClickPropagation(container);
      L.DomEvent.on(container, 'wheel', L.DomEvent.stopPropagation);
    } else {
      L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
    }

    var form = this._form = L.DomUtil.create('form', className + '-list');

    if (this.options.collapsed) {
      if (!L.Browser.android) {
        L.DomEvent
            .on(container, 'mouseover', this._expand, this)
            .on(container, 'mouseout', this._collapse, this);
      }
      var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
      link.href = '#';
      link.title = 'Layers';

      if (L.Browser.touch) {
        L.DomEvent
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', this._expand, this);
      }
      else {
        L.DomEvent.on(link, 'focus', this._expand, this);
      }

      this._map.on('click', this._collapse, this);
      // TODO keyboard accessibility
    } else {
      this._expand();
    }

    this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
    this._separator = L.DomUtil.create('div', className + '-separator', form);
    this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

    container.appendChild(form);
  },

  _addLayer: function (layer, name, group, overlay) {
    var id = L.Util.stamp(layer);

    this._layers[id] = {
      layer: layer,
      name: name,
      overlay: overlay
    };

    if (group) {
      var groupId = this._groupList.indexOf(group);

      if (groupId === -1) {
        groupId = this._groupList.push(group) - 1;
      }

      this._layers[id].group = {
        name: group,
        id: groupId
      };
    }

    if (this.options.autoZIndex && layer.setZIndex) {
      this._lastZIndex++;
      layer.setZIndex(this._lastZIndex);
    }
  },

  _update: function () {
    if (!this._container) {
      return;
    }

    this._baseLayersList.innerHTML = '';
    this._overlaysList.innerHTML = '';
    this._domGroups.length = 0;

    var baseLayersPresent = false,
        overlaysPresent = false,
        i, obj;

    for (i in this._layers) {
      obj = this._layers[i];
      this._addItem(obj);
      overlaysPresent = overlaysPresent || obj.overlay;
      baseLayersPresent = baseLayersPresent || !obj.overlay;
    }

    this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
  },

  _onLayerChange: function (e) {
    var obj = this._layers[L.Util.stamp(e.layer)];

    if (!obj) { return; }

    if (!this._handlingClick) {
      this._update();
    }

    var type = obj.overlay ?
      (e.type === 'layeradd' ? 'overlayadd' : 'overlayremove') :
      (e.type === 'layeradd' ? 'baselayerchange' : null);

    if (type) {
      this._map.fire(type, obj);
    }
  },

  // IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
  _createRadioElement: function (name, checked) {

    var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"';
    if (checked) {
      radioHtml += ' checked="checked"';
    }
    radioHtml += '/>';

    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;

    return radioFragment.firstChild;
  },

  _addItem: function (obj) {
    var label = document.createElement('label'),
        input,
        checked = this._map.hasLayer(obj.layer);

    if (obj.overlay) {
      input = document.createElement('input');
      input.type = 'checkbox';
      input.className = 'leaflet-control-layers-selector';
      input.defaultChecked = checked;
    } else {
      input = this._createRadioElement('leaflet-base-layers', checked);
    }

    input.layerId = L.Util.stamp(obj.layer);

    L.DomEvent.on(input, 'click', this._onInputClick, this);

    var name = document.createElement('span');
    name.innerHTML = ' ' + obj.name;

    label.appendChild(input);
    label.appendChild(name);

    if (obj.overlay) {
      container = this._overlaysList;
      if (! obj.group ){
        obj.group = {id : 'Undefined'};
        console.log('Setting undefined group on layer ' + obj.name);
      }

      if (this.options.groupedlayers.collapsible && this.options.groupedlayers.collapsed){
        if (this.options.groupedlayers.expandFirst && obj.group.id === 0){
          // nevermind...
        } else {
          label.className = 'leaflet-control-layers-group-label-collapsed';
        }
      }

      var groupContainer = this._domGroups[obj.group.id];

      // Create the group container if it doesn't exist
      if (!groupContainer) {
        groupContainer = document.createElement('div');
        groupContainer.className = 'leaflet-control-layers-group';
        groupContainer.id = 'leaflet-control-layers-group-' + obj.group.id;


        if (this.options.groupedlayers.collapsible){
          var groupToggle = document.createElement('span');
          groupToggle.className = 'leaflet-control-layers-group-toggle leaflet-control-layers-group-toggle-expanded';

          L.DomEvent
            .addListener(groupToggle, 'click', L.DomEvent.stopPropagation)
            .addListener(groupToggle, 'click', L.DomEvent.preventDefault)
            .addListener(groupToggle, 'click', this._onGroupToggle);
          groupContainer.appendChild(groupToggle);
        }



        var groupLabel = document.createElement('span');
        groupLabel.className = 'leaflet-control-layers-group-name';
        groupLabel.innerHTML = obj.group.name;

        if (this.options.groupedlayers.collapsible){
          L.DomEvent
            .addListener(groupLabel, 'click', L.DomEvent.stopPropagation)
            .addListener(groupLabel, 'click', L.DomEvent.preventDefault)
            .addListener(groupLabel, 'click', this._onGroupToggle);
        }


        groupContainer.appendChild(groupLabel);
        container.appendChild(groupContainer);

        this._domGroups[obj.group.id] = groupContainer;

        if (this.options.groupedlayers.collapsible && this.options.groupedlayers.collapsed){
          if (this.options.groupedlayers.expandFirst && obj.group.id === 0){
            // nevermind...
          } else {
            this._onGroupToggle.call(groupLabel);
          }
        }
      }

      container = groupContainer;
    } else {
      container = this._baseLayersList;
    }

    container.appendChild(label);

    return label;
  },

   _onGroupToggle: function () {
    var groupContainer = this.parentNode;
    var toggle    = groupContainer.children[0];
    var layers     = groupContainer.getElementsByTagName('label');

    if (L.DomUtil.hasClass(toggle,'leaflet-control-layers-group-toggle')){
      if (L.DomUtil.hasClass(toggle,'leaflet-control-layers-group-toggle-expanded')){
        L.DomUtil.addClass(toggle,'leaflet-control-layers-group-toggle-collapsed');
        L.DomUtil.removeClass(toggle,'leaflet-control-layers-group-toggle-expanded');
      } else {
        L.DomUtil.addClass(toggle,'leaflet-control-layers-group-toggle-expanded');
        L.DomUtil.removeClass(toggle,'leaflet-control-layers-group-toggle-collapsed');
      }
    }
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      if (L.DomUtil.hasClass(layer,'leaflet-control-layers-group-label-collapsed')){
        L.DomUtil.addClass(layer,'leaflet-control-layers-group-label-expanded');
        L.DomUtil.removeClass(layer,'leaflet-control-layers-group-label-collapsed');
      } else {
        L.DomUtil.addClass(layer,'leaflet-control-layers-group-label-collapsed');
        L.DomUtil.removeClass(layer,'leaflet-control-layers-group-label-expanded');
      }
    }
  },


  _onInputClick: function () {
    var i, input, obj,
        inputs = this._form.getElementsByTagName('input'),
        inputsLen = inputs.length;

    this._handlingClick = true;

    for (i = 0; i < inputsLen; i++) {
      input = inputs[i];
      obj = this._layers[input.layerId];

      if (input.checked && !this._map.hasLayer(obj.layer)) {
        this._map.addLayer(obj.layer);

      } else if (!input.checked && this._map.hasLayer(obj.layer)) {
        this._map.removeLayer(obj.layer);
      }
    }

    this._handlingClick = false;
  },

  _expand: function () {
    L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
  },

  _collapse: function () {
    this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
  },

  _setEvents: function(map) {
    this.getContainer().addEventListener('mouseover', function() {
      map.scrollWheelZoom.disable();
    });
    this.getContainer().addEventListener('mouseout', function() {
      map.scrollWheelZoom.enable();
    });
  }
});

L.control.groupedLayers = function (baseLayers, groupedOverlays, options) {
  return new L.Control.GroupedLayers(baseLayers, groupedOverlays, options);
};
