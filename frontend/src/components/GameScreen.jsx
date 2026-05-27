import { useState } from 'react';

function MinimapSquare(data) {

    let classtype = "no-tile"

    // placeholder, testing all styles
    if (data == 0){
        classtype = "no-tile"
    }
    else if (data == 1){
        classtype = "unknown-tile"
        data = "?"
    }
    else{
        if ((data%10) < 5){
            classtype = "visited-tile-"
        }
        else{
            classtype = "current-tile-"
        }

        switch (data % 5) {
            case 0:
                classtype = classtype + "default"
                break;
            case 1:
                classtype = classtype + "treasure"
                break;
            case 2:
                classtype = classtype + "shop"
                break;
            case 3:
                classtype = classtype + "boss"
                break;
            case 4:
                classtype = classtype + "safe"
                break;
        }
    }

    return (
        <td class={classtype}>
            <div>{data}</div>
        </td>
    );
}

function Minimap({mapData, viewData}) {

    let data = []

    //fake data for testing
    for (let i = 0; i < 9; i++) {
        data[i] = []; // Initialize inner array for the row
        for (let j = 0; j < 9; j++) {
            data[i][j] = i*9+j;
        }
    }

    return (
        <div class='child flex-child'>
            <p></p>
            <table class="minimap-grid">
                {data.map(item => 
                    <tr>
                        {item.map(i => MinimapSquare(i))}
                    </tr>)}
            </table>
        </div>
    );
}

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

    function addToLog(newText) {
        setLog([...log, newText]);
    }

    return (
        <>
        <div class='parent flex-parent'>
            <Log logData = {log}/>
            <Minimap/>
        </div>

        <h2>
            hello i am a placeholder here is my data from start screen: 
            <br/>
            {JSON.stringify(data,null,2)}
        </h2>

        <button type="button" onClick={() => addToLog("new line")}>
            add line to log
        </button>
        </>
    );
}