
// HIDE MAP ON PAGE LOAD

setTimeout(function(){
 $('#block-views-geo-view-test-block-1').hide();

}, 100);

// BASE MAPS
var streets1  = L.tileLayer('https://api.mapbox.com/styles/v1/wri/cism5nsz4007t2wnrp5xslf7s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3JpIiwiYSI6Ik9TY2w5RTQifQ.0HV7dQTjK40mk7GpNNA64g',{attribution: '', opacity: 1});
var topLayer =  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}.png', {
	subdomains: 'abcd',
  opacity: 1,
	maxZoom: 19
});

var streets  = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
	subdomains: 'abcd',
  opacity: 1,
   attribution: '',
	maxZoom: 19
});


// OUTDOOR RECAREATION LAYERS
//--------------------------------------------------------------------------------------------------
// Outdor Recreation -  Eco Sev Potential
var outdoor_recreation_potential_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var outdoor_recreation_potential=L.tileLayer.wms(outdoor_recreation_potential_url, {
  layers: 'inca:outdoor_recreation_potential',
  transparent: true,
  format: 'image/png',
  opacity:'1',
  zIndex: 33
});
// Outdor Recreation -  Eco Sev Denamnd
var outdoor_recreation_demand_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var outdoor_recreation_demand=L.tileLayer.wms(outdoor_recreation_demand_url, {
   layers: 'inca:outdoor_recreation_demand',
   transparent: true,
   format: 'image/png',
   opacity:'1',
   zIndex: 33
});
// Outdor Recreation -  Eco Sev Use
var outdoor_recreation_use_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var outdoor_recreation_use=L.tileLayer.wms(outdoor_recreation_use_url, {
   layers: 'inca:outdoor_recreation_use',
   transparent: true,
   format: 'image/png',
   opacity:'1',
   zIndex: 33
});
// Crop Pollination -  Eco Sev Denamnd
var crop_pollination_demand_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var crop_pollination_demand=L.tileLayer.wms(crop_pollination_demand_url, {
   layers: 'inca:crop_pollination_demand',
   transparent: true,
   format: 'image/png',
   opacity:'1',
   zIndex: 33
});
// Crop Pollination -  Eco Sev Potential
var crop_pollination_potential_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var crop_pollination_potential=L.tileLayer.wms(crop_pollination_potential_url, {
   layers: 'inca:crop_pollination_potential',
   transparent: true,
   format: 'image/png',
   opacity:'1',
   zIndex: 33
});
// Crop Pollination -  Eco Sev Use
var crop_pollination_use_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var crop_pollination_use=L.tileLayer.wms(crop_pollination_use_url, {
   layers: 'inca:crop_pollination_use',
   transparent: true,
   format: 'image/png',
   opacity:'1',
   zIndex: 33
});


// START MAP

(function($) {
 $(document).bind('leaflet.map', function(e, map, lMap)
   {

// BASIC lYERS SETUP

streets1.addTo(lMap);
streets1.is_base=true;
streets.is_base=true;
topLayer.addTo(lMap);
topLayer.is_base=true;
var topPane = lMap._createPane('leaflet-top-pane', lMap.getPanes().mapPane);
topPane.appendChild(topLayer.getContainer());
topLayer.setZIndex(2);




var baseMaps = {
  "Satellite" :streets1,
  "White" :streets
};
var overlayMaps = {
  'outdoor_recreation_demand':outdoor_recreation_demand,
  'outdoor_recreation_potential':outdoor_recreation_potential,
  'outdoor_recreation_use':outdoor_recreation_use,
  'crop_pollination_demand':crop_pollination_demand,
  'crop_pollination_potential':crop_pollination_potential,
  'crop_pollination_use':crop_pollination_use,
};

layerControl = L.control.layers(baseMaps, null,  {position: 'bottomleft'});
layerControl.addTo(lMap);

// INITIAL ZOOM
lMap.setView([50, 20], 4);

// Outdor Recreation - GET FEATUREINFO FUNCTION

  function getFeatureInfoUrl_e(map, layer, latlng, params) {

 if (layer.wmsParams.layers=="inca:outdoor_recreation_potential" || layer.wmsParams.layers=="inca:outdoor_recreation_demand" || layer.wmsParams.layers=="inca:outdoor_recreation_use" || layer.wmsParams.layers=="inca:crop_pollination_demand" || layer.wmsParams.layers=="inca:crop_pollination_potential" || layer.wmsParams.layers=="inca:crop_pollination_use")
 {
      var point1 = map.latLngToContainerPoint(latlng, map.getZoom()),
          size1 = map.getSize(),
          bounds1 = map.getBounds(),
          sw1 = bounds1.getSouthWest(),
          ne1 = bounds1.getNorthEast();

      var defaultParams1 = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: '',
          version: layer._wmsVersion,
          format: layer.options.format,
          bbox: bounds1.toBBoxString(),
          height: size1.y,
          width: size1.x,
          layers: layer.options.layers,
          info_format: 'text/javascript'
      };

      params = L.Util.extend(defaultParams1, params || {});
      params[params.version === '1.3.0' ? 'i' : 'x'] = point1.x;
      params[params.version === '1.3.0' ? 'j' : 'y'] = point1.y;

      return layer._url + L.Util.getParamString(params, layer._url, true);
  }
}


// HIGHLIGHT WMS SETUP

var Ecosystem_service_hi_url_ = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var Ecosystem_service_hi_url=L.tileLayer.wms(Ecosystem_service_hi_url_, {
   layers: 'inca:Ecosystem_service_hi',
   transparent: true,
   format: 'image/png',
   opacity:'1',
   zIndex: 34
}).addTo(lMap);
Ecosystem_service_hi_url.is_base=true;
Ecosystem_service_hi_url.setParams({CQL_FILTER:"lau_code2 LIKE ''"}); // GEOSERVER WMS FILTER


// ONCLICK RESPONSE ON HIGLIGHTED Outdor Recreation -  Eco Sev Potential
function hi_highcharts_es_r_p(info,latlng){
 var lau_code2=info['lau_code2'];
 var shar_12=info['shar_12'];
 var popup_c_es_r_p = '<center><p><b><i class="fa fa-cogs"></i> Potential </b>'+shar_12+'</p></center>';
 var popup_es_r_p = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_r_p)
      .openOn(lMap);
}
// ONCLICK RESPONSE ON HIGLIGHTED Outdor Recreation -  Eco Sev Demand
function hi_highcharts_es_r_d(info,latlng){
 var lau_code2=info['lau_code2'];
 var pdens_12=info['pdens_12'];
 var popup_c_es_r_d = '<center><p><b><i class="fa fa-question-circle"></i> Demand </b>'+pdens_12+'</p></center>';
 var popup_es_r_d = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_r_d)
      .openOn(lMap);
}
// ONCLICK RESPONSE ON HIGLIGHTED Outdor Recreation -  Eco Sev Use
function hi_highcharts_es_r_u(info,latlng){
 var lau_code2=info['lau_code2'];
 var v_dens12=info['v_dens12'];
 var popup_c_es_r_u = '<center><p><b><i class="fa fa-users"></i> Use </b>'+v_dens12+'</p></center>';
 var popup_es_r_u = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_r_u)
      .openOn(lMap);
}

