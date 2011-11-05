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

		$.ajax({
			url : 'get_cctv.php',
			data : userPos,
			success: function(data) {
				console.log(data);
			}
		});
});
