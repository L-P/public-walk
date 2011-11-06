/**
 * The User model represents the current player. We will have only one at a given time displayed on the map.
 * Its instance is available through App.user to any other model
 **/
HD.User = Backbone.Model.extend({
	defaults: {
		lat: null,
		lng: null,
		perceptionRadius: 0.005,
		lastLat: null,
		lastLng: null,
		distance: 0
	},
	initialize: function initialize() {
		log("new user");
		// Asign a view, so it gets displayed when updated
		this.view = new HD.UserView({model:this});

		// We listen to the updated coords from geoloc
		App.bind('geolocReceived', this.geolocReceived, this);
	},
	
	// Fired when we got coords from geoloc
	geolocReceived: function geolocReceived(data) {
		this.moveTo(data.lat, data.lng);
	},

	// Move the user to a new point.
	moveTo: function moveTo(lat, lng) {
		// Special cases if we are placing the first point on map
		var isFirstPlacement = !this.has('lat');

		// First placement means last coords are same as current coords
		if (isFirstPlacement) this.set({ lastLat: lat, lastLng: lng});
		// else, we save the previous coords
		else this.set({ lastLat: this.get('lat'), lastLng: this.get('lng')})

		// delete the old LatLng object because coords are changing
		delete this.LatLng;
		// We update the coords
		this.set({lat:lat,lng:lng});

		// We get the distance from the last coords
		this.set({distance: getDistanceInMetersFromCoordinates(
			this.get('lat'),
			this.get('lng'),
			this.get('lastLat'),
			this.get('lastLng')
		)});

		// We force the rendering of the user on its new coords
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

})

HD.UserView = Backbone.View.extend({
	initialize: function initialize(options) {
		
	},

	// Fired whenever user coords changed
	render: function render() {
		var LatLng = this.model.getLatLng();
		// No coords, no display
		if (!LatLng) return;

		// Center map on the user
		App.map.getGMap().setCenter(LatLng);

		// Set a marker the first time
		if (!this.marker) {
			this.marker = new google.maps.Marker({
				position: LatLng,
				map: App.map.getGMap(),
				title: 'You'
			});
			return;
		} else {
			this.marker.setPosition(LatLng);
		}
	}
})

