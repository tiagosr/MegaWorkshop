import { useState } from 'react'
import './App.css'
import GameWorlds from './screens/GameWorlds'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GameWorlds />
    </>
  )
}

export default App
