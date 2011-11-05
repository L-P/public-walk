HD.geo = (function() {
	function initGeoloc(map) { // Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				map.setCenter(pos);
				HD.pos = pos;
			}, function() {
				handleNoGeolocation(true, map);
			});
		} else if (google.gears) { // Try Google Gears Geolocation
			var geo = google.gears.factory.create('beta.geolocation');
			geo.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.latitude,position.longitude);
				map.setCenter(pos);
				HD.pos = pos;
			}, function() {
				handleNoGeoLocation(true, map);
			});
		} else { // Browser doesn't support Geolocation
			handleNoGeolocation(false, map);
		}

		if(!HD.pos)
			HD.pos = map.getCenter();
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

