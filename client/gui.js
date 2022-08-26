function createBox(i, j) {
    box = document.createElement('div');
    box.setAttribute('id', i+'-'+j);
    box.classList.add('box');

    box.onclick = function () {
        json = {
            'type': 'game_play',
            'timestamp': GLOBAL_TIMESTAMP,
            'i': i,
            'j': j,
        }
        send_json(json);
    };
    return box;
}

function getBox(i, j){
    return document.getElementById(i+'-'+j);
}

function createTable(rows, columns) {
    map = document.getElementById('map');

    while (map.firstChild) {
        map.removeChild(map.firstChild);
    }

    for (let i=0; i<rows; i++) {
        row = document.createElement('div');
        row.classList.add('map_row');

        for (let j=0; j<columns; j++){
            box = document.createElement('div');
            box = createBox(i, j);

            row.appendChild(box);
        }
        
        map.appendChild(row);
    }
}

function initializeGUI() {
    GLOBAL_CURRENT_SCORE = 0;
    GLOBAL_TIMESTAMP = + new Date();
    GLOBAL_MAP_SIZE = sizeRange.value;

    size = sizeRange.value;
    sizeP.textContent = '(' + size + ' x ' + size + ')';

    createTable(size, size);

    currentScoreP.textContent = GLOBAL_CURRENT_SCORE;
    highScoreP.textContent = GLOBAL_HIGH_SCORE[size];

    if (GLOBAL_WEBSOCKET.readyState == 0) {
        messageP.style.color = 'black'
        messageP.textContent = '서버에 연결하는중'
    }
    else if (GLOBAL_WEBSOCKET.readyState == 1) {
        messageP.style.color = 'green';
        messageP.textContent = '서버 연결 성공';
    }
    else {
        messageP.style.color = 'red';
        messageP.textContent = '서버 연결 없음';
    }

    for (i = 0; i < 5; i++) {
        getShipSizeP(i).textContent = '.';
        getShipNumP(i).textContent = '';
    }
}

sizeRange = document.getElementById('mapSizeRange');
sizeRange.addEventListener('input', initializeGUI);
sizeP = document.getElementById('mapSizeP');

messageP = document.getElementById('messageP');

function getShipSizeP(i){
    return document.getElementById('shipSizeP'+i);
}

function getShipNumP(i){
    return document.getElementById('shipNumP'+i);
}

currentScoreP = document.getElementById('currentScoreP');
highScoreP = document.getElementById('highScoreP')

initializeGUI();