import { useState, useEffect } from 'react';

import Minimap from './Minimap';

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

export default function GameScreen({data, setData, quit}) {

    const [log, setLog] = useState([]);

    //these will be replaced by a bigger "gamestate" structure
    /*
    const [map, setMap] = useState([]);
    const [view, setView] = useState([]);
    const [pos, setPos] = useState([]);
    */

    //const [init, setInit] = useState(false);//thejankers

    /*
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
    */

    function addToLog(newText) {
        setLog([...log, newText]);
    }

    /*
    if (!init)//thejankers
    {   
        // this *SHOULD...* only run once, on first render
        // (this might be bad actually. what if the user starts a new game immediately after finishing another?)
        // just reset the init flag then. 4head

        // do all initialization from data, initial map generation if new game, etc
        // currently this is only:
        NewMapReset(1)

        addToLog("this should be its own componeeeent")

        setInit(true)
    }
    */

    async function applyToData(method,params)
    {
        let newdata = structuredClone(data)
        await newdata[method](params); //NO WAY THIS WORKS. NOOOOO FUCKING WAY
        setData(newdata)
    }

    useEffect(() => {
        applyToData("setLogFunction",addToLog);
    }, []);

    return (
        <>
        <div class='parent flex-parent'>
            <Log logData = {log}/>
            <Minimap mapData={data.map_data} viewData={data.view_data}/>
        </div>

        <h2>
            hello i am a placeholder here is my data from start screen: 
            <br/>
            {JSON.stringify(data,null,2)}
            <br/>

            <button type="button" onClick={() => quit()} > Save and Quit </button>

            <br/>//this is a lie currently, theres nothing to save. 
            <br/>//also should alert user that the save is for the floor start
        </h2>

        <div class="cross-container">
            <button class="btn btn-top" type="button" onClick={() => applyToData("movePlayer",'N')}>N</button>
            <br/>
            <button class="btn btn-left" type="button" onClick={() => applyToData("movePlayer",'W')}>W</button>
            <p class="btn-text btn-middle">
                {data.pos[0]}, {data.pos[1]}
            </p>
            <button class="btn btn-right" type="button" onClick={() => applyToData("movePlayer",'E')}>E</button>
            <br/>
            <button class="btn btn-bottom" type="button" onClick={() => applyToData("movePlayer",'S')}>S</button>
        </div>

        <br/>

        <button type="button" onClick={() => addToLog("new line")}>
            add line to log
        </button>
        </>
    );
}