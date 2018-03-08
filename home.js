
// HIDE MAP ON PAGE LOAD

setTimeout(function(){
 $('#block-views-geo-view-test-block-1').hide();

}, 100);

// BASE MAPS

var esri = L.tileLayer('https://api.mapbox.com/styles/v1/wri/cism5nsz4007t2wnrp5xslf7s/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3JpIiwiYSI6Ik9TY2w5RTQifQ.0HV7dQTjK40mk7GpNNA64g',{attribution: '', opacity: 1});
var streets  = L.tileLayer('https://api.mapbox.com/styles/v1/lucageo/cje5rf4tufoxu2rmxqygm1jlx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVjYWdlbyIsImEiOiJjaXIwY2FmNHAwMDZ1aTVubmhuMDYyMmtjIn0.1jWhLwVzKS6k1Ldn-bVQPg');
var topLayer = L.tileLayer('https://api.mapbox.com/styles/v1/lucageo/cje777ixoc3sm2roehmzdye1e/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVjYWdlbyIsImEiOiJjaXIwY2FmNHAwMDZ1aTVubmhuMDYyMmtjIn0.1jWhLwVzKS6k1Ldn-bVQPg');


// OUTDOOR RECAREATION LAYERS

// Outdor Recreation -  Eco Sev Potential
var outdoor_recreation_potential_url = 'https://xxx.ec.europa.eu/geoserver/inca/wms';
var outdoor_recreation_potential=L.tileLayer.wms(outdoor_recreation_potential_url, {
  layers: 'inca:outdoor_recreation_potential',
  transparent: true,
  format: 'image/png',
  opacity:'1',
  zIndex: 33
});

// Outdor Recreation -  Eco Sev Denamnd
var outdoor_recreation_demand_url = 'https://xxx.ec.europa.eu/geoserver/inca/wms';
var outdoor_recreation_demand=L.tileLayer.wms(outdoor_recreation_demand_url, {
   layers: 'inca:outdoor_recreation_demand',
   transparent: true,
   format: 'image/png',
   opacity:'1',
   zIndex: 33
});

// Outdor Recreation -  Eco Sev Use
var outdoor_recreation_use_url = 'https://xxx.ec.europa.eu/geoserver/inca/wms';
var outdoor_recreation_use=L.tileLayer.wms(outdoor_recreation_use_url, {
   layers: 'inca:outdoor_recreation_use',
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

streets.addTo(lMap);
streets.is_base=true;

esri.addTo(lMap);
esri.is_base=true;

topLayer.addTo(lMap);
topLayer.is_base=true;

var topPane = lMap._createPane('leaflet-top-pane', lMap.getPanes().mapPane);
topPane.appendChild(topLayer.getContainer());
topLayer.setZIndex(2);

var baseMaps = {
    "Light": streets,
    "streets" :streets
};
var overlayMaps = {
     'outdoor_recreation_demand':outdoor_recreation_demand,
     'outdoor_recreation_potential':outdoor_recreation_potential,
     'outdoor_recreation_use':outdoor_recreation_use,
};


// INITIAL ZOOM

lMap.setView([50, 20], 4);

// Outdor Recreation - GET FEATUREINFO FUNCTION

  function getFeatureInfoUrl_e(map, layer, latlng, params) {

 if (layer.wmsParams.layers=="inca:outdoor_recreation_potential" || layer.wmsParams.layers=="inca:outdoor_recreation_demand" || layer.wmsParams.layers=="inca:outdoor_recreation_use")
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

var Ecosystem_service_hi_url_ = 'https://xxx.ec.europa.eu/geoserver/inca/wms';
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

 var popup_c_es_r_p = '<center><p><b>Municipality </b>'+lau_code2+'</p></center><hr><center><p><b><i class="fa fa-cogs"></i> Potential </b>'+shar_12+'</p></center>';
 var popup_es_r_p = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_r_p)
      .openOn(lMap);
}
// ONCLICK RESPONSE ON HIGLIGHTED Outdor Recreation -  Eco Sev Demand

function hi_highcharts_es_r_d(info,latlng){
 var lau_code2=info['lau_code2'];
 var pdens_12=info['pdens_12'];

 var popup_c_es_r_d = '<center><p><b>Municipality </b>'+lau_code2+'</p></center><hr><center><p><b><i class="fa fa-question-circle"></i> Demand </b>'+pdens_12+'</p></center>';
 var popup_es_r_d = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_r_d)
      .openOn(lMap);
}
// ONCLICK RESPONSE ON HIGLIGHTED Outdor Recreation -  Eco Sev Use