// ONCLICK RESPONSE ON HIGLIGHTED Crop Pollination -  Eco Sev Demand
function hi_highcharts_es_cp_d(info,latlng){
 var lau_code2=info['lau_code2'];
 var dem08_ha=info['dem08_ha'];
 var popup_c_es_cp_d = '<center><p><b><i class="fa fa-question-circle"></i> Demand </b>'+dem08_ha+'</p></center>';
 var popup_es_cp_d = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_cp_d)
      .openOn(lMap);
}
// ONCLICK RESPONSE ON HIGLIGHTED Crop pollination -  Eco Sev Potential
function hi_highcharts_es_cp_p(info,latlng){
 var lau_code2=info['lau_code2'];
 var meanpp_12=info['meanpp_12'];
 var popup_c_es_cp_p = '<center><p><b><i class="fa fa-cogs"></i> Potential </b>'+meanpp_12+'</p></center>';
 var popup_es_cp_p = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_cp_p)
      .openOn(lMap);
}
// ONCLICK RESPONSE ON HIGLIGHTED  Crop pollination -  Eco Sev Use
function hi_highcharts_es_cp_u(info,latlng){
 var lau_code2=info['lau_code2'];
 var use12_ton=info['use12_ton'];
 var popup_c_es_cp_u = '<center><p><b><i class="fa fa-users"></i> Use </b>'+use12_ton+'</p></center>';
 var popup_es_cp_u = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_cp_u)
      .openOn(lMap);
}
// --------------------------------------------------------------------------------------------
// Get Feature Info  FOR ALL LAYERS OF OUTDOOR RECREATION
// --------------------------------------------------------------------------------------------

