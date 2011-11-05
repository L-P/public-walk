function initAllTheThings () {
    $('#startButton').hide();
    $('#canvas').show();
    $('#infoPanel').show();
    main();
    infoFetchingLoop();
}

function displayInfoInPanel() {
    $('#totalTime').text(App.timeline.getTime());
    $('#totalDistance').text(App.timeline.getDistance());
    $('#privateTime').text(App.timeline.getPrivateTime());
    $('#privateDistance').text(App.timeline.getPrivateDistance());
    $('#publicTime').text(App.timeline.getPublicTime());
    $('#publicDistance').text(App.timeline.getPublicDistance());
    $('#cameraCount').text(App.timeline.getCamCount());
}

function infoFetchingLoop() {
    var bLoop = setInterval(displayInfoInPanel, 4444);
}
