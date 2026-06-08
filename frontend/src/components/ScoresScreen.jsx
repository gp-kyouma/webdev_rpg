import { useState, useEffect } from 'react';
import * as db from './js/DatabaseCRUD';

export default function ScoresScreen() {

    const [scores, setScores] = useState([]);

    async function getScores() {
        const data = await db._get('scores', {});
        setScores(data);
    };

    useEffect(() => {
        const fetchScores = async () => { await getScores(); };
        fetchScores();
    }, []);

    return (
        <>
            <hr/>

            // this should be a pretty table. todo.<br/>
            // this component is mostly todo actually<br/>
            // sortable tables etc<br/>

            {scores.map(score => (
                <div key={score.id} class="">
                    <p class="">
                        <strong>Name:</strong> {score.char_name} | <strong>Floor:</strong> {score.floor} | <strong>EXP:</strong> {score.total_exp} | <strong>Total gold value:</strong> {score.total_value}
                    </p>
                </div>
                ))
            }
        </>
    );
}