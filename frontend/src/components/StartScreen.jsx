import { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import { VerifyUser, VerifyGameData } from './verify';
import { DB_get } from './DatabaseCRUD';

export default function StartScreen({ confirm, setData }) {

    const [loggedIn, isLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const params = { user_id: 1 }//NOT working.
        DB_get('scores', params, setScores);
        //sort scores...? lets not worry abt that rn
    }, []);

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

                // placeholder, this will be a fancy sortable table eventually
                // but hey, it's loading data, that's something
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