lMap.on('click', function(e) {

if (lMap.hasLayer(outdoor_recreation_potential)) {
var es_r_p_latlng= e.latlng;
var es_r_p__url = getFeatureInfoUrl_e(
               lMap,
               outdoor_recreation_potential,
               e.latlng,
               {
                 'info_format': 'text/javascript',
                 'propertyName': 'lau_code2,shar_12',
                 'query_layers': 'inca:outdoor_recreation_potential',
                 'format_options':'callback:getJson'
               }
           );

            $.ajax({
                    jsonp: false,
                    url: es_r_p__url,
                    dataType: 'jsonp',
                    jsonpCallback: 'getJson',
                    success: handleJson_featureRequest_es_r_p
                  });
               function handleJson_featureRequest_es_r_p(data1)
               {
                  if (typeof data1.features[0]!=='undefined')
                      {
                         var prop1=data1.features[0].properties;
                         var filterx="lau_code2='"+prop1['lau_code2']+"'";
                         Ecosystem_service_hi_url.setParams({CQL_FILTER:filterx});
                         hi_highcharts_es_r_p(prop1,es_r_p_latlng);
                   }
                   else {
                   }
               }
}else if (lMap.hasLayer(outdoor_recreation_demand)) {

var es_r_d_latlng= e.latlng;
var es_r_d__url = getFeatureInfoUrl_e(
              lMap,
              outdoor_recreation_demand,
              e.latlng,
              {
                'info_format': 'text/javascript',
                'propertyName': 'lau_code2,pdens_12',
                'query_layers': 'inca:outdoor_recreation_demand',
                'format_options':'callback:getJson'
              }
          );

           $.ajax({
                   jsonp: false,
                   url: es_r_d__url,
                   dataType: 'jsonp',
                   jsonpCallback: 'getJson',
                   success: handleJson_featureRequest_es_r_d
                 });
              function handleJson_featureRequest_es_r_d(data1)
              {
                 if (typeof data1.features[0]!=='undefined')
                     {
                        var prop1=data1.features[0].properties;
                        var filterx="lau_code2='"+prop1['lau_code2']+"'";
                        Ecosystem_service_hi_url.setParams({CQL_FILTER:filterx});
                        hi_highcharts_es_r_d(prop1,es_r_d_latlng);
                  }
                  else {
                  }
              }

} else if (lMap.hasLayer(outdoor_recreation_use)) {

var es_r_u_latlng= e.latlng;
var es_r_u__url = getFeatureInfoUrl_e(
              lMap,
              outdoor_recreation_use,
              e.latlng,
              {
                'info_format': 'text/javascript',
                'propertyName': 'lau_code2,v_dens12',
                'query_layers': 'inca:outdoor_recreation_use',
                'format_options':'callback:getJson'
              }
          );

           $.ajax({
                   jsonp: false,
                   url: es_r_u__url,
                   dataType: 'jsonp',
                   jsonpCallback: 'getJson',
                   success: handleJson_featureRequest_es_r_u
                 });
              function handleJson_featureRequest_es_r_u(data1)
              {
                 if (typeof data1.features[0]!=='undefined')
                     {
                        var prop1=data1.features[0].properties;
                        var filterx="lau_code2='"+prop1['lau_code2']+"'";
                        Ecosystem_service_hi_url.setParams({CQL_FILTER:filterx});
                        hi_highcharts_es_r_u(prop1,es_r_u_latlng);
                  }
                  else {
                  }
              }
   }else if (lMap.hasLayer(crop_pollination_demand)) {

   var es_cp_d_latlng= e.latlng;
   var es_cp_d__url = getFeatureInfoUrl_e(
                 lMap,
                 crop_pollination_demand,
                 e.latlng,
                 {
                   'info_format': 'text/javascript',
                   'propertyName': 'lau_code2,dem08_ha',
                   'query_layers': 'inca:crop_pollination_demand',
                   'format_options':'callback:getJson'
                 }
             );

              $.ajax({
                      jsonp: false,
                      url: es_cp_d__url,
                      dataType: 'jsonp',
                      jsonpCallback: 'getJson',
                      success: handleJson_featureRequest_es_cp_d
                    });
                 function handleJson_featureRequest_es_cp_d(data1)
                 {
                    if (typeof data1.features[0]!=='undefined')
                        {
                           var prop1=data1.features[0].properties;
                           var filterx="lau_code2='"+prop1['lau_code2']+"'";
                           Ecosystem_service_hi_url.setParams({CQL_FILTER:filterx});
                           hi_highcharts_es_cp_d(prop1,es_cp_d_latlng);
                     }
                     else {
                     }
                 }

   }else if (lMap.hasLayer(crop_pollination_potential)) {

   var es_cp_p_latlng= e.latlng;
   var es_cp_p__url = getFeatureInfoUrl_e(
                 lMap,
                 crop_pollination_potential,
                 e.latlng,
                 {
                   'info_format': 'text/javascript',
                   'propertyName': 'lau_code2,meanpp_12',
                   'query_layers': 'inca:crop_pollination_potential',
                   'format_options':'callback:getJson'
                 }
             );

              $.ajax({
                      jsonp: false,
                      url: es_cp_p__url,
                      dataType: 'jsonp',
                      jsonpCallback: 'getJson',
                      success: handleJson_featureRequest_es_cp_p
                    });
                 function handleJson_featureRequest_es_cp_p(data1)
                 {
                    if (typeof data1.features[0]!=='undefined')
                        {
                           var prop1=data1.features[0].properties;
                           var filterx="lau_code2='"+prop1['lau_code2']+"'";
                           Ecosystem_service_hi_url.setParams({CQL_FILTER:filterx});
                           hi_highcharts_es_cp_p(prop1,es_cp_p_latlng);
                     }
                     else {
                     }
                 }

   }else if (lMap.hasLayer(crop_pollination_use)) {

   var es_cp_u_latlng= e.latlng;
   var es_cp_u__url = getFeatureInfoUrl_e(
                 lMap,
                 crop_pollination_use,
                 e.latlng,
                 {
                   'info_format': 'text/javascript',
                   'propertyName': 'lau_code2,use12_ton',
                   'query_layers': 'inca:crop_pollination_use',
                   'format_options':'callback:getJson'
                 }
             );

              $.ajax({
                      jsonp: false,
                      url: es_cp_u__url,
                      dataType: 'jsonp',
                      jsonpCallback: 'getJson',
                      success: handleJson_featureRequest_es_cp_u
                    });
                 function handleJson_featureRequest_es_cp_u(data1)
                 {
                    if (typeof data1.features[0]!=='undefined')
                        {
                           var prop1=data1.features[0].properties;
                           var filterx="lau_code2='"+prop1['lau_code2']+"'";
                           Ecosystem_service_hi_url.setParams({CQL_FILTER:filterx});
                           hi_highcharts_es_cp_u(prop1,es_cp_u_latlng);
                     }
                     else {
                     }
                 }

   }else{}
});


// LAYERS FILTERS

outdoor_recreation_potential.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});

outdoor_recreation_demand.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});

outdoor_recreation_use.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});

crop_pollination_demand.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});

crop_pollination_potential.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});

crop_pollination_use.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});


// outdoor_recreation_potential opacity slider
var sliderVal;
$(function () {
    $('#rangeSlider1').bootstrapSlider().on('slide', function (ev) {
    sliderVal = ev.value;
    outdoor_recreation_potential.setOpacity(sliderVal/100);
    });
    if (sliderVal) {
    $('#rangeSlider1').bootstrapSlider('setValue', sliderVal);
    }
});

function rangeSlider(sliderVal) {
    outdoor_recreation_potential.setOpacity(sliderVal)
}

// outdoor_recreation_demand opacity slider
var sliderVal;
$(function () {
    $('#rangeSlider2').bootstrapSlider().on('slide', function (ev) {
    sliderVal = ev.value;
    outdoor_recreation_demand.setOpacity(sliderVal/100);
    });
    if (sliderVal) {
    $('#rangeSlider2').bootstrapSlider('setValue', sliderVal);
    }
});

function rangeSlider(sliderVal) {
    outdoor_recreation_demand.setOpacity(sliderVal)
}

// outdoor_recreation_use opacity slider
var sliderVal;
$(function () {
    $('#rangeSlider3').bootstrapSlider().on('slide', function (ev) {
    sliderVal = ev.value;
    outdoor_recreation_use.setOpacity(sliderVal/100);
    });
    if (sliderVal) {
    $('#rangeSlider3').bootstrapSlider('setValue', sliderVal);
    }
});

function rangeSlider(sliderVal) {
    outdoor_recreation_use.setOpacity(sliderVal)
}

//crop pollination potential opacity slider
var sliderVal;
$(function () {
    $('#rangeSlider4').bootstrapSlider().on('slide', function (ev) {
    sliderVal = ev.value;
    crop_pollination_potential.setOpacity(sliderVal/100);
    });
    if (sliderVal) {
    $('#rangeSlider4').bootstrapSlider('setValue', sliderVal);
    }
});

