/**
 * This Model represent a map displayed on screen. In our App, we will ever only have one Map displayed at once.
 **/
HD.Map = Backbone.Model.extend({
	defaults: {
		zoom: 14,
		center: null,	// A GMaps LatLng object
		cameras: {}		// The list of cameras added to the map
	},

	initialize: function initialize(options) {
		// A center is needed
		if (!this.has('center')) return log("You must pass a center to the Map");
		// Create the associated view
		this.view = new HD.MapView({ model : this});

		// Event binding
		App.bind('cameraListReceived', this.cameraListReceived, this);
	},

	// Display cameras around the user
	displayCamerasAroundUser: function displayCamerasAroundUser(user) {
		$.ajax({
			url : 'get_cctv.php',
			data : {
				lat: user.get('lat'),
				lng: user.get('lng'),
				radius: user.get('perceptionRadius')
			},
			success: function displayCamerasAroundUserAjaxSuccess(data) {
				App.trigger('cameraListReceived', data);
			}
		});
	},

	// Callback once we got the list of cameras around the user
	cameraListReceived: function cameraListReceived(data) {
		var cameras = this.get('cameras');
		_.each(data, function eachCamera(data) {
			// Already saved
			if (data.name in cameras) return;
			// Adding the camera
			cameras[data.name] = new HD.Camera(data);
		}, this);
	},

	// Return the GMap map
	getGMap: function getGMap() {
		return this.view.getGMap();
	}
})


HD.MapView = Backbone.View.extend({
	el : "#canvas",
	initialize: function initialize(options) {
		// Display the google map using the API. We keep an internal reference to the GMaps object
		this.googleMap = new google.maps.Map(this.el, {
			zoom: this.model.get('zoom'),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: this.model.get('center')
		})
	},

	// Return the GMaps map
	getGMap: function getGMap() {
		return this.googleMap;
	}

})

