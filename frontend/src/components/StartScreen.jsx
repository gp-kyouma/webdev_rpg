import { useState } from 'react';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import ScoresScreen from './ScoresScreen';
import { VerifyUser, VerifyGameData } from './verify';

export default function StartScreen({ confirm, setData }) {

    const [loggedIn, isLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

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

                <ScoresScreen/>

                <hr/>
            </div>
        </div>
    );
}