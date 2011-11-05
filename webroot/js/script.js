// We pollute the global scope with this single var, that will hold all our Model and View constructors
window.HD = {}
// easiest log
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

// Now, we will call the main script, to be loaded once the page is fully loaded
function main() {
		// Instanciate our Models
		var App = window.App = new HD.App();
		var user = App.user = new HD.User();
		var map = App.map = new HD.Map({
			center: user.getLatLng()
		});

		// Display cameras on the map
		map.displayCamerasAroundUser(user);

		// Starting the timeline
		var timeline = App.timeline = new HD.Timeline();
}
