
import './App.css'

import { useState } from 'react'
import AfricaMap from './components/AfricaMap'
import ContinentStats from './components/ContinentStats'


function App() {

  return (
    <>
      <div>
        <ContinentStats/>
        <AfricaMap/>
      </div>

    </>
  )
}

export default App
