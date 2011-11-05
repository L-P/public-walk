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
			pushStack(i, Math.random()*10, Math.floor(Math.random()*100));
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

	createDummyStack();
	console.log(getTime());
	console.log(getDistance());

	return {
		'pushStack'			:			pushStack,
		'getTime'			:			getTime,
		'getDistance'		:			getDistance,
/*
		'getPrivateTime' :		getPrivateTime,
		'getPrivateDistance' :	getPrivateDistance,
		'getPublicTime' :		getPublicTime,
		'getPublicDistance' :	getPublicDistance,
*/
	};
})();

