// need underscore.js

function getRouteCoordinates(fromLat, fromLng, toLat, toLng) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
    destination:new LatLng(toLat, toLng),
    origin:new LatLng(fromLat, fromLng),
    travelMode:google.maps.DirectionsTravelMode.WALKING};
    var yeeeaaaah = new array();
    directionsService.route(directionsRequest, function(result, status) {
        _.each(result.routes[0].legs[0].steps, function(step) {
            _.each(step.path, function(path) {
                yeeeaaaah.push(path);
            });
        });
    });
    return yeeeaaah;
}
