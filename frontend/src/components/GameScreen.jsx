import { useState, useEffect, useRef } from 'react';

import Minimap from './Minimap';
import { TileTypes } from './js/MapUtils';

import BossRoomScreen from './BossRoomScreen';
import PlayerInfo from './PlayerInfo';

import GameState from './js/GameState';
import BattleScreen from './BattleScreen';

function Log({logData}) {
    
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
    };
    useEffect(scrollToBottom, [logData]);
    
    return (
        <div>
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
        <div class="cross-container align-center">
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
        if (data.game_over || confirm("Quit current game?\n(All progress made since the start of the floor will be lost)"))
        {
            setData(new GameState)
            quit()
        }
    }
    
    async function applyToData(method,params)
    {
        if (!data.game_over && !data.no_update) // once game is over, block all methods
        {
            let newdata = data.clone()
            await newdata[method](params);
            setData(newdata)
        }
    }

    useEffect(() => {
        let newdata = data.clone()
        const log_function = (str) => { setLog(prev => [...prev, str]); }
        newdata.log_ = log_function
        newdata.player.log_ = log_function
        setData(newdata)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let actionsScreen
    if (data.battle){
        actionsScreen = <BattleScreen data={data} apply={applyToData}/>
    }
    else{
        actionsScreen = <MovementWidget pos={data.pos} apply={applyToData}/>
    }

    let currentTileScreen = null
    if (!data.battle)
        switch (data.currentTile) {
            case TileTypes.TREASURE:
                currentTileScreen = null
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
            <div class='child flex-child'>
                <h2>ADVENTURE LOG</h2>
                <Log logData = {log}/>

                <div style={{display: 'flex', gap: '655px'}}>
                    <button type="button" onClick={() => quitWithoutSaving()} > {data.game_over ? "Quit to User Page" :"Quit Without Saving"} </button>
                    <button type="button" onClick={() => applyToData("endGameState")} > End Adventure </button>
                </div>
                
                <br/>
                <br/>
                    {actionsScreen}
                <br/>
                    {currentTileScreen}
                <br/>
            </div>
            <div class='child flex-child'>
                <h2>DUNGEON FLOOR {data.floor}</h2>
                <Minimap mapData={data.map_data} viewData={data.view_data}/>
                <PlayerInfo data={data.player}/>
            </div>
        </div>

        <br/>
        hello i am a placeholder here is my data from start screen: 
        <br/>
        <pre>{JSON.stringify(data,null,2)}</pre>
        <br/>
        </>
    );
}