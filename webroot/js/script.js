// We pollute the global scope with this single var, that will hold all our Model and View constructors
window.HD = {}
// easiest log
window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

// We init the page script
$(function() {
		window.App = new HD.App();
});
