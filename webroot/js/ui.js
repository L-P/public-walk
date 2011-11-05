function initAllTheThings () {
    $('#startButton').hide();
    $('#map_canvas').show();
    $('#infoPanel').show();
    main();
    infoFetchingLoop();
}

function displayInfoInPanel() {
    $('#totalTime').text(HD.timeline.getTime());
    $('#totalDistance').text(HD.timeline.getDistance());
    $('#privateTime').text(HD.timeline.getPrivateTime());
    $('#privateDistance').text(HD.timeline.getPrivateDistance());
    $('#publicTime').text(HD.timeline.getPublicTime());
    $('#publicDistance').text(HD.timeline.getPublicDistance());
    $('#cameraCount').text(HD.timeline.getCamCount());
}

function infoFetchingLoop() {
    var bLoop = setInterval(displayInfoInPanel, 4444);
}
