function getDistanceInMetersFromCoordinates(lat1, lng1, lat2, lng2) {
    // https://secure.wikimedia.org/wikipedia/en/wiki/Haversine_formula
    var deltaLat = (lat2-lat1)*Math.PI/180;
    var deltaLng = (lng2-lng1)*Math.PI/180;
    var a = Math.sin(deltaLat/2)*Math.sin(deltaLat/2)+Math.sin(deltaLng/2)*Math.sin(deltaLng/2)*Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180);
    var b = 2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return Math.floor(6371000*b);
}