function rangeSlider(sliderVal) {
    crop_pollination_potential.setOpacity(sliderVal)
}

//crop pollination demand opacity slider
var sliderVal;
$(function () {
    $('#rangeSlider5').bootstrapSlider().on('slide', function (ev) {
    sliderVal = ev.value;
    crop_pollination_demand.setOpacity(sliderVal/100);
    });
    if (sliderVal) {
    $('#rangeSlider5').bootstrapSlider('setValue', sliderVal);
    }
});

function rangeSlider(sliderVal) {
    crop_pollination_demand.setOpacity(sliderVal)
}

//crop pollination use opacity slider
var sliderVal;
$(function () {
    $('#rangeSlider6').bootstrapSlider().on('slide', function (ev) {
    sliderVal = ev.value;
    crop_pollination_use.setOpacity(sliderVal/100);
    });
    if (sliderVal) {
    $('#rangeSlider6').bootstrapSlider('setValue', sliderVal);
    }
});

function rangeSlider(sliderVal) {
    crop_pollination_use.setOpacity(sliderVal)
}
// ------------------------------------------------------------------------------------------------------end of the map stuff------------------------------------------------------------------------

// add icons to submenu - recreation
$( "#menu-418-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-419-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-420-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-421-1" ).prepend( '<i class="fa fa-table" aria-hidden="true"></i>' );
$( "#menu-422-1" ).prepend( '<i class="fa fa-signal" aria-hidden="true"></i>' );
// add icons to submenu -  crop pollination
$( "#menu-575-2" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-586-2" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-593-2" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-600-2" ).prepend( '<i class="fa fa-table" aria-hidden="true"></i>' );
$( "#menu-604-2" ).prepend( '<i class="fa fa-signal" aria-hidden="true"></i>' );
// Trends Graph menu - recreation
$("#menu-422-1").click(function(event) {
  $('#outdoor_recreation_trends').toggle();
  $("#block-block-4").show();
  $('#accountingTables_outdoorRecreation').fadeOut('slow');
});
// Trends Graph menu - crop pollination
$("#menu-604-2").click(function(event) {
  $('#crop_pollination_trends').toggle();
  $("#block-block-4").show();
  $('#accountingTables_cropPollination').fadeOut('slow');
});
// Accounting tab  OUTDOOR RECREATION menu
$("#menu-421-1").click(function(event) {
  $('#accountingTables_outdoorRecreation').toggle();
  $('#outdoor_recreation_trends').fadeOut('slow');
});
$("#menu-421-1_x").click(function(event) {
 $('#accountingTables_outdoorRecreation').fadeOut('slow');
});
// Accounting tab  CROP POLLINATION menu
$("#menu-600-2").click(function(event) {
  $('#accountingTables_cropPollination').toggle();
  $('#crop_pollination_trends').fadeOut('slow');
});
$("#menu-600-2_x").click(function(event) {
 $('#accountingTables_cropPollination').fadeOut('slow');
});

// Click on the map remoove trends and accounting tab
lMap.on('click',function(e){
    $( "#accountingTables_outdoorRecreation, #outdoor_recreation_trends, #accountingTables_cropPollination, #crop_pollination_trends" ).fadeOut('slow');
})

// Crop Pollination -  Potential menu
 $("#menu-575-2").click(function(event) {
   if (lMap.hasLayer(crop_pollination_potential)) {
          lMap.removeLayer(crop_pollination_potential);
          $("#menu-575-2").css('background-color', '#f2bf4c');//yellow
          $("#crop_poll_pot_leg").hide();
          lMap.closePopup();
   } else {
     lMap.closePopup();
         lMap.addLayer(crop_pollination_potential);
         lMap.removeLayer(crop_pollination_demand);
         lMap.removeLayer(crop_pollination_use);
         $("#menu-575-2").css('background-color', '#2f4d69');//blue
         $("#menu-586-2").css('background-color', '#f2bf4c'); //yellow
         $("#menu-593-2").css('background-color', '#f2bf4c');//yellow
         $("#block-block-5").show();
         $("#crop_poll_pot_leg").show();
         $("#crop_poll_use_leg, #crop_poll_dem_leg").hide();
         $("#outdoor_rec_pot_leg,  #outdoor_rec_dem_leg, #outdoor_rec_use_leg").hide();
   }
 });

 // Crop Pollination -  demand menu
  $("#menu-586-2").click(function(event) {
    if (lMap.hasLayer(crop_pollination_demand)) {
           lMap.removeLayer(crop_pollination_demand);
           $("#menu-586-2").css('background-color', '#f2bf4c');//yellow
           $("#crop_poll_dem_leg").hide();
           lMap.closePopup();
    } else {
      lMap.closePopup();
          lMap.addLayer(crop_pollination_demand);
          lMap.removeLayer(crop_pollination_potential);
          lMap.removeLayer(crop_pollination_use);
          $("#menu-586-2").css('background-color', '#2f4d69');//blue
          $("#menu-575-2").css('background-color', '#f2bf4c'); //yellow
          $("#menu-593-2").css('background-color', '#f2bf4c');//yellow
          $("#block-block-5").show();
          $("#crop_poll_dem_leg").show();
          $("#crop_poll_use_leg, #crop_poll_pot_leg").hide();
          $("#outdoor_rec_pot_leg,  #outdoor_rec_dem_leg, #outdoor_rec_use_leg").hide();

    }
  });

  // Crop Pollination -  Eco Sev use menu
   $("#menu-593-2").click(function(event) {
     if (lMap.hasLayer(crop_pollination_use)) {
            lMap.removeLayer(crop_pollination_use);
            $("#menu-593-2").css('background-color', '#f2bf4c');//yellow
            $("#crop_poll_use_leg").hide();
            lMap.closePopup();
     } else {
       lMap.closePopup();
           lMap.addLayer(crop_pollination_use);
           lMap.removeLayer(crop_pollination_potential);
           lMap.removeLayer(crop_pollination_demand);
           $("#menu-593-2").css('background-color', '#2f4d69');//blue
           $("#menu-575-2").css('background-color', '#f2bf4c'); //yellow
           $("#menu-586-2").css('background-color', '#f2bf4c');//yellow
           $("#block-block-5").show();
           $("#crop_poll_use_leg").show();
           $("#crop_poll_dem_leg, #crop_poll_pot_leg").hide();
           $("#outdoor_rec_pot_leg,  #outdoor_rec_dem_leg, #outdoor_rec_use_leg").hide();
     }
   });
// Outdor Recreation -  Eco Sev Potential menu
 $("#menu-418-1").click(function(event) {
   if (lMap.hasLayer(outdoor_recreation_potential)) {
          lMap.removeLayer(outdoor_recreation_potential);
          $("#menu-418-1").css('background-color', '#f2bf4c');//yellow
          $("#outdoor_rec_pot_leg").hide();
          lMap.closePopup();
   } else {
     lMap.closePopup();
         lMap.addLayer(outdoor_recreation_potential);
         lMap.removeLayer(outdoor_recreation_demand);
         lMap.removeLayer(outdoor_recreation_use);
         $("#menu-418-1").css('background-color', '#2f4d69');//blue
         $("#menu-419-1").css('background-color', '#f2bf4c'); //yellow
         $("#menu-420-1").css('background-color', '#f2bf4c');//yellow
           $("#block-block-5").show();
         $("#outdoor_rec_pot_leg").show();
         $("#outdoor_rec_dem_leg, #outdoor_rec_use_leg").hide();
         $("#crop_poll_pot_leg, #crop_poll_dem_leg, #crop_poll_use_leg ").hide();
   }
 });

// Outdor Recreation -  Eco Sev Denamnd menu
  $("#menu-419-1").click(function(event) {

    if (lMap.hasLayer(outdoor_recreation_demand)) { //only for terrestrial ecoregions
           lMap.removeLayer(outdoor_recreation_demand);
           $("#menu-419-1").css('background-color', '#f2bf4c');//yellow
           $("#outdoor_rec_dem_leg").hide();
           lMap.closePopup();
    } else {
      lMap.closePopup();
          lMap.addLayer(outdoor_recreation_demand);
          lMap.removeLayer(outdoor_recreation_potential);
          lMap.removeLayer(outdoor_recreation_use);
          $("#menu-419-1").css('background-color', '#2f4d69');//blue
          $("#menu-418-1").css('background-color', '#f2bf4c');//yellow
          $("#menu-420-1").css('background-color', '#f2bf4c');//yellow
          $("#block-block-5").show();
          $("#outdoor_rec_dem_leg").show();
          $("#outdoor_rec_use_leg, #outdoor_rec_pot_leg").hide();
          $("#crop_poll_pot_leg, #crop_poll_dem_leg, #crop_poll_use_leg ").hide();
    }
  });

  // Outdor Recreation -  Eco Sev Use menu
    $("#menu-420-1").click(function(event) {
      if (lMap.hasLayer(outdoor_recreation_use)) {
             lMap.removeLayer(outdoor_recreation_use);
             $("#menu-420-1").css('background-color', '#f2bf4c');//yellow
             $("#outdoor_rec_use_leg").hide();
             lMap.closePopup();
      } else {
        lMap.closePopup();
            lMap.addLayer(outdoor_recreation_use);
            lMap.removeLayer(outdoor_recreation_potential);
            lMap.removeLayer(outdoor_recreation_demand);
            $("#menu-420-1").css('background-color', '#2f4d69');//blue
            $("#menu-419-1").css('background-color', '#f2bf4c');//yellow
            $("#menu-418-1").css('background-color', '#f2bf4c');//yellow
            $("#block-block-5").show();
            $("#outdoor_rec_use_leg").show();
            $("#outdoor_rec_pot_leg, #outdoor_rec_dem_leg").hide();
            $("#crop_poll_pot_leg, #crop_poll_dem_leg, #crop_poll_use_leg ").hide();
      }
    });

// outdoor_recreation_national_data - POTENTIAL
setTimeout(function(){
    var current_url = window.location.host
    var url = '//'+current_url+'/outdoor_recreation_national_data/outdoor_recreation_national_data.jsonp';
    console.log(url);
    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var or_nd_Country = [];
        var or_nd_Recreation_Potential = [];
        var arr_data=[];
        $.each(d, function (i, data) {
        var obj={};
        for (var prop in data){
          if(prop == 'or_nd_Country'){
          or_nd_Country.push(data[prop]);
          obj.or_nd_Country=data[prop];
          }
          else if(prop == 'or_nd_Recreation_Potential'){
          or_nd_Recreation_Potential.push(parseFloat(data[prop]));
          obj.y= parseFloat(data[prop]);
          }
        else{}
      } //for
      arr_data.push(obj);
    });
    arr_data.sort(function(a, b) {return b.y- a.y;})
    var categories=[];
    for (var p in arr_data)
    {categories.push(arr_data[p].or_nd_Country);}
    var chart = new Highcharts.Chart({
           chart: {
             renderTo: 'outdoor-recreation-national-data_potential',
               type: 'bar',
               zoomType: 'xy',
               backgroundColor:'rgba(255, 255, 255, 0)',
               height:580
           },
           title: {text: 'Recreation Potential'},
           subtitle: {
                text: 'Share of areas for daily recreation - 2012'
           },
           credits: {
               enabled: true,
               text: 'Click on a bar to query the map and double-click to reset the selection',
           },
           xAxis: {categories: categories},
           yAxis: {title: {text: ''}},
           tooltip: {
              hideDelay: 500,
              useHTML: true,
              pointFormat: '<b>{point.y:.2f}</b>',
              style: {pointerEvents: 'auto'},
              shared: true
           },
           plotOptions: {
            column: { pointPadding: 0.2,borderWidth: 0}},
            series:[{
            showInLegend: false,
            color: '#032d3b',
            data: arr_data,
            point: {
                events: {
                    click: function() {
                      outdoor_recreation_potential.setParams({CQL_FILTER:"lau_code2 LIKE '%"+this.category+"%'"});
                        lMap.fitBounds([[62.712, -24.227],[37.774, 49.125]]);
                        $( "#outdoor-recreation-national-data_potential" ).dblclick(function() {
                          outdoor_recreation_potential.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});
                        });

                    }
                }
            }
           }]
   });
  }
 });

}, 200);

