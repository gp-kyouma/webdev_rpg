import { useState } from 'react';

function TextField({ placeholder, data, setData }) {

    const handleChange = (e) => {
        setData(e.target.value);
    };

    return (
        <input type="text" placeholder={placeholder} value={data} onChange={handleChange} />
    );
}

function PasswordField({ placeholder, data, setData }) {

    const handleChange = (e) => {
        setData(e.target.value);
    };

    return (
        <input type="password" placeholder={placeholder} value={data} onChange={handleChange} />
    );
}

//new char fields...

export default function StartScreen({ confirm, setStartData }) {

    const [newGame, isNewGame] = useState(false);

    const [loginData,       setLoginData]       = useState("");
    const [passwordData,    setPasswordData]    = useState("");

    let newCharInput = null;
    if (newGame){
        newCharInput = <p>{passwordData} placeholder gaming</p>
    }

    function handleStart() {
        //check data check if login exists etc
        setStartData(loginData)
        confirm(true)
    }

    return (
        <>
        <h2>title?</h2>

        <button type="button" onClick={() => isNewGame(true)} >
            New Game
        </button>

        <button type="button" onClick={() => isNewGame(false)} >
            Load Game
        </button>

        <br></br>
        <br></br>
        
        <TextField      placeholder="Login"      data={loginData}    setData={setLoginData}/>
        <br></br>
        <PasswordField  placeholder="Password"   data={passwordData} setData={setPasswordData}/>

        <br></br>

        {newCharInput}

        <br></br>

        <button type="button" onClick={handleStart} >
            Start Game
        </button>

        <hr></hr>
        </>
    );
}