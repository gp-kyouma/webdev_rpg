import { useState } from 'react';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import { VerifyUser, VerifyGameData } from './verify';

export default function StartScreen({ confirm, setData }) {

    const [loggedIn, isLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    //TODO: load high scores and show on the side panel

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
                [high score leaderboards will eventually go here]
            </div>
        </div>
    );
}