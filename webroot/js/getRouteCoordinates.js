// need underscore.js

function getRouteCoordinates(from, to) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
    destination:to,
    origin:from,
    travelMode:google.maps.DirectionsTravelMode.WALKING};
    var out = [];
    directionsService.route(directionsRequest, function(result, status) {
        _.each(result.routes[0].legs[0].steps, function(step) {
            _.each(step.path, function(path) {
                out.push(path);
            });
        });
    });
    return out;
}
