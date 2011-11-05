// We pollute the global scope with this single var, that will hold all our Model and View constructors
window.HD = {}
// easiest log
window.log = (function() {
	return console.log || function() { }
})()

// Now, we will call the main script, to be loaded once the page is fully loaded
$(function main() {
		// Instanciate our Models
		var App = window.App = new HD.App();
		var user = App.user = new HD.User();
		var map = App.map = new HD.Map({
			center: user.getLatLng()
		});

		// Display cameras on the map
		map.displayCamerasAroundUser(user);
});


/*
window.HD = {};

$(function main() {
		// Default position
		window.HD.pos = new google.maps.LatLng(
			48.85,
			2.34
		);

		// Display main map
		var mainMapOptions = {
				zoom: 14,
				center: window.HD.pos,
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
			marker.seticon("data:image/png;base64,");
			var circle = new google.maps.Circle({
				map: mainMap,
				radius: 50,
				fillColor: '#AA0000'
			});
			circle.bindTo('center', marker, 'position');
			return marker;
		}

		HD.geo.initGeoloc(mainMap);
		mainMap.setCenter(HD.pos);
		mainMap.setZoom(16);
		var userMarker = new google.maps.Marker({
			position:window.HD.pos,
			map: mainMap,
			title:"Your position"
		});

		// Get the cameras around us, and display them on the map
		$.ajax({
			url : 'get_cctv.php',
			data : {
				lat:window.HD.pos.lat(),
				lng:window.HD.pos.lng()
			},
			success: function(data) {
				// Add each cam on the map
				_.each(data, function eachCamera(camera) {
					addCamera(camera.lat, camera.lng, camera.name)
				});
			}
		});
>>>>>>> 633d5c4500ae41c6a2b194375342837f2ae8adf4
});
*/
