import './App.css'
import { Route } from 'react-router-dom'
import { Router } from './lib/electron-router-dom'

import MainLayout from './components/MainLayout'

import GameWorlds from './screens/GameWorlds'
import Sprites from './screens/Sprites'
import Tilemaps from './screens/Tilemaps'
import Music from './screens/Music'
import SoundEffects from './screens/SoundEffects'

function App() {
  
  return (
    <Router 
      main={
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<GameWorlds />} />
          <Route path="/sprites" element={<Sprites />} />
          <Route path="/tilemaps" element={<Tilemaps />} />
          <Route path="/music" element={<Music />} />
          <Route path="/sfx" element={<SoundEffects />} />
        </Route>
      }
    />
  )
}

export default App
