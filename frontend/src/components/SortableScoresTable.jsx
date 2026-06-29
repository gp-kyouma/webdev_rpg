import { useState } from "react";

function SortableHeader({ onSort, label, classtype = '' }) {
  const [cor, setCor] = useState('black');

  return (
    <th 
        onMouseEnter={() => setCor('blue')} 
        onMouseLeave={() => setCor('black')}
        style={{ color: cor, fontWeight: 'bold' }}
        onClick={onSort} class={classtype}
        title={"Click to sort table by " + label}>
        {label}
    </th>
  );
}

export default function SortableScoresTable({scores, setScores}) {

    //can be improved upon if needed
    //but this is on the bottom of the priority list rn
    function onSort(key){
        
        const data = structuredClone(scores);
        data.sort((a,b) => b[key] - a[key])//descending

        setScores(data)
    }

    return (
        <>
            <table class='score-table'>
                <thead>
                    <tr>
                        <th class='edge-left'>Character Name</th>
                        <SortableHeader onSort={() => onSort('floor')} label="Floor"/>
                        <SortableHeader onSort={() => onSort('final_level')} label="Level"/>
                        <SortableHeader onSort={() => onSort('total_exp')} label="EXP"/>
                        <SortableHeader onSort={() => onSort('total_value')} label="Total gold value" classtype='edge-right'/>
                    </tr>
                </thead>
                <tbody>
                    {scores.map(function(score) {
                            return (
                            <tr key={score.id} data-item={score}>
                                <td data-title="Name" class='edge-left'>{score.char_name}</td>
                                <td data-title="Floor">{score.floor}</td>
                                <td data-title="Level">{score.final_level}</td>
                                <td data-title="EXP">{score.total_exp}</td>
                                <td data-title="Value" class='edge-right'>{score.total_value}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}