/**
 * The User model represents the current player. We will have only one at a given time displayed on the map.
 * Its instance is available through App.user to any other model
 **/
HD.User = Backbone.Model.extend({
	defaults: {
		lat: 48.85,
		lng: 2.34,
		perceptionRadius: 0.005
	},
	initialize: function initialize() {
			
	},

	// Move the user to a new point.
	moveTo: function moveTo(lat, lng) {
	},

	// Return the LatLng object of the user
	getLatLng: function getLatLng() {
		if ('LatLng' in this) return this.LatLng
		return this.LatLng = new google.maps.LatLng(this.get('lat'), this.get('lng'))
	}
})

HD.UserView = Backbone.View.extend({
	initialize: function initialize() {
	}
})

