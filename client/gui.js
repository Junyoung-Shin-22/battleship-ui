function createBox(i, j) {
    box = document.createElement('div');
    box.setAttribute('id', i+'-'+j);
    box.classList.add('box');

    box.onclick = () => {webSocket.send(JSON.stringify({
        'type': 'game_play',
        'timestamp': GLOBAL_TIMESTAMP,
        'i': i,
        'j': j,
    }))};
    return box;
}

function getBox(i, j){
    return document.getElementById(i+'-'+j);
}

function createTable(rows, columns) {
    tbl = document.createElement('div');
    tbl.classList.add('table');

    for (let i=0; i<rows; i++) {
        row = document.createElement('div');
        row.classList.add('row');

        for (let j=0; j<columns; j++){
            box = document.createElement('div');
            box = createBox(i, j);

            row.appendChild(box);
        }
        
        tbl.appendChild(row);
    }

    return tbl;
}

function updateMapSize() {
    s = sizeRange.value;
    sizeP.textContent = '(' + s + ' x ' + s + ')';

    map = createTable(s, s);
    
    while (mapArea.firstChild) {
        mapArea.removeChild(mapArea.firstChild);
    }
    mapArea.appendChild(map);

    messageP.textContent = '(서버에 연결됨)'
}

sizeRange = document.getElementById('mapSizeRange');
sizeRange.addEventListener('input', updateMapSize);
sizeP = document.getElementById('mapSizeP');

shipsInfoP = document.getElementById('shipsInfoP')

messageP = document.getElementById('messageP');
mapArea = document.getElementById('mapArea');

updateMapSize();