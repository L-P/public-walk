HD.geo = (function() {
	function initGeoloc(map, pos) { // Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				map.setCenter(pos);
			}, function() {
				handleNoGeolocation(true, map);
			});
		} else if (google.gears) { // Try Google Gears Geolocation
			var geo = google.gears.factory.create('beta.geolocation');
			geo.getCurrentPosition(function(position) {
				pos = new google.maps.LatLng(position.latitude,position.longitude);
				map.setCenter(pos);
			}, function() {
				handleNoGeoLocation(true, map);
			});
		} else { // Browser doesn't support Geolocation
			handleNoGeolocation(false, map);
		}

		return pos;
	}


	function handleNoGeolocation(errorFlag, map) {
		var content = '';
		if (errorFlag) {
			content = 'Error: The Geolocation service failed.';
		} else {
			content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
			map: map,
			position: map.getCenter(),
			content: content
		};

		var infowindow = new google.maps.InfoWindow(options);
	}

	return {
		'initGeoloc': initGeoloc
	};
})();

