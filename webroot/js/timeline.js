HD.timeline = (function() {
	var stack = {};

	function pushStack(time, dist, id) {
		stack[time] = {
			time: time,
			dist: dist,
			id: id
		};
	}

	function createDummyStack() {
		for(i=0; i<500; i++) {
			pushStack(i, Math.random()*10, (Math.random() > .5) ? Math.floor(Math.random()*100) : null);
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

	createDummyStack();
	console.log(getTime());
	console.log(getDistance());
	console.log(getCamCount());

	return {
		'pushStack'			:			pushStack,
		'getTime'			:			getTime,
		'getDistance'		:			getDistance,
		'getCamCount'		:			getCamCount,
/*
		'getPrivateTime' :		getPrivateTime,
		'getPrivateDistance' :	getPrivateDistance,
		'getPublicTime' :		getPublicTime,
		'getPublicDistance' :	getPublicDistance,
*/
	};
})();

