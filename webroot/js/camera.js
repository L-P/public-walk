/**
 * This Model defines a Camera, that will be placed on the Map
 **/
HD.Camera = Backbone.Model.extend({
	defaults: {
		lat: null,
		lng: null,
		name: "CCTV",
		id: null,
		spyingRadius: 50,
		radiusColor: '#AA0000'
	},
	initialize: function initialize(options) {
		// Need lat/lng
		if (!this.has('lat') || !this.has('lng')) return log("You must pass the Lat/Lng coords of the camera");

		new HD.CameraView({ model:this});
	},

	// Return a GMaps LatLng object
	getLatLng: function getLatLng() {
		if ('LatLng' in this) return this.LatLng;
		return this.LatLng = new google.maps.LatLng(this.get('lat'), this.get('lng'));
	}
})

HD.CameraView = Backbone.View.extend({
	initialize: function() {
		// Adding the marker on map, and keeping a reference to it
		this.marker = new google.maps.Marker({
			position: this.model.getLatLng(),
			map: App.map.getGMap(), 
			title: this.model.get('name')
		});
		// Removing the default icon
		this.marker.setIcon("data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw%3D%3D");
		// And add the radius
		this.displayRadius();
	},

	// Display a radius around the marker
	displayRadius: function displayRadius() {
		if ('radius' in this) return;
		this.radius = new google.maps.Circle({
				map: App.map.getGMap(),
				radius: this.model.get('spyingRadius'),
				fillColor: this.model.get('radiusColor')
		}).bindTo('center', this.marker, 'position');
	}

})
