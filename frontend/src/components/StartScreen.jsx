import { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import { VerifyUser, VerifyGameData } from './verify';
import * as db from './DatabaseCRUD';

export default function StartScreen({ confirm, setData }) {

    const [loggedIn, isLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    
    const [scores, setScores] = useState([]);

    function sortedScores() {
        const params = { sort:'-floor,-total_exp,-total_value' }//SORT IS FREE, THANK YOU STACK OVERFLOW YII WIZARDS
        return db._get('scores', params);
    }

    async function getScores() {
        const data = await sortedScores()
        await setScores(data);
    };

    // wrangling React into working like a real programming language where things happen synchronously:
    useEffect(() => {
        const fetchScores = async () => { await getScores(); };
        fetchScores();
    });

    let currentScreen;
    if (!loggedIn){
        currentScreen = <LoginScreen confirm={isLoggedIn} setData={(data) => VerifyUser(data, setUserData)}/>
    }
    else{
        currentScreen = <UserScreen data={userData} confirm={confirm} setData={(data) => VerifyGameData(data, setData)}/>
    }

    return (
        <div class='parent flex-parent'>
            <div class='child flex-child'>
                <h2>WIP GAMING</h2>

                {currentScreen}

                <hr/>
            </div>
        
            <div class='child flex-child'>
                <h2>LEADERBOARDS</h2>
                <hr/>

                {scores.map(score => (
                    <div key={score.id} class="">
                        <p class="">
                            <strong>Name:</strong> {score.char_name} | <strong>Floor:</strong> {score.floor} | <strong>EXP:</strong> {score.total_exp} | <strong>Total gold value:</strong> {score.total_value}
                        </p>
                    </div>
                    ))
                }

                <hr/>
            </div>
        </div>
    );
}