// outdoor_recreation_national_data -  DEMAND
setTimeout(function(){
    var current_url = window.location.host
    var url = '//'+current_url+'/outdoor_recreation_national_data/outdoor_recreation_national_data.jsonp';

    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var or_nd_Country = [];
        var or_nd_Recreation_Demand = [];
        var arr_data=[];

        $.each(d, function (i, data) {
        var obj={};
        for (var prop in data){
          if(prop == 'or_nd_Country'){
          or_nd_Country.push(data[prop]);
          obj.or_nd_Country=data[prop];
          }
          else if(prop == 'or_nd_Recreation_Demand'){
          or_nd_Recreation_Demand.push(parseFloat(data[prop]));
          obj.y= parseFloat(data[prop]);
          }
        else{}
      } //for
      arr_data.push(obj);
    });
    arr_data.sort(function(a, b) {return b.y- a.y;})
    var categories=[];
    for (var p in arr_data)
    {categories.push(arr_data[p].or_nd_Country);}
    var chart = new Highcharts.Chart({
           chart: {
             renderTo: 'outdoor-recreation-national-data_demand',
               type: 'bar',
               zoomType: 'xy',
               backgroundColor:'rgba(255, 255, 255, 0)',
               height:580
           },
           title: {text: 'Recreation Demand'},
           subtitle: {
                text: 'Population density (people per sq. km of land area) 2012'
           },
           credits: {
               enabled: true,
               text: 'Click on a bar to query the map and double-click to reset the selection',
           },
           xAxis: {categories: categories},
           yAxis: {title: {text: ''}},
           tooltip: {
              hideDelay: 500,
              useHTML: true,
              pointFormat: '<b>{point.y:.2f}</b>',
              style: {pointerEvents: 'auto'},
              shared: true
           },
           plotOptions: {
            column: { pointPadding: 0.2,borderWidth: 0}},
            series:[{
            showInLegend: false,
            color: '#032d3b',
            data: arr_data,
            point: {
                events: {
                    click: function() {
                      outdoor_recreation_demand.setParams({CQL_FILTER:"lau_code2 LIKE '%"+this.category+"%'"});
                      lMap.fitBounds([[62.712, -24.227],[37.774, 49.125]]);
                      $( "#outdoor-recreation-national-data_demand" ).dblclick(function() {
                        outdoor_recreation_demand.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});
                      });
                    }
                }
            }
           }]
   });
  }
 });
}, 200);

