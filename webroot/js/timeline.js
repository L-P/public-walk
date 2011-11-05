HD.timeline = (function() {
	var stack = {};

	function pushStack(time, dist, id) {
		stack[time] = {
			time: time,
			dist: dist,
			id: id
		};
	}


	function clearStack() {
		stack = [];
	}

	function createDummyStack() {
		for(i=0; i<500; i++) {
			pushStack(i, Math.random()*10, (Math.random() > .8) ? Math.floor(Math.random()*100) : null);
		}
	}

	function getTime() {
		var max = 0;
		_.each(stack, function(v, k) {
			max = Math.max(max, v.time);
		});

		return max;
	}


	function getDistance() {
		return _.reduce(stack, function(memo, v) {
			return memo + v.dist;
		}, 0);
	}


	function getCamCount() {
		var seen = {};
		_.each(stack, function(v, k) {
			if(v.id)
				seen[v.id] = true;
		});

		return _.reduce(seen, function(memo, v) {
			return memo+1;
		}, 0);
	}

	function getPrivateTime() {
		var time = 0;
		var lastTime = stack[0].time;
		_.each(stack, function(v, k) {
			if(!v.id)
				time += v.time - lastTime;
			lastTime = v.time;
		});

		return time;
	}

	function getPrivateDistance() {
		return _.reduce(stack, function(memo, v) {
			return memo + (v.id ? 0 : v.dist);
		}, 0);
	}

	function getPublicTime() {
		return getTime() - getPrivateTime();
	}

	function getPublicDistance() {
		return getDistance() - getPrivateDistance();
		return NaN;
	}



	createDummyStack();
	console.log({
		'getTime' :				getTime(),
		'getDistance' :			getDistance(),
		'getCamCount' :			getCamCount(),
		'getPrivateTime' :		getPrivateTime(),
		'getPrivateDistance' :	getPrivateDistance(),
		'getPublicTime' :		getPublicTime(),
		'getPublicDistance' :	getPublicDistance(),
	});

	return {
		'pushStack' :			pushStack,
		'getTime' :				getTime,
		'getDistance' :			getDistance,
		'getCamCount' :			getCamCount,
		'getPrivateTime' :		getPrivateTime,
		'getPrivateDistance' :	getPrivateDistance,
		'getPublicTime' :		getPublicTime,
		'getPublicDistance' :	getPublicDistance,
	};
})();

