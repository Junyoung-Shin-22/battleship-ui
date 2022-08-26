SHIP_NAMES = {
    2: '초계함 (길이 2)',
    3: '구축함 (길이 3)',
    4: '전함 (길이 4)',
    5: '항공모함 (길이 5)',
};

function game_start(json) {
    i = 0;
    for (size in json['num_of_ships']) {
        num = json['num_of_ships'][size]
        
        if (num != 0) {
            getShipSizeP(i).textContent = SHIP_NAMES[size];
            getShipNumP(i).textContent = num;
            i++;
        }
    }

    messageP.style.color = 'black';
    messageP.textContent = '게임 시작됨 ' + '(id: ' + GLOBAL_TIMESTAMP + ')';
}

function game_play(json) {
    i = json['i'], j = json['j'];
    box = getBox(i, j);

    GLOBAL_CURRENT_SCORE += 1;
    currentScoreP.textContent = GLOBAL_CURRENT_SCORE;
    
    if (json['result'] == 0){
        messageP.style.color = 'red'
        messageP.textContent = '빗나감!';
        box.style.backgroundColor = 'green';
    }

    else if (json['result'] == 1){
        messageP.style.color = 'red'
        messageP.textContent = '명중!';
        box.style.backgroundColor = 'yellow';
    }

    else if (json['result'] == 2){
        messageP.style.color = 'red'
        messageP.textContent = '격침!';
        json['area'].forEach((a)=>{
            getBox(a[0], a[1]).style.backgroundColor = 'red';
        });
    }

    else if (json['result'] == 3){
        messageP.style.color = 'blue'
        messageP.textContent = '승리!';
        json['area'].forEach((a)=>{
            getBox(a[0], a[1]).style.backgroundColor = 'red';
        });
        for (i of document.getElementsByClassName('box')){
            i.onclick = null;
        }

        if (GLOBAL_CURRENT_SCORE < GLOBAL_HIGH_SCORE[GLOBAL_MAP_SIZE]){
            GLOBAL_HIGH_SCORE[GLOBAL_MAP_SIZE] = GLOBAL_CURRENT_SCORE
        }
        highScoreP.textContent = GLOBAL_HIGH_SCORE[GLOBAL_MAP_SIZE];
    }

    box.onclick = null;
}

JSON_TYPES = {
    'game_start':
        game_start,
    'game_play':
        game_play,
};