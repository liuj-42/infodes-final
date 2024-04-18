
import { useLocation, useNavigate} from 'react-router-dom';

import DeckGL from "@deck.gl/react";
import { GeoJsonLayer, ScatterplotLayer } from "@deck.gl/layers";
import { useState } from "react";
import geojsonData from "../assets/afr_g2014_2013_0.json";

import * as turf from "@turf/turf"

import outbreaks from "../../public/outbreaks.json";


// #fcde9c,#faa476,#f0746e,#e34f6f,#dc3977,#b9257a,#7c1d6f
const colors = [
  [252,222,156],
  [250,164,118],
  [240,116,110],
  [227,79,111],
  [220,57,119],
  [185,37,122],
  [124,29,111],
];



function Countries() {
  const navigate = useNavigate();

  let location = useLocation();

  let country = location.pathname.split("/")[2];
  const countryOutbreaks = outbreaks["outbreaks"][country]
  console.log(countryOutbreaks)

  let maxCases = Math.max(...countryOutbreaks.map((d) => d.total_suspected_cases));

  // every 70 cases we go up a color
  function getColor(numCases) {
    // console.log(numCases)
    // console.log(colors[Math.floor(numCases/400)])
    return colors[Math.floor(numCases / Math.ceil(maxCases/7))];
  }


  // parse geojson file to get only the country that matches the country code
  const countryGeoJson = geojsonData.features.filter((feature) => feature.properties.ISO3 === country)[0];

  const centroid = turf.centroid(countryGeoJson);
  const [longitude, latitude] = centroid.geometry.coordinates;


  // #e4f1e1,#b4d9cc,#89c0b6,#63a6a0,#448c8a,#287274,#0d585f

  console.log(country)
  const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: countryGeoJson,
    pickable: true,
    stroked: true,
    filled: true,
    // getFillColor: [235, 127, 134],
    getFillColor: [68, 140, 138],
    
  });

  const points = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data: countryOutbreaks,
    pickable: true,
    opacity: 0.5,
    // stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 5,
    // radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => [d.longitude, d.latitude],
    getRadius: d => d.total_suspected_cases * 10,
    getFillColor: d => getColor(d.total_suspected_cases),
    onClick: (info) => {
      console.log(info.object.total_suspected_cases)
      console.log(info)
    },
    
    
  });


  return (
    <div>
      <h1>Country {country}</h1>
      <button onClick={() => navigate("/")} style={{"zIndex": 2, "position": "absolute"
    }}>Back</button>
      <DeckGL
        initialViewState={{longitude, latitude, zoom: 4}}
        controller={true}
        layers={[layer, points]}
        />
    </div>
  )

}






export default Countries;