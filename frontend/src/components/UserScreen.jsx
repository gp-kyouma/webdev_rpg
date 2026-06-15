import { useState } from 'react';
import { VerifyCharData } from './js/verify';

function NewCharForm({setData, confirm, userID, isSubmitting, setIsSubmitting}) {

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

        if (await VerifyCharData(formJson, setData))
            confirm()
        else
            setbtnText(defaultBtnText)

        setIsSubmitting(false)
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

    // TODO: load user data (ongoing game, past scores)

    let NewCharScreen = <NewCharForm setData={setData} confirm={() => confirm(true)} userID={data.id} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting}/>
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