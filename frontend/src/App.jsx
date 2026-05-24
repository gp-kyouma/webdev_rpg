import { useState } from 'react'
import './App.css'

import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

function App() {
  const [gameReady, isGameReady] = useState(false);
  const [gameData, setGameData] = useState([]);
  
  let currentScreen = null;
  if (!gameReady){
      currentScreen = <StartScreen confirm={isGameReady} setStartData={setGameData}/>
  }
  else{
      currentScreen = <GameScreen data={gameData}/>
  }

  return (
    <>
      {currentScreen}
    </>
  )
}

export default App
