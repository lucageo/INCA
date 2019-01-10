// ---------------------------------------------------------------
// OPENSTREETMAP SEARCH
// ---------------------------------------------------------------

(function($) {
 $(document).bind('leaflet.map', function(e, map, lMap)
   {

   var searchlocation = L.control.search({
   url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
   jsonpParam: 'json_callback',
   propertyName: 'display_name',
   propertyLoc: ['lat','lon'],
   markerLocation: false,
   autoType: true,
   textPlaceholder: 'Location...                ',
   zoom:12,
   minLength: 2,
   position:'topleft'
 }).addTo(lMap);

})

})(jQuery);
