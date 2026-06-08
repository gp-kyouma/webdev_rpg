import * as db from './DatabaseCRUD';

export async function VerifyUser(userData, setData){
    // Verifies entered user data:
    // If username does not exist, create new user with username and password, alert user, and setData
    // If username exists but password does not match, alert user
    // If username exists and password matches, setData

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

    let user = await db._get('login-users', {username: userData.username});
    console.log(user)
    user = user[0]//because get returns an array

    if (!user)
    {
        //This should be its own button. Todo
        
        //create new user entry
        await db._create('login-users', userData);
        
        alert("New user registered!")

        //get user entry that was just created
        user = await db._get('login-users', {username: userData.username});
        user = user[0]

        setData(user)
        return true
    }
    
    if (userData.user_password === user.user_password)
    {
        setData(user)
        return true
    }
    else 
    {
        alert("Wrong password for user " + user.username)
        return false
    }
}

export function VerifyGameData(gameData, setData){
    // Verifies game data
    // TODO

    //TODO
    console.log("TODO VERIFY GAME DATA")
    setData(gameData)
    return true
}