HD.Timeline = Backbone.Model.extend({
	defaults: {
	},
	initialize: function initialize(options) {
		this.clearStack();
		App.bind('geolocReceived', this.geolocReceived, this);
	},


	geolocReceived: function geolocReceived(data) {
		log("Geoloc data received :", data);
		log(App.map.get('cameras'));
		var distance = 0;
	},


	pushStack : function pushStack(time, dist, id) {
		this.stack[time] = {
			time: time,
			dist: dist,
			id: id
		};
	},

	clearStack: function clearStack() {
		this.stack = {0:{time:0,dist:0,id:null}};
	},

	createDummyStack: function createDummyStack() {
		for(i=0; i<500; i++) {
			this.pushStack(i, Math.random()*10, (Math.random() > .8) ? Math.floor(Math.random()*100) : null);
		}
	},

	getTime: function getTime() {
		var max = 0;
		_.each(this.stack, function(v, k) {
			max = Math.max(max, v.time);
		});

		return max;
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

		return time;
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
