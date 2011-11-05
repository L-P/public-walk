/**
 * This model will only have one instance, and will be used to retrieve the Geoloc coords of the user
 **/
HD.Geoloc = Backbone.Model.extend({
	defaults: {
		enable:false
	},
	initialize: function initialize(options) {
		// Init geoloc based on what is available
		if (navigator.geolocation) this.initHTML5();
		else if (google.gears) this.initGoogleGears();
		else this.handleNoGeolocation();

		setInterval(function() {
			App.trigger('updateStack', {
				lat: App.user.get('lat'),
				lng: App.user.get('lng'),
			});
		}, 5000);
	},

	// Start HTML5 geoloc
	initHTML5: function initHTML5() {
		navigator.geolocation.getCurrentPosition(function geolocHTMLOk(position) {
			App.trigger('geolocReceived', {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			});
			navigator.geolocation.watchPosition(function watchPosition(position) {
				log('Watch');
				App.trigger('geolocReceived', {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			});
		}, this.handleNoGeolocation)
	},

	// Start Google gears geoloc
	initGoogleGears: function initGoogleGears() {
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(function geolocGoogleGearsOk(position) {
			App.trigger('geolocReceived', {
				lat: position.latitude,
				lng: position.longitude
			})
		}, this.handleNoGeolocation)
	},

	// Called when Geoloc is not possible
	handleNoGeolocation: function handleNoGeolocation() {
		alert('No Geolocation');
	}
});

