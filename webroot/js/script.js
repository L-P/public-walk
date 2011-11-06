// We pollute the global scope with this single var, that will hold all our Model and View constructors
window.HD = {}
// easiest log
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

// We init the page script
$(function() {
		window.App = new HD.App();
		
		// Submitting the form will simulate a travel
		$('#simulation').submit(function() {
			// We're gonna ask directions to GMaps
			var direction = new google.maps.DirectionsService();
			var directionOptions = {
				origin: $('#from').val(),
				destination: $('#to').val(),
				travelMode: google.maps.DirectionsTravelMode.WALKING				
			}

			// We'll save the paths in an array
			var paths = [];
			direction.route(directionOptions, function(result, status) {
				//Not found
				if (status[0]=="NOT_FOUND") return log("Not found");
				var steps = result.routes[0].legs[0].steps;
				_.each(steps, function (step) {
					_.each(step.path, function(path) {
						paths.push({
							lat: path.lat(),
							lng: path.lng()
						});
					})
				})
				// We got the complete path list
				App.trigger('directionsReceived', paths);
			})

			return false;

		})
});
