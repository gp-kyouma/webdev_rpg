import { TileTypes, EmptyMap, MapWidth, MapHeight } from './js/MapUtils';

function MinimapSquare(data) {

    let [mapdata, viewdata] = data
    
    let classtype = ""
    let label = ""
    let skip = false

    switch (mapdata) {
        case TileTypes.NONE:
            classtype = "no-tile"
            skip = true
            break;
        
        case TileTypes.DEFAULT:
            classtype = "default"
            break;

        case TileTypes.START:
            classtype = "safe"
            label = "start"
            break;

        case TileTypes.TREASURE:
            classtype = "treasure"
            label = "chst"
            break;

        case TileTypes.SHOP:
            classtype = "shop"
            label = "shop"
            break;

        case TileTypes.BOSS:
            classtype = "boss"
            label = "boss"
            break;
    }

    if (!skip){
        switch (viewdata) {
            case TileTypes.NONE://redundant but keep it anyways
                classtype = "no-tile"
                break;
        
            case TileTypes.UNKNOWN:
                classtype = "unknown-tile"
                label = "?"
                break;

            case TileTypes.VISITED:
                classtype = "visited-tile-" + classtype
                break;

            case TileTypes.CURRENT:
                classtype = "current-tile-" + classtype
                label = "^_^"
                break;
        }
    }

    return (
        <td class={classtype}>
            <div>{label}</div>
        </td>
    );
}

export default function Minimap({mapData, viewData}) {

    // for all xy, data[xy] = [mapdata[xy], viewdata[xy]]
    // daí não precisa embutir visibilidade diretamente dentro de mapdata, dá pra juntar aqui

    let data = EmptyMap()
    for (let i = 0; i < MapHeight; i++) {
        for (let j = 0; j < MapWidth; j++) {
            data[i][j] = [mapData[i][j], viewData[i][j]];
        }
    }
    
    return (
        <div>
            <p></p>
            <table class="minimap-grid">
                <tbody>
                    {data.map(item => 
                        <tr>
                            {item.map(i => MinimapSquare(i))}
                        </tr>)}
                </tbody>
            </table>
        </div>
    );
}