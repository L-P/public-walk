$(function main() {
		// Default position
		var userPos = {
			lat: 48.85790014566900000,
			lng: 2.34716868082870000
		}

		// Display main map
		var mainMapOptions = {
				zoom: 13,
				center: new google.maps.LatLng(userPos.lat, userPos.lng),
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mainMap = new google.maps.Map(document.getElementById("map_canvas"), mainMapOptions);

		// Add a new marker on the map
		function addCamera(lat, lng, name) {
			return new google.maps.Marker({
				position:new google.maps.LatLng(lat, lng),
				map: mainMap, 
				title:name
			}); 
		}


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

		initGeoloc();

		$.ajax({
			url : 'get_cctv.php',
			data : userPos,
			success: function(data) {
				console.log(data);
			}
		});
});
