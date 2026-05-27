import { useState } from 'react';

import { TileTypes } from './MapUtils';

function MinimapSquare(data) {

    let classtype = "current-tile-" // currently ignoring the visibility part. don't forget.
    let label = ""

    switch (data) {
        case TileTypes.NONE:
            classtype = "no-tile"
            break;
    
        case TileTypes.DEFAULT:
            classtype = classtype + "default"
            break;

        case TileTypes.START:
            classtype = classtype + "safe"
            label = "start"
            break;

        case TileTypes.TREASURE:
            classtype = classtype + "treasure"
            label = "chst"
            break;

        case TileTypes.SHOP:
            classtype = classtype + "shop"
            label = "shop"
            break;

        case TileTypes.BOSS:
            classtype = classtype + "boss"
            label = "boss"
            break;
    }
    
    /*
    //shh.
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
    */

    return (
        <td class={classtype}>
            <div>{label}</div>
        </td>
    );
}

export default function Minimap({mapData, viewData}) {

    return (
        <div class='child flex-child'>
            <p></p>
            <table class="minimap-grid">
                {mapData.map(item => 
                    <tr>
                        {item.map(i => MinimapSquare(i))}
                    </tr>)}
            </table>
        </div>
    );
}