/**
 * This is the main App, a Model that will be accessible through the global scope, and that has references to all the important models.
 * It will also be used a center point to publish and subscribe to events
 **/
HD.App = Backbone.Model.extend({
	defaults: {
		geoloc:false
	},

	initialize: function initialize() {
		// We start the geoloc detection. It will update the geoloc attribute once we know if its enabled
		new HD.Geoloc();
		// We set a view to display the whole app
		this.view = new HD.AppView({model:this})

		// We simulate a journey when we got a direction list
		this.bind('directionsReceived', this.directionsReceived, this);

	},

	// This method starts the whole map display logic
	startMap: function start(center) {
		if (!center) center = new google.maps.LatLng(48.85, 2.34);

		// Creating the user
		App.user = new HD.User();
		// Creating the map
		App.map = new HD.Map({
			center: center
		});
		// Creating the timeline
		App.timeline = new HD.Timeline();
		infoFetchingLoop();
	},

	// Triggered when the directions path is calculated
	directionsReceived: function directionReceived(directions) {
		// We start the map
		this.startMap(new google.maps.LatLng(directions[0].lat, directions[0].lng));
		// We simulate a user moving on the map
		this.set({ 'geoloc' : true });

		// We delay the movement simulation to keep some room for the map to load
		_.delay(function() {
			App.directions = directions;
			App.directionInterval = setInterval(function() {
				var path = App.directions.shift();
				// Stop interval when at destination
				if (!path) return clearInterval(App.directionInterval);
				App.trigger('geolocReceived', path)
			}, 2000);
		}, 5000)

	}
})



HD.AppView = Backbone.View.extend({
	el: 'body',
	initialize: function initialize() {
		// We display a different home page if geoloc is enabled or not
		this.model.bind('change:geoloc', this.geolocChanged, this)
	},

	// Fired when we know if geoloc is enabled or not
	geolocChanged: function geolocChanged(model, geoloc) {
		// Nothing to do if geoloc disabled
		if (!geoloc) return;
		$(this.el).removeClass('initializing');
		// Autostart system if geoloc enabled
		this.model.startMap();
	}
})
