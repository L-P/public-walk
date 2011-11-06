/**
 * This model will only have one instance, and will be used to retrieve the Geoloc coords of the user
 **/
HD.Geoloc = Backbone.Model.extend({
	defaults: {
	},
	initialize: function initialize(options) {
		// Init geoloc based on what is available
		if (navigator.geolocation) this.initHTML5();
		else this.handleNoGeolocation();
	},

	// Start HTML5 geoloc
	initHTML5: function initHTML5() {
		// Testing geolocation activated
		navigator.geolocation.watchPosition(function(position) {
				log("Position watched");
				// Mark geoloc as enabled if it wasn't the case
				if (App.get('geoloc')==false) {
					App.set({geoloc:true});
					App.startMap();
				}
				App.trigger('geolocReceived', {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			}, this.handleNoGeolocation, {enableHighAccuracy: true});
	},

	// Called when Geoloc is not possible
	handleNoGeolocation: function handleNoGeolocation() {
		log("No geoloc");
		App.set({geoloc:false});
	}
});

