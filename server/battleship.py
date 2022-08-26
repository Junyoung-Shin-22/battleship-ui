from random import randrange

NUM_OF_SHIPS =\
    {
        10: {1:0, 2:1, 3:2, 4:1, 5:1},
        9:  {1:0, 2:1, 3:1, 4:1, 5:1},
        8:  {1:0, 2:1, 3:1, 4:2, 5:0},
        7:  {1:0, 2:0, 3:1, 4:2, 5:0},
        6:  {1:0, 2:1, 3:1, 4:1, 5:0},
        5:  {1:0, 2:1, 3:2, 4:0, 5:0},
    }

def random_ship(map, ship_size):
    while True:
        orientation = randrange(2)

        if orientation == 0: # horizontal
            x, y = randrange(map.size), randrange(map.size-ship_size)
        else:
            x, y = randrange(map.size-ship_size), randrange(map.size)
        
        new_ship = Ship(ship_size, orientation, x, y)
        
        if any(new_ship.check_collision(other) for other in map.ships):
            continue
        else:
            return new_ship

class Map:
    def __init__(self, size):
        self.size = size
        self.num_of_ships = NUM_OF_SHIPS[self.size]
        self.ships = []

        self.place_ships()
        self.display()
    
    def place_ships(self):
        for ship_size in range(5, 0, -1):
            num_ships = self.num_of_ships[ship_size]

            for _ in range(num_ships):
                self.ships.append(random_ship(self, ship_size))
    
    # return: 0: miss, 1: hit, 2: hit and sunken, 3: all_sunken
    def hit(self, i, j):
        for ship in self.ships:
            if (i, j) in ship.area:
                ship.area[(i, j)] = True
                
                if ship.is_sunken():
                    return 2, list(ship.area.keys())
                else:
                    return 1, []
        return 0, []
    
    def display(self):
        map = [[0]*self.size for _ in range(self.size)]

        for ship in self.ships:
            for i, j in ship.area:
                map[i][j] = 1

        print(*map, sep='\n')             

class Ship:
    def __init__(self, size, orientation, x, y):
        self.size = size
        
        if orientation == 0: # horizontal
            self.area = {(x, i):False for i in range(y, y+size)}
        else:
            self.area = {(i, y):False for i in range(x, x+size)}

    def check_collision(self, other):
        for i in self.area:
            if i in other.area: return True
        return False

    def is_sunken(self):
        return all(self.area.values())