// We pollute the global scope with this single var, that will hold all our Model and View constructors
window.HD = {}
// easiest log
window.log = (function() {
	return console.log || function() { }
})()

// Now, we will call the main script, to be loaded once the page is fully loaded
$(function main() {
		// Instanciate our Models
		var App = window.App = new HD.App();
		var user = App.user = new HD.User();
		var map = App.map = new HD.Map({
			center: user.getLatLng()
		});

		// Display cameras on the map
		map.displayCamerasAroundUser(user);
});
