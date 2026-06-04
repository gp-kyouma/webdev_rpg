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
        //SORT IS FREE, THANK YOU STACK OVERFLOW YII WIZARDS
        //...although it's not being used here atp,
        //sorting by multiple params is being done directly in ScoresSearch.php
        return db._get('scores', {});
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

    //SOME STUFF TO TEST DB MANIPULATION, REMOVE LATER
    const [count, setCount] = useState(1);
    function makeScore(){

        const date = new Date(); // Current date/time

        // Format: 'YYYY-MM-DDTHH:mm:ss.sssZ' -> 'YYYY-MM-DD HH:mm:ss'
        const sqlTimestamp = date.toISOString().slice(0, 19).replace('T', ' ');

        console.log(sqlTimestamp);

        let score = {   user_id : 2, 
                        gameover_time : sqlTimestamp, 
                        char_name: "Poopyhead #" + count, 
                        floor: 4, 
                        total_exp: count * 5, 
                        final_level: 67, 
                        total_value: count * 100}

        setCount(count => count + 1)
        return score
    }
    function addScore(){
        db._create('scores',makeScore())
        getScores()
    }
    function updateScore(){
        db._update('scores',{id: 3},makeScore())
        getScores()
    }
    function removeScore(){
        db._delete('scores',{id: 2})
        getScores()
    }

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
                //DB TESTS<br/>
                <button type="button" onClick={() => addScore()} > Add Score </button><br/>
                <button type="button" onClick={() => updateScore()} > Update Score NOT WORKING </button><br/>
                <button type="button" onClick={() => removeScore()} > Remove Score NOT WORKING </button><br/>
                count:{count}
            </div>
        </div>
    );
}