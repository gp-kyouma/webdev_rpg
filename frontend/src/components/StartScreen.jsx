import { useState } from 'react';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';
import ScoresScreen from './ScoresScreen';

export default function StartScreen({ confirm, setData }) {

    const [loggedIn, isLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});

    let currentScreen;
    if (!loggedIn){
        currentScreen = <LoginScreen    confirm={isLoggedIn}
                                        setData={setUserData}/>
    }
    else{
        currentScreen = <UserScreen data={userData} 
                                    confirm={confirm} 
                                    logOut={() => isLoggedIn(false)} 
                                    setData={setData}/>
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