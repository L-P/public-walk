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
	var count = App.timeline.getCamCount();
    $('#totalTime').text(secondsToTime(App.timeline.getTime()));
    $('#totalDistance').text(Math.floor(App.timeline.getDistance())+"m");
    $('#privateTime').text(secondsToTime(App.timeline.getPrivateTime()));
    $('#privateDistance').text(Math.floor(App.timeline.getPrivateDistance())+"m");
    $('#publicTime').text(secondsToTime(App.timeline.getPublicTime()));
    $('#publicDistance').text(Math.floor(App.timeline.getPublicDistance())+"m");
    $('#seen').text("Seen by "+count+" camera"+((count != 1)?"s":"")+".");
}

function infoFetchingLoop() {
    var bLoop = setInterval(displayInfoInPanel, 4444);
}


