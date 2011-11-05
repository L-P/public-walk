$(function main() {
		// Default position
		var userPos = {
			lat: 48.85790014566900000,
			lng: 2.34716868082870000
		}

		// Display main map
		var mainMapOptions = {
				zoom: 18,
				center: new google.maps.LatLng(userPos.lat, userPos.lng),
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mainMap = new google.maps.Map(document.getElementById("map_canvas"), mainMapOptions);
		console.log(google.maps);

		// Add a new marker on the map
		function addCamera(lat, lng, name) {
			return new google.maps.Marker({
				position:new google.maps.LatLng(lat, lng),
				map: mainMap, 
				title:name
			}); 
			var circle = new google.maps.Circle({
				map: mainMap,
				radius: 50,
				fillColor: '#AA0000'
				});
			circle.bindTo('center', marker, 'position');
			return marker;
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

		// Get the cameras around us, and display them on the map
		$.ajax({
			url : 'get_cctv.php',
			data : {
				lat: userPos.lat,
				lng: userPos.lng,
				radius: 0.001
			},
			success: function(data) {
				// Add each cam on the map
				_.each(data, function eachCamera(camera) {
					addCamera(camera.lat, camera.lng, camera.name)
				});
			}
		});
});
