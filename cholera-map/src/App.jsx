
import './App.css'

import { useState } from 'react'

import { useTooltip, useTooltipInPortal, TooltipWithBounds, withTooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import { Graticule, Mercator } from '@visx/geo';
// import topology from "../public/whole_africa.json";
import topology from "../public/whole_africa_simplified.json";
// import topology from "../public/countries.json";
import * as topojson from "topojson-client";

const africa = topojson.feature(topology, topology.objects.afr_g2014_2013_0);
// const africa = topojson.feature(topology, topology.objects.country_shps);

function tooltip ({ tooltipData }) {

  return (
    <div>
      <h1>{tooltipData}</h1>
    </div>
  )
}











function AfricaMap() {
  function handleMouseEnter(e, feature) {
    // console.log(e.target)
    e.target.style.fill = "#FFF"
    let svg = e.target;
    let surroundingRect = svg.getBoundingClientRect();
    let center = [surroundingRect.left + surroundingRect.width / 2, surroundingRect.top + surroundingRect.height / 2]
    console.log(`hovered on ${feature.properties.ADM0_NAME}`)
    let coords = [e.clientX, e.clientY]
    console.log(coords)
    console.log(center)
  
    setTooltipData([feature.properties.ADM0_NAME, center])
    
  }

  function handleMouseLeave(e) {
    // console.log(e.target)
    e.target.style.fill = "#fc2e1c"
    setTooltipData(null)
  }
  

  const [ tooltipData, setTooltipData ] = useState(null)

  const width = 500;
  const height = 500;

  return (
    <>
      <svg 
        height={height}
        width={width}
        >
        <Mercator
          data={africa.features}
          fitSize={[[width, height - 40], africa]}
        >
          {(mercator) => (
            <g width={width} height={height}>
              <Graticule graticule={g => mercator.path(g) || ""} />
              {mercator.features.map(({ feature, path }, i) => (
                <path 
                  key={`map-feature-${i}`} 
                  d={path || ""} 
                  fill="#fc2e1c" 

                  onMouseEnter={(e) => handleMouseEnter(e, feature)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  // onMouseMove = {(e) => console.log("test")}
                  // onMouseOut = {() => hideTooltip()}
                  // onMouseEnter={(e) => {console.log("test"); changeColor(e)}}
                  // onMouseMove={() => e => this.handleMouseOverBar(e, feature)}
                  // onMouseOut={hideTooltip}
                  onClick={() => console.log(`clicked on ${feature.properties.ADM0_NAME}`)}
                  />
              ))}
            </g>
          )}
        </Mercator>
      </svg>
      <div>
        <h1>Tooltip</h1>
        <h2>{tooltipData ? tooltipData[0] : "No tooltip"}</h2>
      </div>
    </>
  );

}


function App() {

  return (
    <>
      <div>
        <AfricaMap/>
      </div>

    </>
  )
}

export default App
