webSocket = new WebSocket("ws://localhost:14159");

webSocket.addEventListener('open', function (event) {
    messageP.textContent = '(서버에 연결됨)';
})

webSocket.addEventListener('error', function (event) {
    messageP.textContent = '(서버 연결 없음)';

    startBtn = getElementById('startBtn');
    startBtn.disabled = true;
});

webSocket.addEventListener('message', function (event) {
    msg = JSON.parse(event.data);
    console.log(msg);

    if (msg['type'] == 'game_start') {
        if (msg['timestamp'] != GLOBAL_TIMESTAMP) return;

        messageP.textContent = '(게임 시작됨)'

        shipsInfoP.textContent = '전함 개수:'
        for (size in msg['num_of_ships']) {
            num = msg['num_of_ships'][size]
            if (num != 0) shipsInfoP.textContent += ' (길이 ' + size + ') ' + num + '개,';
        }
    }

    else if (msg['type'] == 'game_play') {
        if (msg['timestamp'] != GLOBAL_TIMESTAMP) return;

        i = msg['i'], j = msg['j'];
        box = getBox(i, j);
        
        if (msg['result'] == 0){
            messageP.textContent = '빗나감!';
            box.style.backgroundColor = 'green';
        }

        else if (msg['result'] == 1){
            messageP.textContent = '명중!';
            box.style.backgroundColor = 'yellow';
        }

        else if (msg['result'] == 2){
            messageP.textContent = '격침!';
            msg['area'].forEach((a)=>{
                getBox(a[0], a[1]).style.backgroundColor = 'red';
            });
        }
    }
});