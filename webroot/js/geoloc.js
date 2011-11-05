HD.geo = (function() {
	function initGeoloc(map) {
		// Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude);

				var infowindow = new google.maps.InfoWindow({
					map: map,
					position: pos,
					content: 'Location found using HTML5.'
				});

				map.setCenter(pos);
			}, function() {
				handleNoGeolocation(true, map);
			});
		} else {
			// Browser doesn't support Geolocation
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

