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

    const [log, setLog] = useState(["first"]);
    const [map, setMap] = useState(maputils.GenerateMap(1));

    function addToLog(newText) {
        setLog([...log, newText]);
    }

    return (
        <>
        <div class='parent flex-parent'>
            <Log logData = {log}/>
            <Minimap mapData={map}/>
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
            generate new map
        </button>
        </>
    );
}