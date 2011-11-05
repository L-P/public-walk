HD.geo = (function() {
	function initGeoloc() {
		// Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude);

				var infowindow = new google.maps.InfoWindow({
					map: mainMap,
					position: pos,
					content: 'Location found using HTML5.'
				});

				mainMap.setCenter(pos);
			}, function() {
				handleNoGeolocation(true);
			});
		} else {
			// Browser doesn't support Geolocation
			handleNoGeolocation(false);
		}
	}


	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.';

			var options = {
				map: mainMap,
				position: userPos,
				content: content
			};

			var infowindow = new google.maps.InfoWindow(options);
			mainMap.setCenter(options.position);
		}
	}

	return {
		'initGeoloc': initGeoloc
	};
})();

