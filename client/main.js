GLOBAL_TIMESTAMP = 0;

script_srcs = ['./gui.js', './websocket.js']
script_srcs.forEach(src => {
    scriptElem = document.createElement('script');
    scriptElem.src = src;
    scriptElem.type = "text/javascript";

    document.body.appendChild(scriptElem);
});

startBtn = document.getElementById('startBtn');

// game start trigger
startBtn.onclick = function (){
    GLOBAL_TIMESTAMP = + new Date();

    msg = {
        'type': 'game_start',
        'timestamp': GLOBAL_TIMESTAMP,
        'map_size': 1 * sizeRange.value,
    }
    webSocket.send(JSON.stringify(msg))
};