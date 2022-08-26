script_srcs = ['./global.js', './websocket.js', './protocols.js', './gui.js']
script_srcs.forEach(src => {
    script = document.createElement('script');
    script.src = src;
    script.type = "text/javascript";

    document.body.appendChild(script);
});

startBtn = document.getElementById('startBtn');
resetBtn = document.getElementById('resetBtn');

// game start trigger
startBtn.onclick = function () {
    startBtn.disabled = true;
    sizeRange.disabled = true;
    initializeGUI();

    json = {
        'type': 'game_start',
        'timestamp': GLOBAL_TIMESTAMP,
        'map_size': 1 * sizeRange.value,
    }
    send_json(json);
};

resetBtn.onclick = function () {
    initializeGUI();
    startBtn.disabled = false;
    sizeRange.disabled = false;
};