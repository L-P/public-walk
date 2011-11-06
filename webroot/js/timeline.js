HD.Timeline = Backbone.Model.extend({
	defaults: {
	},
	initialize: function initialize(options) {
		this.reset();
		App.bind('updateStack', this.update, this);
	},


	reset : function reset() {
		this.lastTime = new Date().getTime();

		this.cameras			= [];	// hey
		this.totalTime			= 0;	// this
		this.publicTime			= 0;	// looks
		this.privateTime		= 0;	// really
		this.totalDistance		= 0;	// amazing
		this.publicDistance		= 0;	// and wasn't
		this.privateDistance	= 0;	// done on purpose
	},

	update: function update(data) {
		function getDistance(cam) {
			var radius = 0.001;
			var pos = cam.getLatLng();
			var x = Math.abs(pos.lat() - data.lat);
			var y = Math.abs(pos.lng() - data.lng);

			if(x >= radius || y >= radius)
				return null;

			return getDistanceInMetersFromCoordinates(pos.lat(), pos.lng(), data.lat, data.lng);
		}


		var time = new Date().getTime();
		var diff = time - this.lastTime;
		this.totalTime += diff;
		this.lastTime = time;

		var cameras = App.map.get('cameras');
		var atLeastOneCam = false;

		_.each(cameras, function(v, k) {
			var distance = getDistance(v);
			if(distance && (distance <= 50)) {
				this.cameras.push(v.id);
				this.publicTime += diff;
				this.publicDistance += App.user.get('distance');
				atLeastOneCam = true;
			}
		}, this);

		if(!atLeastOneCam) {
			this.privateTime += diff;
			this.privateDistance += App.user.get('distance');
		}

		App.user.set({distance: 0});
	},


	getTime: function getTime() {
		 return this.totalTime / 1000;
	},
	

	getDistance : function getDistance() {
		return this.totalDistance;
	},

	getCamCount: function getCamCount() {
		this.cameras = _.uniq(this.cameras);
		return this.cameras.length;
	},

	getPrivateTime: function getPrivateTime() {
		return this.privateTime / 1000;
	},

	getPrivateDistance: function getPrivateDistance() {
		return this.privateDistance / 1000;
	},

	getPublicTime: function getPublicTime() {
		return this.publicTime / 1000;
	},

	getPublicDistance: function getPublicDistance() {
	   return this.privateDistance;
	}

});
