function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return hours+"h "+minutes+"m "+seconds+"s";
}


function displayInfoInPanel() {
	function distToString(dist) {
		if(!dist)
			return "0m";

		if(dist >= 1000)
			return Math.round(dist/100, 1)/10 + "km";
		else
			return Math.round(dist) + "m";
	}

	var count = App.timeline.getCamCount();

    $('#totalTime').text(secondsToTime(App.timeline.getTime()));
    $('#totalDistance').text(distToString(App.timeline.getDistance()));
    $('#privateTime').text(secondsToTime(App.timeline.getPrivateTime()));
    $('#privateDistance').text(distToString(App.timeline.getPrivateDistance()));
    $('#publicTime').text(secondsToTime(App.timeline.getPublicTime()));
    $('#publicDistance').text(distToString(App.timeline.getPublicDistance()));

	if(count)
		$('#seen').text("Seen by "+count+" camera"+((count != 1)?"s":"")+".");
	else
		$('#seen').text("Unseen yet.");
}

function infoFetchingLoop() {
    var bLoop = setInterval(displayInfoInPanel, 4444);
}


