import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { useState } from "react";
import geojsonData from "../assets/afr_g2014_2013_0.json";
import { useNavigate } from 'react-router-dom';
import ExponentialLegend from "./ExponentialLegend";
const scope = [
  "BEN",
  "ETH",
  "GHA",
  "COG",
  "CMR",
  "MOZ",
  "MWI",
  "TZA",
  "GIN",
  "SOM",
  "TCD",
  "NER",
  "TZA",
  "CIV",
  "NGA",
  "ZWE",
  "ZMB",
  "COD",
  "GNB",
  "SLE",
  "SSD",
  "AGO",
  "UGA",
  "KEN",
  "NAM",
  "MLI",
];

// import { outbreaks } from "../../public/outbreaks.json";

import { useAtom } from "jotai";
import { outbreakAtom } from "../state/state";

import "./AfricaMap.css";
// #f3e79b,#fac484,#f8a07e,#eb7f86,#ce6693,#a059a0,#5c53a5
const colors = [
  [243, 231, 155],
  [250, 196, 132],
  [248, 160, 126],
  [235, 127, 134],
  [206, 102, 147],
  [160, 89, 160],
  [92, 83, 165],
];




function AfricaMap() {
  const [ outbreaks, ] = useAtom(outbreakAtom);
  const [hoverInfo, setHoverInfo] = useState(null);
  const navigate = useNavigate();
  

  const maxOutbreaks = Math.max(...Object.values(outbreaks).map((outbreaks) => outbreaks.length));


  // we follow an exponential scale for the colors
  function getColor(numCases) {
    const a = Math.sqrt(maxOutbreaks + 1);
    const b = Math.sqrt(numCases);
    return colors[Math.floor(b / a * 7)];
  }


  const layer = new GeoJsonLayer({
    id: "GeoJsonLayer",
    data: geojsonData,
    stroked: true,
    filled: true,
    pickable: true,
    getFillColor: (f) => {
      // Use the feature's properties to generate a color
      if (scope.includes(f.properties.ISO3)) {
        // scale the colors based on number of total outbreaks
        const totalOutbreaks = outbreaks[f.properties.ISO3].length;
        return getColor(totalOutbreaks);
        // return [255, 255, 255];
      } else {
        // return [58, 59, 60]
        return [204, 204, 204];
      }
    },
    getLineColor: [128, 128, 128],
    lineWidthMinPixels: 1,
    onHover: (info) => setHoverInfo(info),
    onClick: (info) => (scope.includes(info.object.properties.ISO3) ? navigate(`/countries/${info.object.properties.ISO3}`) : null),
  });

  const hoverLayer =
    hoverInfo?.object &&
    new GeoJsonLayer({
      id: "HoverLayer",
      data: hoverInfo.object,
      stroked: true,
      filled: false,
      getLineColor: [58, 59, 60],
      lineWidthMinPixels: 2,
    });

  const INITIAL_VIEW_STATE = {
    longitude: 17.6,
    latitude: -1.3,
    zoom: 2.5,
    pitch: 0,
    bearing: 0,
  };

  return (
    <div>
      <div 
        id="map-container"
      >
        <DeckGL
          width="50%"
          height="100%"
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          layers={[layer, hoverLayer].filter(Boolean)}
          container="map-container"
          style={{ position: "absolute", left: "45vw", "border": "1px solid red"}}
        />
        {hoverInfo && hoverInfo.object && (
          <div
            style={{
              position: "absolute",
              zIndex: 1,
              marginLeft: "45vw",
              pointerEvents: "none",
              left: hoverInfo.x,
              top: hoverInfo.y,
            }}
          >
            <div
              className="tooltip"
            >
              <h2>
                {hoverInfo.object.properties.ADM0_NAME} (
                {hoverInfo.object.properties.ISO3})
              </h2>
              {scope.includes(hoverInfo.object.properties.ISO3) ? (
                <>
                  <h3>Population: 123</h3>
                  <h3>Cholera cases: 123</h3>
                  <h3>
                    Cholera outbreaks:{" "}
                    {outbreaks[hoverInfo.object.properties.ISO3].length}{" "}
                  </h3>
                </>
              ) : (
                <>
                  <h3>No data available</h3>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      { }
      <ExponentialLegend colors={colors} max={maxOutbreaks} units="outbreaks" />
    </div>
  );
}

export default AfricaMap;
