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

    //LOG_ IS WORKING LOG_ IS WORKING GET HYPE
    useEffect(() => {
        let newdata = data.clone()
        newdata.log_ = (str) => { setLog(prev => [...prev, str]); }
        setData(newdata)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        <div class='parent flex-parent'>
            <Log logData = {log}/>
            <Minimap mapData={data.map_data} viewData={data.view_data}/>
        </div>

        <button type="button" onClick={() => quitWithoutSaving()} > Quit Without Saving </button>
        
        <br/><br/>

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

        <br/>
        hello i am a placeholder here is my data from start screen: 
        <br/>
        <pre>{JSON.stringify(data,null,2)}</pre>
        <br/>
        </>
    );
}