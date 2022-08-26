import json
import session

async def _websocket_send(websocket, json_dict):
    msg = json.dumps(json_dict)
    await websocket.send(msg)

async def _game_start(websocket, **json_dict):
    timestamp = json_dict['timestamp']
    map_size = json_dict['map_size']

    new_session = session.Session(timestamp, map_size)

    new_json_dict = {
        'type': 'game_start',
        'timestamp': timestamp,
        'num_of_ships': new_session.map.num_of_ships,
    }
    await _websocket_send(websocket, new_json_dict)

async def _game_play(websocket, **json_dict):
    timestamp = json_dict['timestamp']
    i, j = json_dict['i'], json_dict['j']

    if timestamp not in session.Session.sessions:
        return
    
    current_session = session.Session.sessions[timestamp]
    result, area = current_session.hit(i, j)

    new_json_dict = {
        'type': 'game_play',
        'timestamp': timestamp,
        'i': i, 'j': j,
        'result': result,
        'area': area
    }
    await _websocket_send(websocket, new_json_dict)


JSON_TYPES =\
    {
        'game_start':
            _game_start,

        'game_play':
            _game_play,
    }