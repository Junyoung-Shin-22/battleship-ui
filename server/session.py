import battleship

class Session:
    # dict of timestamp: session_object
    sessions = dict()

    def __init__(self, timestamp, map_size):
        self.timestamp = timestamp
        self.map = battleship.Map(map_size)

        Session.sessions[self.timestamp] = self
    
    def hit(self, i, j):
        return self.map.hit(i, j)