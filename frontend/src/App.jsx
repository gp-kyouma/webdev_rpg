import { useState } from 'react'
import './App.css'

import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

function App() {

  const [loggedIn, isLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  
  const [gameReady, isGameReady] = useState(false);
  const [gameData, setGameData] = useState({});
  
  let currentScreen;
  if (!gameReady){
      currentScreen = <StartScreen  confirm={isGameReady} setData={setGameData}
                                    loggedIn={loggedIn}   isLoggedIn={isLoggedIn}
                                    userData={userData}   setUserData={setUserData}/>
  }
  else{
      currentScreen = <GameScreen data={gameData} setData={setGameData}
                                  quit={() => isGameReady(false)}/>
  }

  return (
    <>
      {currentScreen}
    </>
  )
}

export default App