// outdoor_recreation_national_data - USE
setTimeout(function(){
    var current_url = window.location.host
    var url = '//'+current_url+'/outdoor_recreation_national_data/outdoor_recreation_national_data.jsonp';

    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var or_nd_Country = [];
        var or_nd_Recreation_Use = [];
        var arr_data=[];

        $.each(d, function (i, data) {
        var obj={};
        for (var prop in data){
          if(prop == 'or_nd_Country'){
          or_nd_Country.push(data[prop]);
          obj.or_nd_Country=data[prop];
          }
          else if(prop == 'or_nd_Recreation_Use'){
          or_nd_Recreation_Use.push(parseFloat(data[prop]));
          obj.y= parseFloat(data[prop]);
          }
        else{}
      } //for
      arr_data.push(obj);
    });
    arr_data.sort(function(a, b) {return b.y- a.y;})
    var categories=[];
    for (var p in arr_data)
    {categories.push(arr_data[p].or_nd_Country);}
    var chart = new Highcharts.Chart({
           chart: {
             renderTo: 'outdoor-recreation-national-data_use',
               type: 'bar',
               zoomType: 'xy',
               backgroundColor:'rgba(255, 255, 255, 0)',
               height:580
           },
           title: {text: 'Recreation Use'},
           subtitle: {
                text: 'Total Number of potential visits per year - 2012'
           },
           credits: {
               enabled: true,
               text: 'Click on a bar to query the map and double-click to reset the selection',
           },
           xAxis: {categories: categories},
           yAxis: {
             title: {text: ''},
             labels: {
               formatter: function() {
                 return this.value / 1000000 + ' Million';
               }
             }
         },
           tooltip: {
              hideDelay: 500,
              useHTML: true,
              pointFormat: '<b>{point.y:.2f}</b>',
              style: {pointerEvents: 'auto'},
              shared: true

           },
           plotOptions: {
            column: { pointPadding: 0.2,borderWidth: 0}},
            series:[{
            showInLegend: false,
            color: '#032d3b',
            data: arr_data,
            point: {
                events: {
                    click: function() {
                      outdoor_recreation_use.setParams({CQL_FILTER:"lau_code2 LIKE '%"+this.category+"%'"});
                      lMap.fitBounds([[62.712, -24.227],[37.774, 49.125]]);
                      $( "#outdoor-recreation-national-data_use" ).dblclick(function() {
                        outdoor_recreation_use.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});
                      });
                    }
                }
            }
           }]
   });
  }
 });
}, 200);


