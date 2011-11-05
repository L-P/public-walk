$(function main() {
		var latlng = new google.maps.LatLng(48.85790014566900000, 2.34716868082870000);
		var myOptions = {
				zoom: 13,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		var marker = new google.maps.Marker({
			position:new google.maps.LatLng(48.85790014566900000, 2.34716868082870000),
			map: map, 
			title:"Hello World!"
		}); 
});
