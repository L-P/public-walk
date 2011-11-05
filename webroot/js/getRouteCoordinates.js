//need underscore-min.js

var directionsService = new google.maps.DirectionsService();

var directionsRequest = {destination:"48.92940908174700000,2.15374071253510000",origin:"48.89830111115800000,2.35248649422120000",travelMode:google.maps.DirectionsTravelMode.WALKING};

directionsService.route(directionsRequest, function(result, status) {
    _.each(result.routes[0].legs[0].steps, function(step) {
        _.each(step.path, function(path) {
            //Dump all coordinates to console.log
            console.log(path.toString());
        });
    });
});
