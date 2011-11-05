window.HD = {};

$(function main() {
		// Default position
		HD.pos = new google.maps.LatLng(
			48.85,
			2.34
		);

		// Display main map
		var mainMapOptions = {
				zoom: 14,
				center: HD.pos,
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
		mainMap.setZoom(16);
		var userMarker = new google.maps.Marker({
			position:HD.pos,
			map: mainMap,
			title:"Your position"
		});

		// Get the cameras around us, and display them on the map
		$.ajax({
			url : 'get_cctv.php',
			data : {
				lat:HD.pos.lat(),
				lng:HD.pos.lng()
			},
			success: function(data) {
				// Add each cam on the map
				_.each(data, function eachCamera(camera) {
					addCamera(camera.lat, camera.lng, camera.name)
				});
			}
		});
});
