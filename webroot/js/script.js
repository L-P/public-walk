window.HD = {};

$(function main() {
		// Default position
		var userPos = new google.maps.LatLng(
			48.85790014566900000,
			2.34716868082870000
		);

		// Display main map
		var mainMapOptions = {
				zoom: 14,
				center: userPos,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mainMap = new google.maps.Map(document.getElementById("map_canvas"), mainMapOptions);

		// Add a new marker on the map
		function addCamera(lat, lng, name) {
			var marker = new google.maps.Marker({
				position:new google.maps.LatLng(lat, lng),
				map: mainMap, 
				title:name,
			}); 
			marker.setIcon("data:image/png;base64,");
			var circle = new google.maps.Circle({
				map: mainMap,
				radius: 50,
				fillColor: '#AA0000'
			});
			circle.bindTo('center', marker, 'position');
			return marker;
		}

		HD.geo.initGeoloc(mainMap);
		userPos = mainMap.getCenter();
		mainMap.setZoom(16);
		var userMarker = new google.maps.Marker({
			position:userPos,
			map: mainMap,
			title:"Your position"
		});

		// Get the cameras around us, and display them on the map
		$.ajax({
			url : 'get_cctv.php',
			data : {
				lat:userPos.lat(),
				lng:userPos.lng()
			},
			success: function(data) {
				// Add each cam on the map
				_.each(data, function eachCamera(camera) {
					addCamera(camera.lat, camera.lng, camera.name)
				});
			}
		});
});
