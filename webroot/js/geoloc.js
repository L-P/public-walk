HD.geo = (function() {
	function initGeoloc(map) { // Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				map.setCenter(pos);
			}, function() {
				handleNoGeolocation(true, map);
			});
		} else if (google.gears) { // Try Google Gears Geolocation
			var geo = google.gears.factory.create('beta.geolocation');
			geo.getCurrentPosition(function(position) {
				initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
				map.setCenter(initialLocation);
			}, function() {
				handleNoGeoLocation(true, map);
			});
		} else { // Browser doesn't support Geolocation
			handleNoGeolocation(false, map);
		}
	}


	function handleNoGeolocation(errorFlag, map) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.';

			var options = {
				map: map,
				position: userPos,
				content: content
			};

			var infowindow = new google.maps.InfoWindow(options);
			map.setCenter(options.position);
		}
	}

	return {
		'initGeoloc': initGeoloc
	};
})();

