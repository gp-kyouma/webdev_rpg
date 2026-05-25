import { useState } from 'react';

function MinimapSquare(data) {

    //placeholder testing
    let classtype = "no-tile"

    if (data % 2){
        classtype = "unknown-tile"
    }

    return (
        <td class={classtype}>
            <div>{data}</div>
        </td>
    );
}

function Minimap(mapData, viewData) {

    let data = [[1,2,3],[4,5,6],[7,8,9]]

    return (
        <table class="minimap-grid">
            {data.map(item => 
                <tr>
                    {item.map(i => MinimapSquare(i))}
                </tr>)}
        </table>
    );
}

export default function GameScreen({data}) {

    return (
        <>
        <h2>
            hello i am a placeholder here is my data: 
            {JSON.stringify(data,null,2)}
        </h2>
        <Minimap/>
        </>
    );
}