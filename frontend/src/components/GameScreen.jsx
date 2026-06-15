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

    function addToLog(newText) {
        setLog([...log, newText]);
    }

    // none of the following works. that is a problem for tomorrow (today) me. goodnight
    async function executeFunctionByName(functionName, context , argswy) {
        var args = Array.prototype.slice.call(argswy, 2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return await context[func].apply(context, args);
    }
    
    async function applyToData(method,params)
    {
        let newdata = structuredClone(data)
        await executeFunctionByName(method,newdata,params)//[newdata][method](params); //NO WAY THIS WORKS. NOOOOO FUCKING WAY
        setData(newdata)
    }

    ///*
    useEffect(() => {
        applyToData("setLogFunction",addToLog);
    }, []);
    //*/

    return (
        <>
        <div class='parent flex-parent'>
            <Log logData = {log}/>
            <Minimap mapData={data.map_data} viewData={data.view_data}/>
        </div>

            hello i am a placeholder here is my data from start screen: 
            <br/>
            <pre>{JSON.stringify(data,null,2)}</pre>
            <br/>

            <button type="button" onClick={() => quit()} > Save and Quit </button>

            <br/>//this is a lie currently, theres nothing to save. 
            <br/>//also should alert user that the save is for the floor start

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