// crop_pollination_national_data - POTENTIAL
setTimeout(function(){
    var current_url = window.location.host
    var url = '//'+current_url+'/crop_pollination_national_data/crop_pollination_national_data.jsonp';
    console.log(url);
    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var cp_nd_Country = [];
        var cp_nd_Recreation_Potential = [];
        var arr_data=[];
        $.each(d, function (i, data) {
        var obj={};
        for (var prop in data){
          if(prop == 'cp_nd_Country'){
          cp_nd_Country.push(data[prop]);
          obj.cp_nd_Country=data[prop];
          }
          else if(prop == 'cp_nd_Recreation_Potential'){
          cp_nd_Recreation_Potential.push(parseFloat(data[prop]));
          obj.y= parseFloat(data[prop]);
          }
        else{}
      } //for
      arr_data.push(obj);
    });
    arr_data.sort(function(a, b) {return b.y- a.y;})
    var categories=[];
    for (var p in arr_data)
    {categories.push(arr_data[p].cp_nd_Country);}
    var chart = new Highcharts.Chart({
           chart: {
             renderTo: 'crop-pollination-national-data_potential',
               type: 'bar',
               zoomType: 'xy',
               backgroundColor:'rgba(255, 255, 255, 0)',
               height:580
           },
           title: {text: 'Crop Pollination Potential'},
           subtitle: {
                text: 'Relative extent of the Service Providing Areas in 2012 (in %)'
           },
           credits: {
               enabled: true,
               text: 'Click on a bar to query the map and double-click to reset the selection',
           },
           xAxis: {categories: categories},
           yAxis: {title: {text: ''}},
           tooltip: {
              hideDelay: 500,
              useHTML: true,
              pointFormat: '<b>{point.y:.2f}</b>',
              style: {pointerEvents: 'auto'},
              shared: true
           },
           plotOptions: {
            column: { pointPadding: 0.2,borderWidth: 0}},
            series:[{
            showInLegend: false,
            color: '#032d3b',
            data: arr_data,
            point: {
                events: {
                    click: function() {
                      crop_pollination_potential.setParams({CQL_FILTER:"lau_code2 LIKE '%"+this.category+"%'"});

                        lMap.fitBounds([[62.712, -24.227],[37.774, 49.125]]);
                        $( "#crop-pollination-national-data_potential" ).dblclick(function() {
                          crop_pollination_potential.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});
                        });

                    }
                }
            }
           }]
   });
  }
 });

}, 200);

// crop_pollination_national_data -  DEMAND
setTimeout(function(){
    var current_url = window.location.host
    var url = '//'+current_url+'/crop_pollination_national_data/crop_pollination_national_data.jsonp';

    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var cp_nd_Country = [];
        var cp_nd_Recreation_Demand = [];
        var arr_data=[];

        $.each(d, function (i, data) {
        var obj={};
        for (var prop in data){
          if(prop == 'cp_nd_Country'){
          cp_nd_Country.push(data[prop]);
          obj.cp_nd_Country=data[prop];
          }
          else if(prop == 'cp_nd_Recreation_Demand'){
          cp_nd_Recreation_Demand.push(parseFloat(data[prop]));
          obj.y= parseFloat(data[prop]);
          }
        else{}
      } //for
      arr_data.push(obj);
    });
    arr_data.sort(function(a, b) {return b.y- a.y;})
    var categories=[];
    for (var p in arr_data)
    {categories.push(arr_data[p].cp_nd_Country);}
    var chart = new Highcharts.Chart({
           chart: {
             renderTo: 'crop-pollination-national-data_demand',
               type: 'bar',
               zoomType: 'xy',
               backgroundColor:'rgba(255, 255, 255, 0)',
               height:580
           },
           title: {text: 'Crop Pollination Demand'},
           subtitle: {
                text: 'Extent of crops with a level of pollination (Thousands of hectares) 2008'
           },
           credits: {
               enabled: true,
               text: 'Click on a bar to query the map and double-click to reset the selection',
           },
           xAxis: {categories: categories},
           yAxis: {title: {text: ''}},
           tooltip: {
              hideDelay: 500,
              useHTML: true,
              pointFormat: '<b>{point.y:.2f}</b>',
              style: {pointerEvents: 'auto'},
              shared: true
           },
           plotOptions: {
            column: { pointPadding: 0.2,borderWidth: 0}},
            series:[{
            showInLegend: false,
            color: '#032d3b',
            data: arr_data,
            point: {
                events: {
                    click: function() {
                      crop_pollination_demand.setParams({CQL_FILTER:"lau_code2 LIKE '%"+this.category+"%'"});
                      lMap.fitBounds([[62.712, -24.227],[37.774, 49.125]]);
                      $( "#crop-pollination-national-data_demand" ).dblclick(function() {
                        crop_pollination_demand.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});
                      });
                    }
                }
            }
           }]
   });
  }
 });
}, 200);

// crop_pollination_national_data - USE
setTimeout(function(){
    var current_url = window.location.host
    var url = '//'+current_url+'/crop_pollination_national_data/crop_pollination_national_data.jsonp';

    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var cp_nd_Country = [];
        var cp_nd_Recreation_Use = [];
        var arr_data=[];

        $.each(d, function (i, data) {
        var obj={};
        for (var prop in data){
          if(prop == 'cp_nd_Country'){
          cp_nd_Country.push(data[prop]);
          obj.cp_nd_Country=data[prop];
          }
          else if(prop == 'cp_nd_Recreation_Use'){
          cp_nd_Recreation_Use.push(parseFloat(data[prop]));
          obj.y= parseFloat(data[prop]);
          }
        else{}
      } //for
      arr_data.push(obj);
    });
    arr_data.sort(function(a, b) {return b.y- a.y;})
    var categories=[];
    for (var p in arr_data)
    {categories.push(arr_data[p].cp_nd_Country);}
    var chart = new Highcharts.Chart({
           chart: {
             renderTo: 'crop-pollination-national-data_use',
               type: 'bar',
               zoomType: 'xy',
               backgroundColor:'rgba(255, 255, 255, 0)',
               height:580
           },
           title: {text: 'Crop Pollination Use'},
           subtitle: {
                text: 'Based on crop demand of 2008 - last available year (tonne/year)'
           },
           credits: {
               enabled: true,
               text: 'Click on a bar to query the map and double-click to reset the selection',
           },
           xAxis: {categories: categories},
           yAxis: {
             title: {text: ''},
         },
           tooltip: {
              hideDelay: 500,
              useHTML: true,
              pointFormat: '<b>{point.y:.2f}</b>',
              style: {pointerEvents: 'auto'},
              shared: true

           },
           plotOptions: {
            column: { pointPadding: 0.2,borderWidth: 0}},
            series:[{
            showInLegend: false,
            color: '#032d3b',
            data: arr_data,
            point: {
                events: {
                    click: function() {
                      crop_pollination_use.setParams({CQL_FILTER:"lau_code2 LIKE '%"+this.category+"%'"});
                      lMap.fitBounds([[62.712, -24.227],[37.774, 49.125]]);
                      $( "#crop-pollination-national-data_use" ).dblclick(function() {
                        crop_pollination_use.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});
                      });
                    }
                }
            }
           }]
   });
  }
 });
}, 200);

