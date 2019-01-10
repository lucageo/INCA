(function($) {
 $(document).bind('leaflet.map', function(e, map, lMap)
   {




// MAIN MENU SWITCHERS
//------------------------------------------------------------------------------------------------------------------

// CULTURAL MENU
 $("#cultural_menu").click(function(event) {

  lMap.eachLayer(function (layer) {if (typeof layer.is_base =='undefined'){lMap.removeLayer(layer);}});
  $(".sf-no-children").css('background-color', '#f2bf4c');//yellow
  $('#block-views-geo-view-test-block-1').show();
  $('#block-block-5').hide();
  $('#accountingTables_outdoorRecreation').hide();
  $('#outdoor_recreation_trends').hide();
  $('.pane-superfish-2').hide();
  $('.pane-superfish-3').hide();
  $('.pane-superfish-1').toggle();

  if ($('#shoecoservices').css('color')==="rgb(3, 45, 59)") {
       $("#shoecoservices").css('color', '#eeaa10');
       $(".fa-users").css('color', '#eeaa10');
       $("#shoecoservices_rm").css('color', 'rgb(3, 45, 59)');
       $(".fa-cogs").css('color', 'rgb(3, 45, 59)');
       $("#shoecoservices_p").css('color', 'rgb(3, 45, 59)');
       $(".fa-pagelines").css('color', 'rgb(3, 45, 59)');
  }else{
       $("#shoecoservices").css('color', 'rgb(3, 45, 59)');
       $(".fa-users").css('color', 'rgb(3, 45, 59)');
  }

 });

// REGULATING AND MAINTENANCE MENU
 $("#r_m_menu").click(function(event) {

  lMap.eachLayer(function (layer) {if (typeof layer.is_base =='undefined'){lMap.removeLayer(layer);}});
  $(".sf-no-children").css('background-color', '#f2bf4c');//yellow
  $('#block-views-geo-view-test-block-1').show();
  $('#block-block-5').hide();
  $('#accountingTables_outdoorRecreation').hide();
  $('#outdoor_recreation_trends').hide();
  $('.pane-superfish-2').show();
  $('.pane-superfish-1').hide();
  $('.pane-superfish-3').hide();

  if ($('#shoecoservices_rm').css('color')==="rgb(3, 45, 59)") {
        $("#shoecoservices_rm").css('color', '#eeaa10');
        $(".fa-cogs").css('color', '#eeaa10');
        $("#shoecoservices").css('color', 'rgb(3, 45, 59)');
        $(".fa-users").css('color', 'rgb(3, 45, 59)');
        $("#shoecoservices_p").css('color', 'rgb(3, 45, 59)');
        $(".fa-pagelines").css('color', 'rgb(3, 45, 59)');
  }else{
        $("#shoecoservices_rm").css('color', 'rgb(3, 45, 59)');
        $(".fa-cogs").css('color', 'rgb(3, 45, 59)');
  }

 });

// PROVISIONING MENU
 $("#provisioning_menu").click(function(event) {

  lMap.eachLayer(function (layer) {if (typeof layer.is_base =='undefined'){lMap.removeLayer(layer);}});
  $(".sf-no-children").css('background-color', '#f2bf4c');//yellow
  $('#block-views-geo-view-test-block-1').show();
  $('#block-block-5').hide();
  $('#accountingTables_outdoorRecreation').hide();
  $('#outdoor_recreation_trends').hide();
  $('.pane-superfish-3').show();
  $('.pane-superfish-1').hide();
  $('.pane-superfish-2').hide();

  if ($('#shoecoservices_p').css('color')==="rgb(3, 45, 59)") {
        $("#shoecoservices_p").css('color', '#eeaa10');
        $(".fa-pagelines").css('color', '#eeaa10');
        $("#shoecoservices").css('color', 'rgb(3, 45, 59)');
        $(".fa-users").css('color', 'rgb(3, 45, 59)');
        $("#shoecoservices_rm").css('color', 'rgb(3, 45, 59)');
        $(".fa-cogs").css('color', 'rgb(3, 45, 59)');
  }else{
        $("#shoecoservices_p").css('color', 'rgb(3, 45, 59)');
        $(".fa-pagelines").css('color', 'rgb(3, 45, 59)');
  }
 });




// AVOID DIV IN FOR SUBMENUS
$('.sf-menu a').click(function(e){
e.preventDefault()
})



//------------------------------------------------------------------------------ END OF SCRIPT --------------------------------------------------------------------------

  })
})(jQuery);
