import { useState } from 'react';

function NewCharForm() {
    return (
        <>
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
        </>
    );
}

function LoginForm({setData, startGame, newGame}) {

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const formData = new FormData(e.target);

        // work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());

        setData(formJson)
        startGame()
    }

    let confirmText = "Load Character and Start Game"
    let charForm = null
    if (newGame){
        confirmText = "Create Character and Start Game"
        charForm = <NewCharForm/>
    }

    return (
        <>

        <hr></hr>
        <form method="post" onSubmit={handleSubmit}>

        <input name="username" type="text" placeholder="Username"/>
        <br/>
        <input name="password" type="password" placeholder="Password"/>
        <hr></hr>

        {charForm}

        <button type="submit">{confirmText}</button>

        </form>

        </>
    );
}

export default function StartScreen({ confirm, setData }) {

    const [newGame, isNewGame] = useState(true);

    return (
        <div class='parent flex-parent'>
            <div class='child flex-child'>
                <h2>WIP GAMING</h2>

                <button type="button" onClick={() => isNewGame(true)} >
                    New Game
                </button>

                <button type="button" onClick={() => isNewGame(false)} >
                    Load Game
                </button>

                <br/>

                <LoginForm setData={setData} startGame={() => confirm(true)} newGame={newGame}/>

                <hr/>
            </div>
        
            <div class='child flex-child'>
                [high score leaderboards will eventually go here]
            </div>
        </div>
    );
}