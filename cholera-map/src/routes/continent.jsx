
import './Continent.css'

import { useState } from 'react'
import AfricaMap from '../components/AfricaMap'
import ContinentStats from '../components/ContinentStats'



function Continent() {

  return (
    <>
      <div className="main">
        <ContinentStats/>
        <AfricaMap/>
      </div>

    </>
  )
}

export default Continent;
