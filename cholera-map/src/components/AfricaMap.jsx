
import { useTooltip, useTooltipInPortal, TooltipWithBounds, withTooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import { Mercator } from '@visx/geo';
// import topology from "../public/whole_africa.json";
import topology from "../../public/whole_africa_simplified.json";
// import topology from "../public/countries.json";
import * as topojson from "topojson-client";

import {outbreaks} from "../../public/outbreaks.json"
// console.log("outbreaks:")
// console.log(outbreaks)

const africa = topojson.feature(topology, topology.objects.afr_g2014_2013_0);
// const africa = topojson.feature(topology, topology.objects.country_shps);




const scope = ['BEN', 'ETH', 'GHA', 'COG', 'CMR', 'MOZ', 'MWI', 'TZA', 'GIN', 'SOM', 'TCD', 'NER', 'TZA', 'CIV', 'NGA', 'ZWE', 'ZMB', 'COD', 'GNB', 'SLE', 'SSD', 'AGO', 'UGA', 'KEN', 'NAM', 'MLI']




function AfricaMap() {
  function handleMouseEnter(e, feature) {
    if (scope.includes(feature.properties.ISO3)) {
      e.target.style.fill = "#FFF";
    } else {
      return;
    }
    // console.log(e.target)
    let svg = e.target;
    let surroundingRect = svg.getBoundingClientRect();
    let center = [surroundingRect.left + surroundingRect.width / 2, surroundingRect.top + surroundingRect.height / 2]
    // console.log(`hovered on ${feature.properties.ADM0_NAME}`)
    let coords = [e.clientX, e.clientY]
    // console.log(coords)
    // console.log(center)
    console.log(feature)
    const ISO3 = feature.properties.ISO3;
    console.log(outbreaks[ISO3])

    document.getElementById("country-label").innerHTML = `
    <div>
      <h1>Country label</h1>
      <h2>${feature.properties.ADM0_NAME} (${ISO3})</h2>
      <h3>Population: 123</h3>
      <h3>Cholera cases: 123</h3>
      <h3>Cholera outbreaks: ${outbreaks[ISO3].length} </h3>
    </div>
    `
    
  }

  function handleMouseLeave(e, feature) {
    // console.log(e.target)
    if (scope.includes(feature.properties.ISO3)) {
      e.target.style.fill = "#fc2e1c"
    } else {
      e.target.style.fill = "#808080"
    }
    // e.target.style.fill = "#fc2e1c"
    // setTooltipData(null)
  }
  


  const width = 500;
  const height = 500;

  return (
    <>
      <div id="country-label"></div>
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
              {mercator.features.map(({ feature, path }, i) => (
                <>
                <path 
                  style={{cursor: scope.includes(feature.properties.ISO3) ? "#pointer" : "default"}}
                  key={`map-feature-${i}`} 
                  d={path || ""} 
                  // fill="#fc2e1c" 
                  fill={scope.includes(feature.properties.ISO3) ? "#fc2e1c" : "#808080"}
                  className="country"

                  onMouseEnter={(e) => handleMouseEnter(e, feature)}
                  onMouseLeave={(e) => handleMouseLeave(e, feature)}
                  // onMouseMove = {(e) => console.log("test")}
                  // onMouseOut = {() => hideTooltip()}
                  // onMouseEnter={(e) => {console.log("test"); changeColor(e)}}
                  // onMouseMove={() => e => this.handleMouseOverBar(e, feature)}
                  // onMouseOut={hideTooltip}
                  onClick={() => console.log(`clicked on ${feature.properties.ADM0_NAME}`)}
                  />
                  </>
              ))}
            </g>
          )}
        </Mercator>
      </svg>
        
    </>
  );

}

export default AfricaMap;