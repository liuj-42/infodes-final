
import { useTooltip, useTooltipInPortal, TooltipWithBounds, withTooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';

import { Fragment } from 'react';
import { Zoom } from '@visx/zoom';
import { Mercator } from '@visx/geo';
// import topology from "../public/whole_africa.json";
// import topology from "../../public/whole_africa_simplified.json";
import topology from "../assets/whole_africa_simplified.json";
// import topology from "../public/countries.json";
import * as topojson from "topojson-client";

import {outbreaks} from "../../public/outbreaks.json"
// console.log("outbreaks:")
// console.log(outbreaks)

const africa = topojson.feature(topology, topology.objects.afr_g2014_2013_0);
// const africa = topojson.feature(topology, topology.objects.country_shps);


import "./AfricaMap.css";



const scope = ['BEN', 'ETH', 'GHA', 'COG', 'CMR', 'MOZ', 'MWI', 'TZA', 'GIN', 'SOM', 'TCD', 'NER', 'TZA', 'CIV', 'NGA', 'ZWE', 'ZMB', 'COD', 'GNB', 'SLE', 'SSD', 'AGO', 'UGA', 'KEN', 'NAM', 'MLI']

const convertVhToPx = (vh=50) => {
  const oneVhInPx = window.innerHeight / 100;
  return oneVhInPx * vh;
};

const convertVwToPx = (vw=50) => {
  const oneVhInPx = window.innerWidth / 100;
  return oneVhInPx * vw;
};


function AfricaMap() {
  function handleMouseEnter(e, feature) {
    if (scope.includes(feature.properties.ISO3)) {
      e.target.style.fill = "#FFF";
    } else {
      return;
    }

    console.log(feature)
    const ISO3 = feature.properties.ISO3;
    console.log(outbreaks[ISO3])

    document.getElementById("country-label").innerHTML = `
    <div>
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

  const width = 40 * convertVwToPx(100) / 100;
  const height = 1.25 * width;


  return (
    <>
      <Zoom
        width={width}
        height={height}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        style={{"border": "1px solid red"}}
      >
        {zoom => (
          <div 
            width={width}
            height={height}
            id="africa-map"
            >
            <svg 
              height={height} 
              width={width}
              style={{ cursor: zoom.isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
              ref={zoom.containerRef}
            >
              <Mercator
                data={africa.features}
                fitSize={[[width, height - 40], africa]}
              >
                {(mercator) => (
                  <g width={width} height={height} transform={zoom.toString()}>
                    {mercator.features.map(({ feature, path }, i) => (
                      <Fragment key={`map-feature-${i}`}>
                        <path
                          style={{
                            cursor: scope.includes(feature.properties.ISO3)
                              ? "#pointer"
                              : "default",
                          }}
                          d={path || ""}
                          // fill="#fc2e1c"
                          fill={
                            scope.includes(feature.properties.ISO3)
                              ? "#fc2e1c"
                              : "#808080"
                          }
                          className="country"
                          id={`countryshape-${feature.properties.ISO3}`}
                          onMouseEnter={(e) => handleMouseEnter(e, feature)}
                          onMouseLeave={(e) => handleMouseLeave(e, feature)}
                          onClick={() =>
                            console.log(
                              `clicked on ${feature.properties.ADM0_NAME}`
                            )
                          }
                        />
                      </Fragment>
                    ))}
                  </g>
                )}
              </Mercator>
            </svg> 
          </div>
        )}

      </Zoom>
    </>
  );

}

export default AfricaMap;