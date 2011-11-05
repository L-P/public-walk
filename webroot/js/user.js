/**
 * The User model represents the current player. We will have only one at a given time displayed on the map.
 * Its instance is available through App.user to any other model
 **/
HD.User = Backbone.Model.extend({
	defaults: {
		lat: 48.85,
		lng: 2.34,
		isCoordsChanged: false,
		perceptionRadius: 0.005
	},
	initialize: function initialize() {
		// We init the geoloc service
		App.geoloc = new HD.Geoloc();

		// Asign a view, so it gets displayed when updated
		this.view = new HD.UserView({model:this});

		// We listen to the updated coords from geoloc
		App.bind('geolocReceived', this.geolocReceived, this);
	},

	// Move the user to a new point.
	moveTo: function moveTo(lat, lng) {
		// delete the old LatLng
		delete this.LatLng;
		this.set({lat:lat,lng:lng});
		// Ugly, but works
		this.view.render();

		// We also display the cameras around the user
		App.map.displayCamerasAroundUser(this);
	},

	// Return the LatLng object of the user
	getLatLng: function getLatLng() {
		if ('LatLng' in this) return this.LatLng
		if (!this.has('lat') || !this.has('lng')) return false;
		return this.LatLng = new google.maps.LatLng(this.get('lat'), this.get('lng'))
	},

	// Fired when we got coords from geoloc
	geolocReceived: function geolocReceived(data) {
		log("Geoloc data received :", data);
		this.moveTo(data.lat, data.lng);
	}
})

HD.UserView = Backbone.View.extend({
	initialize: function initialize(options) {
		
	},

	// Fired whenever user coords changed
	render: function render() {
		log("Render user on map");
		var LatLng = this.model.getLatLng();
		// No coords, no display
		if (!LatLng) return;

		App.map.getGMap().setCenter(LatLng);

		// Set a marker the first time
		if (!this.marker) {
			this.marker = new google.maps.Marker({
				position: LatLng,
				map: App.map.getGMap(),
				title: this.model.get('name')
			});
			return;
		} else {
			this.marker.setPosition(LatLng);
		}
	}
})

