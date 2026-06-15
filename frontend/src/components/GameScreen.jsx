import { useState, useEffect, useRef } from 'react';

import Minimap from './Minimap';

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

export default function GameScreen({data, setData, quit}) {

    const [log, setLog] = useState([]);

    function addToLog(newText) {
        setLog([...log, newText]);
    }

    function quitWithoutSaving(){
        if (confirm("Quit current game?\n(All progress made since the start of the floor will be lost)"))
            quit()
    }
    
    //IT WORKS HAHAHAHAHAHAHA
    async function applyToData(method,params,logTrue="",logFalse="")
    {
        let newdata = data.clone()//pls
        const ret = await newdata[method](params);
        if (typeof ret !== "undefined")
        {
            if (logTrue && ret)
                addToLog(logTrue)
            else if (logFalse && !ret)
                addToLog(logFalse)
        }
        setData(newdata)
    }

    //log_ attribute is just not gonna happen i think
    /*
    useEffect(() => {
        let newdata = data.clone()//pls
        //newdata.log_ = (str) => addToLog(str)
        setData(newdata)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    */

    return (
        <>
        <div class='parent flex-parent'>
            <Log logData = {log}/>
            <Minimap mapData={data.map_data} viewData={data.view_data}/>
        </div>

        <button type="button" onClick={() => quitWithoutSaving()} > Quit Without Saving </button>
        
        <br/><br/>

        <div class="cross-container">
            <button class="btn btn-top" type="button" onClick={() => applyToData("movePlayer",'N',"You moved north.")}>N</button>
            <br/>
            <button class="btn btn-left" type="button" onClick={() => applyToData("movePlayer",'W',"You moved west.")}>W</button>
            <p class="btn-text btn-middle">
                {data.pos[0]}, {data.pos[1]}
            </p>
            <button class="btn btn-right" type="button" onClick={() => applyToData("movePlayer",'E',"You moved east.")}>E</button>
            <br/>
            <button class="btn btn-bottom" type="button" onClick={() => applyToData("movePlayer",'S',"You moved south.")}>S</button>
        </div>

        <br/>

        <br/>
        hello i am a placeholder here is my data from start screen: 
        <br/>
        <pre>{JSON.stringify(data,null,2)}</pre>
        <br/>
        </>
    );
}