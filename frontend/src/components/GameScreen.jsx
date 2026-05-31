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
    const [map, setMap] = useState([]);//this will be replaced by a bigger "gamestate" structure

    const [view, setView] = useState([]);

    const [init, setInit] = useState(false);

    const [serial, setSerial] = useState("");//testing map de/serialization. remove later

    if (!init)
    {   
        // this *SHOULD...* only run once, on first render
        // (this might be bad actually. what if the user starts a new game immediately after finishing another?)

        // do all initialization from data, initial map generation if new game, etc
        // currently this is only:
        setMap(maputils.GenerateMap(1))

        // placeholder for testing visibility
        let viewmap = maputils.EmptyMap()
        for (let i = 0; i < maputils.MapHeight; i++) {
            for (let j = 0; j < maputils.MapWidth; j++) {
                viewmap[i][j] = maputils.TileTypes.VISITED;
            }
        }
        viewmap[4][5] = maputils.TileTypes.CURRENT;
        setView(viewmap)

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

        <button type="button" onClick={() => addToLog("new line")}>
            add line to log
        </button>

        <br/>

        <button type="button" onClick={() => setMap(maputils.GenerateMap(1))}>
            generate new map (floor level 1)
        </button>

        <button type="button" onClick={() => setMap(maputils.GenerateMap(20))}>
            generate new map (floor level 20)
        </button>

        <br/>

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