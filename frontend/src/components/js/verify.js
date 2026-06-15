import * as db from './DatabaseCRUD';
import { GameState } from './GameState';

function UserDataOK(userData){
    // Username is empty!
    if (!userData.username || userData.username.trim().length === 0)
    {
        alert("Username is empty!")
        return false
    }
    // Password is empty!
    if (!userData.user_password || userData.user_password.trim().length === 0)
    {
        alert("Password is empty!")
        return false
    }
    return true
}

export async function RegisterUser(userData){
    // Verifies entered user data (for register):
    // If username exists, alert user
    // If username does not exist, create new user with username and password and alert user

    if (!UserDataOK(userData))
        return false

    let user = await db._get('login-users', {username: userData.username});
    user = user[0]//because get returns an array

    if (!user)
    {
        //create new user entry
        await db._create('login-users', userData);
        
        alert("New user \"" + userData.username + "\" registered!")
    }
    else 
    {
        alert("User \"" + userData.username + "\" already exists!")
    }
}

export async function VerifyUser(userData, setData){
    // Verifies entered user data (for login):
    // If username does not exist, alert user
    // If username exists but password does not match, alert user
    // If username exists and password matches, setData

    if (!UserDataOK(userData))
    {
        return false
    }

    let user = await db._get('login-users', {username: userData.username});
    user = user[0]//because get returns an array

    if (!user)
    {
        alert("User \"" + userData.username + "\" does not exist!")
        return false
    }
    if (userData.user_password === user.user_password)
    {
        setData(user)
        return true
    }
    else 
    {
        alert("Wrong password for user \"" + user.username + "\"!")
        return false
    }
}

export async function VerifyCharData(charData, setData){
    // Verifies new character data
    // If character name is empty, alert user
    // If character name is too long, alert user

    if (!charData.name || charData.name.trim().length === 0)
    {
        alert("Character name cannot be empty!")
        return false
    }

    charData.name = charData.name.trim()

    if (charData.name.length > 30)
    {
        alert("Character name is too long!")
        return false
    }

    // Check if selected class exists in database
    //TODO

    let newChar = new GameState
    await newChar.startGameState(charData)
    setData(newChar)
    return true
}