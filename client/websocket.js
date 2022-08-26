function send_json(json){
    msg = JSON.stringify(json);
    GLOBAL_WEBSOCKET.send(msg)
}

function getWebSocket() {
    webSocket = new WebSocket("ws://localhost:14159");

    webSocket.addEventListener('open', function (event) {
        messageP.style.color = 'green';
        messageP.textContent = '서버 연결 성공';
    })

    webSocket.addEventListener('error', function (event) {
        messageP.style.color = 'red';
        messageP.textContent = '서버 연결 없음';
    
        startBtn = document.getElementById('startBtn');
        startBtn.disabled = true;
    });
    
    webSocket.addEventListener('message', function (event) {
        json = JSON.parse(event.data);
    
        if (json['timestamp'] != GLOBAL_TIMESTAMP) return;
    
        type = json['type'];
        JSON_TYPES[type](json);
    });

    return webSocket
}

GLOBAL_WEBSOCKET = getWebSocket();