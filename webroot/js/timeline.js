HD.Timeline = Backbone.Model.extend({
	defaults: {
	},
	initialize: function initialize(options) {
		this.reset();
		// Update the counters ever 2s
		setInterval(_.bind(this.update, this), 2000);
		this.lastLat = null;
		this.lastLng = null;
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

	update: function update() {
		function getDistance(cam) {
			var radius = 0.001;
			var pos = cam.getLatLng();
			var upos = App.user.getLatLng();

			var x = Math.abs(pos.lat() - upos.lat());
			var y = Math.abs(pos.lng() - upos.lng());

			if(x >= radius || y >= radius)
				return null;

			return getDistanceInMetersFromCoordinates(pos.lat(), pos.lng(), upos.lat(), upos.lng());
		}

		var userPos = App.user.getLatLng();

		// No need to update if we don't have a position.
		if(!userPos)
			return;

		// Initialization if empty.
		if(!this.lastLat || !this.lastLng) {
			this.lastLat = userPos.lat();
			this.lastLng = userPos.lng();
		}

		var time = new Date().getTime();
		var diff = time - this.lastTime;
		var walkedDistance = getDistanceInMetersFromCoordinates(this.lastLat, this.lastLng, userPos.lat(), userPos.lng());
		this.lastLat = userPos.lat();
		this.lastLng = userPos.lng();

		this.totalTime += diff;
		this.lastTime = time;

		var cameras = App.map.get('cameras');
		var atLeastOneCam = false;

		_.each(cameras, function(v, k) {
			var distance = getDistance(v);
			if(distance && (distance <= 50)) {
				this.cameras.push(v.id);
				this.publicTime += diff;
				this.publicDistance += walkedDistance;
				atLeastOneCam = true;
			}
		}, this);

		if(!atLeastOneCam) {
			this.privateTime += diff;
			this.privateDistance += walkedDistance;
		}
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
		return this.privateDistance;
	},

	getPublicTime: function getPublicTime() {
		return this.publicTime / 1000;
	},

	getPublicDistance: function getPublicDistance() {
	   return this.publicDistance;
	}

});
