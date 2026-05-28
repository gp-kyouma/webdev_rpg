// *Heavily* based on:
// https://www.boristhebrave.com/2020/09/12/dungeon-generation-in-binding-of-isaac/

//--------------------------------------------------------------------------------------------

const MapWidth = 9
const MapHeight = 9

export const TileTypes = Object.freeze({
  NONE: 0,
  DEFAULT: 1,
  START: 2,
  TREASURE: 3,
  SHOP: 4,
  BOSS: 5
});

const MaxRooms = 15;
const MinRooms = 7;

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

//--------------------------------------------------------------------------------------------

function EmptyMap() {
    let data = []
    for (let i = 0; i < MapHeight; i++) {
        data[i] = [];
        for (let j = 0; j < MapWidth; j++) {
            data[i][j] = TileTypes.NONE;
        }
    }
    return data;
}

export function GenerateMap(floor) {
    let nRooms = (Math.random() * 2) + 5 + floor * 2.6;
    nRooms = Math.floor(nRooms);
    nRooms = clamp(nRooms, MinRooms, MaxRooms);

    let roomQueue = [];
    let endRooms = [];

    let roomCount = 0;
    let mapData;

    function visit(x, y)
    {
        // "If the cell is already occupied, give up"
        if (mapData[x][y] != TileTypes.NONE)
            return false;

        // "If the cell itself has more than one filled neighbour, give up"
        let neighbours = 0;
        if (x > 0) 
            neighbours += mapData[x-1][y];
        if (x < MapWidth-1) 
            neighbours += mapData[x+1][y];
        if (y > 0) 
            neighbours += mapData[x][y-1];
        if (y < MapHeight-1) 
            neighbours += mapData[x][y+1];

        if (neighbours > 1)
            return false;

        // "If we already have enough rooms, give up"
        if (roomCount >= nRooms)
            return false;

        // "Random 50% chance, give up"
        let isStartingRoom = ((x == 4) && (y == 4))
        if (Math.random() < 0.5 && !isStartingRoom)
            return false;

        // "Otherwise, mark the cell as having a room in it, and add it to the queue"
        roomQueue.push([x,y]);
        mapData[x][y] = TileTypes.DEFAULT; //specific room types will be set later
        roomCount += 1;
        return true;
    }

    function popRandomEndRoom()
    {
        let index = Math.floor(Math.random() * endRooms.length);
        let i = endRooms[index];
        endRooms.splice(index, 1);
        return i;
    }

    function resetMap()
    {
        roomQueue = [];
        endRooms = [];

        roomCount = 0;
        mapData = EmptyMap();

        // starting room
        visit(4,4); // middle of the map
    }

    let ok = false

    while (!ok)
    {
        resetMap();

        while (roomQueue.length > 0)
        {
            let i = roomQueue.shift();

            let [x, y] = i;

            let created = false;

            if (x > 0) 
                created = created | visit(x-1, y);
            if (x < MapWidth-1) 
                created = created | visit(x+1, y);
            if (y > 0) 
                created = created | visit(x, y-1);
            if (y < MapHeight-1) 
                created = created | visit(x, y+1);

            if(!created) {
                endRooms.push(i);
            }
        }

        if (roomCount < nRooms)
            continue;

        if (endRooms.length < 3)
            continue;

        let [bossX, bossY] = endRooms.pop()
        let [shopX, shopY] = popRandomEndRoom()
        let [chestX, chestY] = popRandomEndRoom()

        mapData[4][4] = TileTypes.START;
        mapData[bossX][bossY] = TileTypes.BOSS;
        mapData[shopX][shopY] = TileTypes.SHOP;
        mapData[chestX][chestY] = TileTypes.TREASURE;

        ok = true;
    }

    // every time gamescreen *renders*, this function is run *twice*. why.
    // fixed now...?
    //console.log(serialize(mapData))
    //console.log(floor)
    
    return mapData;
}

//--------------------------------------------------------------------------------------------

// for saving in database

export function serialize(mapData) {
    let data = ""
    for (let y = 0; y < MapHeight; y++) {
        for (let x = 0; x < MapWidth; x++) {
            switch (mapData[y][x]) {
                case TileTypes.NONE:
                    data += ' '
                    break;
            
                case TileTypes.DEFAULT:
                    data += 'D'
                    break;

                case TileTypes.START:
                    data += 'S'
                    break;

                case TileTypes.TREASURE:
                    data += 'C'
                    break;

                case TileTypes.SHOP:
                    data += '$'
                    break;

                case TileTypes.BOSS:
                    data += 'B'
                    break;
            }
        }
        data += '\n'//for readability. will be discarded in deserialization
    }
    return data;
}

export function deserialize(stringData) {
    let data = EmptyMap()
    let string = stringData.split("")

    for (let y = 0; y < MapHeight; y++) {
        for (let x = 0; x < MapWidth; x++) {
            let char = string.shift()
            switch (char) {
                case ' ':
                    //data[y][x] = TileTypes.NONE //unnecessary because of EmptyMap()
                    break;
            
                case 'D':
                    data[y][x] = TileTypes.DEFAULT
                    break;

                case 'S':
                    data[y][x] = TileTypes.START
                    break;

                case 'C':
                    data[y][x] = TileTypes.TREASURE 
                    break;

                case '$':
                    data[y][x] = TileTypes.SHOP
                    break;

                case 'B':
                    data[y][x] = TileTypes.BOSS 
                    break;
            }
        }
        string.shift()// discard newline
    }
    return data;
}