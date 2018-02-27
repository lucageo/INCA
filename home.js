(function($) {
 $(document).bind('leaflet.map', function(e, map, lMap)
   {

//------------------------------------------------------------------------------
// BASIC SETUP
//------------------------------------------------------------------------------
var streets  = L.tileLayer('https://api.mapbox.com/styles/v1/lucageo/cj832fpvta54y2st4nn8gkyf3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVjYWdlbyIsImEiOiJjaXIwY2FmNHAwMDZ1aTVubmhuMDYyMmtjIn0.1jWhLwVzKS6k1Ldn-bVQPg',{attribution: ''});//.addTo(lMap);
var esri = L.tileLayer('https://api.mapbox.com/styles/v1/wri/cism5nsz4007t2wnrp5xslf7s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3JpIiwiYSI6Ik9TY2w5RTQifQ.0HV7dQTjK40mk7GpNNA64g',{attribution: '', opacity: 1}).addTo(lMap);
L.control.scale({position: 'topright'});
//set lat long and zoom level


 setTimeout(function(){
  $('#block-views-geo-view-test-block-1').hide();

}, 100);

$(document).ready(function () {
if ($(window).width() < 740) {
var lat = 0;
var lon = 30;
var zoom = 3;
}
else {
  var lat = 0;
  var lon = 30;
  var zoom = 3;
}

lMap.setView([50, 10], 4);
});

//----------------------------------------------------------------
// Layers
//----------------------------------------------------------------
var baseMaps = {
    "Light": streets,
};
var overlayMaps = {
    // 'ecoregion':ecoregion,
     'Ecosystem_service_Recreation_demand':Ecosystem_service_Recreation_demand,
     'Ecosystem_service_Recreation_potential':Ecosystem_service_Recreation_potential,
     'Ecosystem_service_Recreation_use':Ecosystem_service_Recreation_use,
};


// Outdor Recreation -  Eco Sev Potential - GET FEATUREINFO FUNCTION

  function getFeatureInfoUrl_e(map, layer, latlng, params) {

 if (layer.wmsParams.layers=="inca:Ecosystem_service_Recreation_potential")
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


// Outdor Recreation -  Eco Sev Potential - HIGHLIGHT WMS SETUP

var Ecosystem_service_Recreation_potential_url_hi = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var Ecosystem_service_Recreation_potential_hi=L.tileLayer.wms(Ecosystem_service_Recreation_potential_url_hi, {
   layers: 'inca:Ecosystem_service_Recreation_potential',
   transparent: true,
   format: 'image/png',
   opacity:'1',
   zIndex: 34 // Use zIndex to order the tileLayers within the tilePane. The higher number, the upper vertically.
}).addTo(lMap);

Ecosystem_service_Recreation_potential_hi.setParams({CQL_FILTER:"lau_code2 LIKE ''"}); // GEOSERVER WMS FILTER


// ONCLICK RESPONSE ON HIGLIGHTED Outdor Recreation -  Eco Sev Potential

function hi_highcharts_es_r_p(info,latlng){
 var lau_code2=info['lau_code2'];
 var shar_12=info['shar_12'];

 var popup_c_es_r_p = '<center><p><b>Municipality </b>'+lau_code2+'</p></center><hr><center><p><b>Potential </b>'+shar_12+'</p></center>';
 var popup_es_r_p = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_r_p)
      .openOn(lMap);
}

// --------------------------------------------------------------------------------------------
// main popup
// --------------------------------------------------------------------------------------------


lMap.on('click', function(e) {

// check if the layer is Ecoregion
if (lMap.hasLayer(Ecosystem_service_Recreation_potential)) {
var es_r_p_latlng= e.latlng;
var es_r_p__url = getFeatureInfoUrl_e(
               lMap,
               Ecosystem_service_Recreation_potential,
               e.latlng,
               {
                 'info_format': 'text/javascript',  //it allows us to get a jsonp
                 'propertyName': 'lau_code2,shar_12',
                 'query_layers': 'inca:Ecosystem_service_Recreation_potential',
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
                        // AND SET THE FILTER OF WDPA HIGLIGHTED
                       // console.log(filterx);
                         Ecosystem_service_Recreation_potential_hi.setParams({CQL_FILTER:filterx});
                         hi_highcharts_es_r_p(prop1,es_r_p_latlng);
                   }
                   else {
                   //  console.log(' no info')
                   }
               }
           }
           else{



  }// Close else

}); // Close onclick function



// Outdor Recreation -  Eco Sev Potential
var Ecosystem_service_Recreation_potential_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var Ecosystem_service_Recreation_potential=L.tileLayer.wms(Ecosystem_service_Recreation_potential_url, {
  layers: 'inca:Ecosystem_service_Recreation_potential',
  transparent: true,
  format: 'image/png',
  opacity:'0.8',
  zIndex: 33
});


























// Outdor Red=creation -  Eco Sev Denamnd
var Ecosystem_service_Recreation_demand_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var Ecosystem_service_Recreation_demand=L.tileLayer.wms(Ecosystem_service_Recreation_demand_url, {
   layers: 'inca:Ecosystem_service_Recreation_demand',
   transparent: true,
   format: 'image/png',
   opacity:'0.8',
   zIndex: 33
})

var Ecosystem_service_Recreation_use_url = 'https://lrm-maps.jrc.ec.europa.eu/geoserver/inca/wms';
var Ecosystem_service_Recreation_use=L.tileLayer.wms(Ecosystem_service_Recreation_use_url, {
   layers: 'inca:Ecosystem_service_Recreation_use',
   transparent: true,
   format: 'image/png',
   opacity:'0.8',
   zIndex: 33
})





// ------------------------------------------------------------------------------------------------------end of the map stuff------------------------------------------------------------------------



 $("#shoecoservices").click(function(event) {
     $(".menuparent").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-418-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-419-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-420-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-425-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-428-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-429-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-432-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-426-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-430-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-433-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-427-1 > a").attr("href", "#block-views-geo-view-test-block-1");
     $("#menu-431-1 > a").attr("href", "#block-views-geo-view-test-block-1");







     $('.pane-superfish-1').toggle();
     $('#block-views-geo-view-test-block-1').toggle();
     event.preventDefault();
           $('html,body').animate({
               scrollTop: $('#block-views-geo-view-test-block-1').css('top')
           }, 100, function() {
               $('html, body').animate({
                   scrollTop: 600
               }, 100);
           });

      if ($('#shoecoservices').css('color')==="rgb(255, 255, 255)") {

            $("#shoecoservices").css('color', '#eeaa10');
            $(".fa-cogs").css('color', '#eeaa10');


      }else{
            $("#shoecoservices").css('color', '#ffffff');
            $(".fa-cogs").css('color', '#ffffff');
      }
 });
 $("#menu-421-1_x").click(function(event) {
  $('#accountingTables_outdoorRecreation').hide();
 });



 $("#menu-421-1").click(function(event) {

  $('#accountingTables_outdoorRecreation').toggle();
  $('#accountingTables_cropPollination').hide();
  $('#accountingTables_soilProtection').hide();
  $('#accountingTables_filtration').hide();
 });

 $("#menu-436-1").click(function(event) {

  $('#accountingTables_outdoorRecreation').hide();
  $('#accountingTables_cropPollination').toggle();
  $('#accountingTables_soilProtection').hide();
  $('#accountingTables_filtration').hide();
 });

 $("#menu-434-1").click(function(event) {

  $('#accountingTables_outdoorRecreation').hide();
  $('#accountingTables_cropPollination').hide();
  $('#accountingTables_soilProtection').toggle();
  $('#accountingTables_filtration').hide();
 });

 $("#menu-435-1").click(function(event) {

  $('#accountingTables_outdoorRecreation').hide();
  $('#accountingTables_cropPollination').hide();
  $('#accountingTables_soilProtection').hide();
  $('#accountingTables_filtration').toggle();
 });


// Outdor Red=creation -  Eco Sev Potential
 $("#menu-418-1").click(function(event) {

   if (lMap.hasLayer(Ecosystem_service_Recreation_potential)) { //only for terrestrial ecoregions
          lMap.removeLayer(Ecosystem_service_Recreation_potential);
          $("#menu-418-1").css('background-color', '#f2bf4c');//yellow
   } else {
         lMap.addLayer(Ecosystem_service_Recreation_potential);
         lMap.removeLayer(Ecosystem_service_Recreation_demand);
         lMap.removeLayer(Ecosystem_service_Recreation_use);
         $("#menu-418-1").css('background-color', '#2f4d69');//blue
         $("#menu-419-1").css('background-color', '#f2bf4c'); //yellow
         $("#menu-420-1").css('background-color', '#f2bf4c');//yellow
   }
 });


// Outdor Red=creation -  Eco Sev Denamnd
  $("#menu-419-1").click(function(event) {

    if (lMap.hasLayer(Ecosystem_service_Recreation_demand)) { //only for terrestrial ecoregions
           lMap.removeLayer(Ecosystem_service_Recreation_demand);
           $("#menu-419-1").css('background-color', '#f2bf4c');//yellow
    } else {
          lMap.addLayer(Ecosystem_service_Recreation_demand);
          lMap.removeLayer(Ecosystem_service_Recreation_potential);
          lMap.removeLayer(Ecosystem_service_Recreation_use);
          $("#menu-419-1").css('background-color', '#2f4d69');//blue
          $("#menu-418-1").css('background-color', '#f2bf4c');//yellow
          $("#menu-420-1").css('background-color', '#f2bf4c');//yellow
    }
  });

  // Outdor Red=creation -  Eco Sev Use
    $("#menu-420-1").click(function(event) {

      if (lMap.hasLayer(Ecosystem_service_Recreation_use)) { //only for terrestrial ecoregions
             lMap.removeLayer(Ecosystem_service_Recreation_use);
             $("#menu-420-1").css('background-color', '#f2bf4c');//yellow
      } else {
            lMap.addLayer(Ecosystem_service_Recreation_use);
            lMap.removeLayer(Ecosystem_service_Recreation_potential);
            lMap.removeLayer(Ecosystem_service_Recreation_demand);
            $("#menu-420-1").css('background-color', '#2f4d69');//blue
            $("#menu-419-1").css('background-color', '#f2bf4c');//yellow
            $("#menu-418-1").css('background-color', '#f2bf4c');//yellow
      }
    });
// ------------------------------------------------------------------------------------------------------end of the script------------------------------------------------------------------------
$("#menu-417-1").click(function(event) {
 if ($('#outdor_recreation_info').length){

      $('#outdor_recreation_info').show();
      $('#crop_pollination_info').hide();
      $('#soil_protection_info').hide();
      $('#filtration_info').hide();

}else{

  $('#crop_pollination_info').hide();
  $('#soil_protection_info').hide();
  $('#outdor_recreation_info').hide();
  $('#filtration_info').hide();
}
});



$("#menu-362-1").click(function(event) {
 if ($('#crop_pollination_info').length){

      $('#crop_pollination_info').show();
      $('#soil_protection_info').hide();
      $('#outdor_recreation_info').hide();
      $('#filtration_info').hide();

}else{

      $('#crop_pollination_info').hide();
      $('#soil_protection_info').hide();
      $('#outdor_recreation_info').hide();
      $('#filtration_info').hide();
}
});

$("#menu-363-1").click(function(event) {
 if ($('#soil_protection_info').length){

      $('#soil_protection_info').show();
      $('#outdor_recreation_info').hide();
      $('#filtration_info').hide();
        $('#crop_pollination_info').hide();

}else{
  $('#crop_pollination_info').hide();
  $('#soil_protection_info').hide();
  $('#outdor_recreation_info').hide();
  $('#filtration_info').hide();
}
});

$("#menu-364-1").click(function(event) {
 if ($('#filtration_info').length){

      $('#filtration_info').show();
      $('#crop_pollination_info').hide();
      $('#soil_protection_info').hide();
      $('#outdor_recreation_info').hide();

}else{
  $('#crop_pollination_info').hide();
  $('#soil_protection_info').hide();
  $('#outdor_recreation_info').hide();
  $('#filtration_info').hide();
}
});


$( "#menu-418-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-419-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-420-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-421-1" ).prepend( '<i class="fa fa-table" aria-hidden="true"></i>' );
$( "#menu-422-1" ).prepend( '<i class="fa fa-signal" aria-hidden="true"></i>' );

$( "#menu-428-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-425-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-429-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-436-1" ).prepend( '<i class="fa fa-table" aria-hidden="true"></i>' );
$( "#menu-439-1" ).prepend( '<i class="fa fa-signal" aria-hidden="true"></i>' );

$( "#menu-432-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-426-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-430-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-434-1" ).prepend( '<i class="fa fa-table" aria-hidden="true"></i>' );
$( "#menu-438-1" ).prepend( '<i class="fa fa-signal" aria-hidden="true"></i>' );

$( "#menu-433-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-427-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-431-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-435-1" ).prepend( '<i class="fa fa-table" aria-hidden="true"></i>' );
$( "#menu-437-1" ).prepend( '<i class="fa fa-signal" aria-hidden="true"></i>' );




// avoid load url div

$('.sf-menu a').click(function(e){
e.preventDefault()
})
















})

})(jQuery);
