<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0" xmlns:sld="http://www.opengis.net/sld">
  <UserLayer>
    <sld:LayerFeatureConstraints>
      <sld:FeatureTypeConstraint/>
    </sld:LayerFeatureConstraints>
    <sld:UserStyle>
      <sld:Name>Presa el infiernillo, Guerrero - Profundidad (m)</sld:Name>
      <sld:FeatureTypeStyle>
        <sld:Rule>
          <sld:RasterSymbolizer>
            <sld:ChannelSelection>
              <sld:GrayChannel>
                <sld:SourceChannelName>1</sld:SourceChannelName>
              </sld:GrayChannel>
            </sld:ChannelSelection>
            <sld:ColorMap type="ramp">
              <sld:ColorMapEntry quantity="0.001" label="0.0010" color="#f7fbff"/>
              <sld:ColorMapEntry quantity="0.10000000000000001" label="0.1000" color="#e9f2fb"/>
              <sld:ColorMapEntry quantity="0.25" label="0.2500" color="#dce9f6"/>
              <sld:ColorMapEntry quantity="0.5" label="0.5000" color="#cee1f2"/>
              <sld:ColorMapEntry quantity="1" label="1.0000" color="#bed8ec"/>
              <sld:ColorMapEntry quantity="1.5" label="1.5000" color="#a8cee5"/>
              <sld:ColorMapEntry quantity="2" label="2.0000" color="#8fc2de"/>
              <sld:ColorMapEntry quantity="2.5" label="2.5000" color="#73b2d8"/>
              <sld:ColorMapEntry quantity="3" label="3.0000" color="#5ba3d0"/>
              <sld:ColorMapEntry quantity="5" label="5.0000" color="#4494c7"/>
              <sld:ColorMapEntry quantity="7.5" label="7.5000" color="#3282be"/>
              <sld:ColorMapEntry quantity="10" label="10.0000" color="#206fb4"/>
              <sld:ColorMapEntry quantity="12" label="12.0000" color="#115ca5"/>
              <sld:ColorMapEntry quantity="15" label="15.0000" color="#08488e"/>
              <sld:ColorMapEntry quantity="20" label="20.0000" color="#08306b"/>
            </sld:ColorMap>
          </sld:RasterSymbolizer>
        </sld:Rule>
      </sld:FeatureTypeStyle>
    </sld:UserStyle>
  </UserLayer>
</StyledLayerDescriptor>
