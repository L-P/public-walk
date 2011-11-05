HD.Timeline = Backbone.Model.extend({
	defaults: {
	},
	initialize: function initialize(options) {
		this.clearStack();
		App.bind('updateStack', this.updateStack, this);
	},


	updateStack: function updateStack(data) {
		function getDistance(cam) {
			var radius = 0.001;
			var pos = cam.getLatLng();
			var x = Math.abs(pos.lat() - data.lat);
			var y = Math.abs(pos.lng() - data.lng);

			if(x >= radius || y >= radius)
				return null;

			return getDistanceInMetersFromCoordinates(pos.lat(), pos.lng(), data.lat, data.lng);
		}

		var walkedDist = 1;
		var cameras = App.map.get('cameras');
		var atLeastOneCam = false;

		_.each(cameras, function(v, k) {
			var distance = getDistance(v);
			if(distance) log(distance);
			if(distance && (distance <= 50)) {
				this.pushStack(new Date().getTime(), atLeastOneCam ? 0 : walkedDist, v.id);
				atLeastOneCam = true;
			}
		}, this);

		if(!atLeastOneCam)
			this.pushStack(new Date().getTime(), walkedDist, null);
	},


	pushStack : function pushStack(time, dist, id) {
		this.stack[time] = {
			time: time,
			dist: dist,
			id: id
		};
	},

	clearStack: function clearStack() {
		this.stack = {0:{
			time:new Date().getTime(),
			dist:0,
			id:null
		}};
	},

	createDummyStack: function createDummyStack() {
		for(i=0; i<500; i++) {
			this.pushStack(i, Math.random()*10, (Math.random() > .8) ? Math.floor(Math.random()*100) : null);
		}
	},

	getTime: function getTime() {
		var max = 0;
		var min = Infinity;
		_.each(this.stack, function(v, k) {
			max = Math.max(max, v.time);
			min = Math.min(min, v.time);
		});

		return (max - min) / 1000;
	},
	
	getDistance : function getDistance() {
		return _.reduce(this.stack, function(memo, v) {
			return memo + v.dist;
		}, 0);
	},


	getCamCount: function getCamCount() {
		var seen = {};
		_.each(this.stack, function(v, k) {
			if(v.id)
				seen[v.id] = true;
		});

		return _.reduce(seen, function(memo, v) {
			return memo+1;
		}, 0);
	},

	getPrivateTime: function getPrivateTime() {
		var time = 0;
		var lastTime = this.stack[0].time;
		_.each(this.stack, function(v, k) {
			if(!v.id)
				time += v.time - lastTime;
			lastTime = v.time;
		});

		return time / 1000;
	},

	getPrivateDistance: function getPrivateDistance() {
		return _.reduce(this.stack, function(memo, v) {
			return memo + (v.id ? 0 : v.dist);
		}, 0);
	},

	getPublicTime: function getPublicTime() {
		return this.getTime() - this.getPrivateTime();
	},

	getPublicDistance: function getPublicDistance() {
		return this.getDistance() - this.getPrivateDistance();
	}

});
