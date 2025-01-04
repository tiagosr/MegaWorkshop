import './App.css'
import GameWorlds from './screens/GameWorlds'
import Sprites from './screens/Sprites'
import { Route } from 'react-router-dom'
import { Router } from './lib/electron-router-dom'
import MainLayout from './components/MainLayout'

function App() {
  
  return (
    <Router 
      main={
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<GameWorlds />} />
          <Route path="/sprites" element={<Sprites />} />
        </Route>
      }
    />
  )
}

export default App
