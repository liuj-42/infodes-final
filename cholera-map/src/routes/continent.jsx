
import './Continent.css'
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
