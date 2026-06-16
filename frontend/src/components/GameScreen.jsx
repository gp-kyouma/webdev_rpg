import { useState, useEffect, useRef } from 'react';

import Minimap from './Minimap';
import { TileTypes } from './js/MapUtils';

import BossRoomScreen from './BossRoomScreen';

function Log({logData}) {
    
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
    };
    useEffect(scrollToBottom, [logData]);
    
    return (
        <div class='child flex-child'>
            <p></p>
            <ul class="scroll-list">
                {logData.map(i => <li>{i}</li>)}
                <li ref={messagesEndRef} />
            </ul>
        </div>
    );
}

function MovementWidget({pos, apply}) {
    
    return (
        <div class="cross-container">
            <button class="btn btn-top" type="button" onClick={() => apply("movePlayer",'N')}>N</button>
            <br/>
            <button class="btn btn-left" type="button" onClick={() => apply("movePlayer",'W')}>W</button>
            <p class="btn-text btn-middle">
                {pos[0]}, {pos[1]}
            </p>
            <button class="btn btn-right" type="button" onClick={() => apply("movePlayer",'E')}>E</button>
            <br/>
            <button class="btn btn-bottom" type="button" onClick={() => apply("movePlayer",'S')}>S</button>
        </div>
    );
}

export default function GameScreen({data, setData, quit}) {

    const [log, setLog] = useState([]);

    function quitWithoutSaving(){
        if (confirm("Quit current game?\n(All progress made since the start of the floor will be lost)"))
            quit()
    }
    
    async function applyToData(method,params)
    {
        let newdata = data.clone()
        await newdata[method](params);
        setData(newdata)
    }

    useEffect(() => {
        let newdata = data.clone()
        newdata.log_ = (str) => { setLog(prev => [...prev, str]); }
        setData(newdata)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let actionsScreen = null
    if (data.battle){
        //todo battle screen
    }
    else{
        actionsScreen = <MovementWidget pos={data.pos} apply={applyToData}/>
    }

    let currentTileScreen = null
    switch (data.currentTile) {
        case TileTypes.TREASURE:
            currentTileScreen = <p>large chest ahead (placeholder)</p>
            //todo treasure screen
            break;

        case TileTypes.SHOP:
            currentTileScreen = <p>lamp oil rope bombs you want it (placeholder)</p>
            //todo shop screen
            break;

        case TileTypes.BOSS:
            currentTileScreen = <BossRoomScreen data={data} apply={applyToData}/>
            break;
    }

    return (
        <>
        <div class='parent flex-parent'>
            <Log logData = {log}/>
            <Minimap mapData={data.map_data} viewData={data.view_data}/>
        </div>

        <button type="button" onClick={() => quitWithoutSaving()} > Quit Without Saving </button>
        
        <br/><br/>

        {actionsScreen}

        <br/>

        {currentTileScreen}

        <br/>

        <br/>
        hello i am a placeholder here is my data from start screen: 
        <br/>
        <pre>{JSON.stringify(data,null,2)}</pre>
        <br/>
        </>
    );
}