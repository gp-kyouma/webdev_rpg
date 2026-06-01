import { useState } from 'react';

import Minimap from './Minimap';
import * as maputils from './MapUtils.js'

function Log({logData}) {
    
    return (
        <div class='child flex-child'>
            <p></p>
            <ul class="scroll-list">
                {logData.map(i => <li>{i}</li>)}
            </ul>
        </div>
    );
}

export default function GameScreen({data}) {

    const [log, setLog] = useState([]);

    //these will be replaced by a bigger "gamestate" structure
    const [map, setMap] = useState([]);
    const [view, setView] = useState([]);
    const [pos, setPos] = useState([]);

    const [init, setInit] = useState(false);

    const [serial, setSerial] = useState("");//testing map de/serialization. remove later

    // basic movement test
    function move(map, view, pos, direction){
        let [x,y] = pos
        switch (direction) {
            case 'N':
                y=y-1
                break;
        
            case 'S':
                y=y+1
                break;

            case 'E':
                x=x+1
                break;

            case 'W':
                x=x-1
                break;
            
            default:
                break;
        }

        if (y < 0 || y >= maputils.MapHeight)
            return

        if (x < 0 || x >= maputils.MapWidth)
            return

        if (map[y][x] == maputils.TileTypes.NONE)
            return

        let newView = structuredClone(view)
        newView[y][x] = maputils.TileTypes.CURRENT

        function updateAdjacentView(x,y){
            if (map[y][x] != maputils.TileTypes.NONE){
                if (view[y][x] == maputils.TileTypes.CURRENT)
                    newView[y][x] = maputils.TileTypes.VISITED
                else if (view[y][x] == maputils.TileTypes.NONE)
                    newView[y][x] = maputils.TileTypes.UNKNOWN
            }
        }

        if (x > 0) 
            updateAdjacentView(x-1,y);
        if (x < maputils.MapWidth-1) 
            updateAdjacentView(x+1,y);
        if (y > 0) 
            updateAdjacentView(x,y-1);
        if (y < maputils.MapHeight-1) 
            updateAdjacentView(x,y+1);

        setPos([x,y])
        setView(newView)
    }

    function NewMapReset(floor)
    {
        let newmap = maputils.GenerateMap(floor)
        let newview = maputils.EmptyMap()
        let newpos = [4,4]

        setMap(newmap)
        move(newmap, newview, newpos, '')
    }

    if (!init)
    {   
        // this *SHOULD...* only run once, on first render
        // (this might be bad actually. what if the user starts a new game immediately after finishing another?)
        // just reset the init flag then. 4head

        // do all initialization from data, initial map generation if new game, etc
        // currently this is only:
        NewMapReset(1)

        setInit(true)
    }

    function addToLog(newText) {
        setLog([...log, newText]);
    }

    return (
        <>
        <div class='parent flex-parent'>
            <Log logData = {log}/>
            <Minimap mapData={map} viewData={view}/>
        </div>

        <h2>
            hello i am a placeholder here is my data from start screen: 
            <br/>
            {JSON.stringify(data,null,2)}
        </h2>

        <div class="cross-container">
            <button class="btn btn-top" type="button" onClick={() => move(map, view, pos, 'N')}>N</button>
            <br/>
            <button class="btn btn-left" type="button" onClick={() => move(map, view, pos, 'W')}>W</button>
            <p class="btn-text btn-middle">
                {pos[0]}, {pos[1]}
            </p>
            <button class="btn btn-right" type="button" onClick={() => move(map, view, pos, 'E')}>E</button>
            <br/>
            <button class="btn btn-bottom" type="button" onClick={() => move(map, view, pos, 'S')}>S</button>
        </div>

        <br/>

        <button type="button" onClick={() => addToLog("new line")}>
            add line to log
        </button>

        <br/>

        <button type="button" onClick={() => NewMapReset(1)}>
            generate new map (floor level 1)
        </button>

        <button type="button" onClick={() => NewMapReset(20)}>
            generate new map (floor level 20)
        </button>

        <br/>

        //these don't reset the view<br/>
        <button type="button" onClick={() => setSerial(maputils.serialize(map))}>
            serialize map
        </button>

        <button type="button" onClick={() => setMap(maputils.deserialize(serial))}>
            deserialize map
        </button>

        <pre>{serial}</pre>
        </>
    );
}