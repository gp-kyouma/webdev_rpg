import { useState, useEffect } from 'react';
import { VerifyCharData } from './js/verify';

import * as db from './js/DatabaseCRUD';
import GameState from './js/GameState';

import SortableScoresTable from './SortableScoresTable';

function UserScoresScreen({scores, setScores}) {

    let scoretable
    if (scores.length === 0)
    {
        scoretable = <p>(No past scores found!)</p>
    }
    else
    {
        scoretable = <SortableScoresTable scores={scores} setScores={setScores}/>
    }

    return (
        <>
            <hr />
            {scoretable}
        </>
    );
}

function LoadGameScreen({ongame, setData, confirm, isSubmitting, setIsSubmitting}) {

    const defaultBtnText = "Load Character and Continue Game"
    const [btnText, setbtnText] = useState(defaultBtnText);
    
    async function loadGame() {
        setbtnText("Loading...")
        setIsSubmitting(true)

        let newChar = new GameState
        await newChar.loadGameState(ongame)
        setData(newChar)
        confirm()

        setbtnText(defaultBtnText)
        setIsSubmitting(false)
    }

    let loadscreen
    if (ongame)
    {
        //show some game data
        loadscreen = <>
        Character name: {ongame.char_name}
        <br/>
        Class (ID): {ongame.class_id} //remove this later bru
        <br/>
        Current HP: {ongame.current_hp} / {ongame.max_hp}
        <br/>
        Current floor: {ongame.floor}
        <br/>
        todo put more info here?
        <hr />
        <button type="button" onClick={() => loadGame()} disabled={isSubmitting}> {btnText} </button>
        </>
    }
    else
    {
        loadscreen = <p>(No ongoing game found!)</p>
    }

    return (
        <>
        <hr />

        {loadscreen}

        </>
    );
}

function NewCharForm({ongame, setData, confirm, userID, isSubmitting, setIsSubmitting}) {

    const defaultBtnText = "Create Character and Start Game"
    const [btnText, setbtnText] = useState(defaultBtnText);
    
    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const formData = new FormData(e.target);

        // work with it as a plain object:
        let formJson = Object.fromEntries(formData.entries());

        // inject user id into the data that will be sent upwards
        formJson.user_id = userID

        setbtnText("Creating...")
        setIsSubmitting(true)

        if (await VerifyCharData(formJson, setData, ongame))
            confirm()
        else
            setbtnText(defaultBtnText)

        setIsSubmitting(false)
    }

    //TODO: SHOW CLASS INFO WHEN SELECTED
    //ClassBanner(?) component
    //on click radio button: search (preloaded) list of classes
    //find the entry with handle=value
    //and set state (which is input for ClassBanner)
    //hmm.

    return (
        <>

        <hr></hr>
        <form method="post" onSubmit={handleSubmit}>

        <label>
            Character name: <input name="name" />
        </label>
        <hr />

        <p>
            Class:
            <label><input type="radio" name="class" value="CLASS_WARRIOR" defaultChecked={true} /> Warrior </label>
            <label><input type="radio" name="class" value="CLASS_MAGICIAN" /> Magician </label>
            <label><input type="radio" name="class" value="CLASS_THIEF" /> Thief </label>
        </p>
        <hr />

        <button type="reset" disabled={isSubmitting}>Reset Character Data</button>
        <br/>
        <button type="submit" disabled={isSubmitting}>{btnText}</button>
        </form>

        </>
    );
}

export default function UserScreen({ data, confirm, logOut, setData }) {

    const [mode, setMode] = useState(0);

    const [isSubmitting, setIsSubmitting] = useState(false);

    // load user data (ongoing game, past scores)
    const [ongoingGame, setOngoingGame] = useState(null);
    const [userScores, setUserScores] = useState([]);
    
    async function getOngoingGame() {
        let ongame = await db._get('game-states',{user_id: data.id})
        ongame = ongame[0]//because get returns an array
        if (ongame)
        {
            setOngoingGame(ongame);
        }
    };

    async function getUserScores() {
        const scoredata = await db._get('scores', {user_id: data.id});
        setUserScores(scoredata);
    };

    useEffect(() => {
        const fetchOngoingGame = async () => { await getOngoingGame(); };
        fetchOngoingGame();

        const fetchUserScores = async () => { await getUserScores(); };
        fetchUserScores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let NewCharScreen = <NewCharForm setData={setData} confirm={() => confirm(true)} userID={data.id} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} ongame={ongoingGame}/>
    let LoadCharScreen = <LoadGameScreen setData={setData} confirm={() => confirm(true)} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} ongame={ongoingGame}/>
    let PastScoresScreen = <UserScoresScreen scores={userScores} setScores={setUserScores}/>

    let currentScreen;
    switch (mode) {
        case 0:
            currentScreen = NewCharScreen
            break;
    
        case 1:
            currentScreen = LoadCharScreen
            break;

        case 2:
            currentScreen = PastScoresScreen
            break;
    }

    return (
        <>
            <h2>
                Welcome, {data.username}!
                <br/>
                <button type="button" onClick={() => logOut()} disabled={isSubmitting}> Log Out </button>
            </h2>
            <hr/>

            <button type="button" onClick={() => setMode(0)} disabled={isSubmitting}>
                Start New Game
            </button>

            <button type="button" onClick={() => setMode(1)} disabled={isSubmitting}>
                Continue Game
            </button>

            <button type="button" onClick={() => setMode(2)} disabled={isSubmitting}>
                Show Past Scores
            </button>

            <br/>

            {currentScreen}
        </>
    );
}