function hi_highcharts_es_r_u(info,latlng){
 var lau_code2=info['lau_code2'];
 var v_dens12=info['v_dens12'];

 var popup_c_es_r_u = '<center><p><b>Municipality </b>'+lau_code2+'</p></center><hr><center><p><b><i class="fa fa-users"></i> Use </b>'+v_dens12+'</p></center>';
 var popup_es_r_u = L.popup()
      .setLatLng([latlng.lat, latlng.lng])
      .setContent(popup_c_es_r_u)
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
   }else{
  }
});


// LAYERS FILTERS

outdoor_recreation_potential.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});

outdoor_recreation_demand.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});

outdoor_recreation_use.setParams({CQL_FILTER:"lau_code2 LIKE '%%'"});



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
// ------------------------------------------------------------------------------------------------------end of the map stuff------------------------------------------------------------------------

// add icons to submenu
$( "#menu-418-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-419-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-420-1" ).prepend( '<i class="fa fa-map" aria-hidden="true"></i>' );
$( "#menu-421-1" ).prepend( '<i class="fa fa-table" aria-hidden="true"></i>' );
$( "#menu-422-1" ).prepend( '<i class="fa fa-signal" aria-hidden="true"></i>' );

// Trends Graph menu
$("#menu-422-1").click(function(event) {
  $('#outdoor_recreation_trends').toggle();
  $("#block-block-4").show();
  $('#accountingTables_outdoorRecreation').fadeOut('slow');
});

// Accounting tab  menu
$("#menu-421-1").click(function(event) {
  $('#accountingTables_outdoorRecreation').toggle();
  $('#outdoor_recreation_trends').fadeOut('slow');
});
$("#menu-421-1_x").click(function(event) {
 $('#accountingTables_outdoorRecreation').fadeOut('slow');
});

// Click on the map remoove trends and accounting tab
lMap.on('click',function(e){
  $('#outdoor_recreation_trends').fadeOut('slow');
  $( "#accountingTables_outdoorRecreation" ).fadeOut('slow');
})


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
         $("#outdoor_rec_dem_leg").hide();
         $("#outdoor_rec_use_leg").hide();
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
          $("#outdoor_rec_pot_leg").hide();
          $("#outdoor_rec_dem_leg").show();
          $("#outdoor_rec_use_leg").hide();
    }
  });

  // Outdor Recreation -  Eco Sev Use menu
    $("#menu-420-1").click(function(event) {

      if (lMap.hasLayer(outdoor_recreation_use)) { //only for terrestrial ecoregions
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
            $("#outdoor_rec_pot_leg").hide();
            $("#outdoor_rec_dem_leg").hide();
            $("#outdoor_rec_use_leg").show();
      }
    });

// outdoor_recreation_national_data - POTENTIAL
setTimeout(function(){
    var current_url = window.location.host
    var url = 'http://'+current_url+'/outdoor_recreation_national_data/outdoor_recreation_national_data.jsonp';
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
           title: {text: 'Recreation Potential 2012'},
           subtitle: {
                text: 'Share of areas for daily recreation'
           },
           credits: {
               enabled: true,
               text: '',
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
            color: '#eeaa10',
            data: arr_data,
            point: {
                events: {
                    click: function() {
                      outdoor_recreation_potential.setParams({CQL_FILTER:"lau_code2 LIKE '%"+this.category+"%'"});
                        //var bounds = outdoor_recreation_potential._map.bounds;
                        //var bbox = bounds.toBBoxString();
                        //console.log(bounds);
                        //lMap.fitBounds(bounds);
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
    var url = 'http://'+current_url+'/outdoor_recreation_national_data/outdoor_recreation_national_data.jsonp';

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
           title: {text: 'Recreation Demand 2012'},
           subtitle: {
                text: 'Population density (people per sq. km of land area)'
           },
           credits: {
               enabled: true,
               text: '',
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
            color: '#3391bc',
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
    var url = 'http://'+current_url+'/outdoor_recreation_national_data/outdoor_recreation_national_data.jsonp';

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
           title: {text: 'Recreation Use 2012'},
           subtitle: {
                text: 'Total Number of potential visits per year'
           },
           credits: {
               enabled: true,
               text: '',
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
            color: '#2f4f6c',
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


// outdoor_recreation_trends
setTimeout(function(){
    var current_url = window.location.host
    var url = 'http://'+current_url+'/outdoor_recreation_trends/outdoor_recreation_trends.jsonp';

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
                text: '<p>Changes in the actual flow of outdoor recreation between 2000 and 2012 (in %)</p>'
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
  }
 });
}, 200);

// ------------------------------------------------------------- END OF SCRIPT ------------------------------------------------------------------------------
})

})(jQuery);
