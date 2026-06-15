import { useState, useEffect } from 'react';
import * as db from './js/DatabaseCRUD';

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

export default function ScoresScreen() {

    const [scores, setScores] = useState([]);

    async function getScores() {
        const data = await db._get('scores', {});
        setScores(data);
    };

    function onSort(key){
        
        const data = structuredClone(scores);
        data.sort((a,b) => b[key] - a[key])//descending

        setScores(data)
    }

    useEffect(() => {
        const fetchScores = async () => { await getScores(); };
        fetchScores();
    }, []);

    return (
        <>
            <hr/>
            <table class='score-table'>
                <thead>
                    <tr>
                        <th class='edge-left'>Character Name</th>
                        <SortableHeader onSort={() => onSort('floor')} label="Floor"/>
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