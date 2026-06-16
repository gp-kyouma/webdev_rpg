import { useState, useEffect } from 'react';
import * as db from './js/DatabaseCRUD';

import SortableScoresTable from './SortableScoresTable';

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
            <SortableScoresTable scores={scores} setScores={setScores}/>
        </>
    );
}