// outdoor_recreation_trends

setTimeout(function(){
    var current_url = window.location.host
    var url = '//'+current_url+'/outdoor_recreation_trends/outdoor_recreation_trends.jsonp';

    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var or_t_Country = [];
        console.log(or_t_Country);
        var or_t_Recreation_demand = [];
        var or_t_Recreation_potential = [];
        var arr_data=[];
        console.log(arr_data);
        $.each(d, function (i, data) {
        var obj={};
        for (var prop in data){
          if(prop == 'or_t_Country'){
          or_t_Country.push(data[prop]);
          obj.or_t_Country=data[prop];
          }
          else if(prop == 'or_t_Recreation_demand'){
          or_t_Recreation_demand.push(parseFloat(data[prop]));
          obj.or_t_Recreation_demand= parseFloat(data[prop]);
          }
          else if(prop == 'or_t_Recreation_potential'){
          or_t_Recreation_potential.push(parseFloat(data[prop]));
          obj.y= parseFloat(data[prop]);
          }
        else{}
      } //for
      arr_data.push(obj);
    });
    arr_data.sort(function(a, b) {return b.y- a.y;})
    var categories=[];
    for (var p in arr_data)
    {categories.push(arr_data[p].or_t_Country);}
    var chart = new Highcharts.Chart({
           chart: {
             renderTo: 'outdoor_recreation_trends',
               type: 'column',
               zoomType: 'xy',
               backgroundColor:'rgba(255, 255, 255, 0)'
               //width:680
           },
           title: {text: null},
           subtitle: {
               useHTML: true,
                text: '<p>Changes in the actual flow of outdoor recreation between 2000 and 2012 (in %) <a href="#superfish-1" id="trends_close"><i class="fa fa-times"></i></a></p>'
           },
           credits: {
               enabled: true,
               text: '',
           },
           xAxis: {categories: categories},
           yAxis: {title: {text: ''}},
           tooltip: {
               headerFormat: '<b>{point.x}</b><br/>',
               pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
           },
           plotOptions: {
               column: {
                   stacking: 'normal',
                   dataLabels: {
                       enabled: false,
                   }
               }
           },
            series:[{
              name: 'Recreation Demand',
              data: or_t_Recreation_demand,
              color: '#eeaa10',
            },{
            name: 'Recreation Potential',
            data: or_t_Recreation_potential,
            color: '#304c67',
          }]
   });
   $('#trends_close > i').click(function(event) {
     $('#outdoor_recreation_trends').hide();
   });
  }
 });
}, 200);


// crop_pollination_trends

setTimeout(function(){
    var current_url = window.location.host
    var url = '//'+current_url+'/crop_pollination_trends/crop_pollination_trends.jsonp';

    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(d) {
        var cp_t_Country = [];
        var cp_t_demand_2000_06 = [];
        var cp_t_demand_2006_12 = [];
        var arr_data=[];
        console.log(arr_data);
        $.each(d, function (i, data) {
        var obj={};
        for (var prop in data){
          if(prop == 'cp_t_Country'){
          cp_t_Country.push(data[prop]);
          obj.cp_t_Country=data[prop];
          }
          else if(prop == 'cp_t_demand_2000_06'){
          cp_t_demand_2000_06.push(parseFloat(data[prop]));
          obj.cp_t_demand_2000_06= parseFloat(data[prop]);
          }
          else if(prop == 'cp_t_demand_2006_12'){
          cp_t_demand_2006_12.push(parseFloat(data[prop]));
          obj.y= parseFloat(data[prop]);
          }
        else{}
      } //for
      arr_data.push(obj);
    });
    //arr_data.sort(function(a, b) {return b.y- a.y;})
    var categories=[];
    for (var p in arr_data)
    {categories.push(arr_data[p].cp_t_Country);}
    var chart = new Highcharts.Chart({
           chart: {
             renderTo: 'crop_pollination_trends',
               type: 'column',
               zoomType: 'xy',
               backgroundColor:'rgba(255, 255, 255, 0)'
               //width:680
           },
           title: {text: null},
           subtitle: {
               useHTML: true,
                text: '<p>Changes in crop demand covered by pollination between 2000 and 2012 (in %) <a href="#superfish-1" id="trends_close"><i class="fa fa-times"></i></a></p>'
           },
           credits: {
               enabled: true,
               text: '',
           },
           xAxis: {categories: categories},
           yAxis: {title: {text: ''}},
           tooltip: {
               headerFormat: '<b>{point.x}</b><br/>',
               pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
           },
           plotOptions: {
               column: {
                   stacking: 'normal',
                   dataLabels: {
                       enabled: false,
                   }
               }
           },
            series:[{
              name: 'Change in Demand between 2000 and 2006',
              data: cp_t_demand_2006_12,
              color: '#eeaa10',
            },{
            name: 'Change in Demand between 2006 and 2012',
            data: cp_t_demand_2000_06,
            color: '#304c67',
          }]
   });
   $('#trends_close > i').click(function(event) {
     $('#crop_pollination_trends').hide();
   });
  }
 });
}, 200);


$(".graph_data").click(function(event) {
  $('.showgraph_data').toggle();
});


// ------------------------------------------------------------- END OF SCRIPT ------------------------------------------------------------------------------
})

})(jQuery);
