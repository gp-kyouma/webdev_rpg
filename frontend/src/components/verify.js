export function VerifyUser(userData, setData){
    // Verifies entered user data:
    // If username does not exist, create new user with username and password, alert user, and setData
    // If username exists but password does not match, alert user
    // If username exists and password matches, setData

    //TODO
    console.log("TODO VERIFY USER DATA")

    //placeholders for testing purposes, while database api isn't set yet
    if (userData.username == 'new')
    {
        alert("register ok branch")
        setData(userData)
        return true
    }
    
    if (userData.username == 'fail')
    {
        alert("wrong password branch")
        return false
    }

    alert("login ok branch")
    setData(userData)
    return true
}

export function VerifyGameData(gameData, setData){
    // Verifies game data
    // TODO

    //TODO
    console.log("TODO VERIFY GAME DATA")
    setData(gameData)
    return true
}