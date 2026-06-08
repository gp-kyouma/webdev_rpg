import { useState } from 'react';
import { VerifyGameData } from './verify';

function NewCharForm({setData, confirm, userID}) {

    async function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const formData = new FormData(e.target);

        // work with it as a plain object:
        let formJson = Object.fromEntries(formData.entries());

        // inject user id into the data that will be sent upwards
        formJson.user_id = userID

        if (await VerifyGameData(formJson, setData))
            confirm()
    }

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
            <label><input type="radio" name="class" value="warrior" defaultChecked={true} /> Warrior</label>
            <label><input type="radio" name="class" value="magician" /> Magician</label>
            <label><input type="radio" name="class" value="archer" /> Archer</label>
        </p>
        <hr />

        <button type="reset">Reset Character Data</button>
        <br/>
        <button type="submit">Create Character and Start Game</button>
        </form>

        </>
    );
}

export default function UserScreen({ data, confirm, logOut, setData }) {

    const [mode, setMode] = useState(0);

    // TODO: load user data (ongoing game, past scores)

    let NewCharScreen = <NewCharForm setData={setData} confirm={() => confirm(true)} userID={data.id}/>
    let LoadCharScreen = <p>TODO: Load Character and Start Game</p>
    let PastScoresScreen = <p>TODO: Table of Past Scores</p>

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
                <button type="button" onClick={() => logOut()} > Log Out </button>
            </h2>
            <hr/>

            <button type="button" onClick={() => setMode(0)} >
                Start New Game
            </button>

            <button type="button" onClick={() => setMode(1)} >
                Continue Game
            </button>

            <button type="button" onClick={() => setMode(2)} >
                Show Past Scores
            </button>

            <br/>

            {currentScreen}
        </>
    );
}