
import { useLocation, useNavigate} from 'react-router-dom';

import DeckGL from "@deck.gl/react";
import { GeoJsonLayer, ScatterplotLayer } from "@deck.gl/layers";
import geojsonData from "../assets/afr_g2014_2013_0.json";

import * as turf from "@turf/turf"

// import outbreaks from "../../public/outbreaks.json";

import { useAtom } from 'jotai';
import { outbreakAtom } from '../state/state';
import ExponentialLegend from './ExponentialLegend';

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



function CountryMap({country}) {
  const [outbreaks,] = useAtom(outbreakAtom);
  console.log(outbreaks)
  const navigate = useNavigate();

  // let location = useLocation();
  // let country = location.pathname.split("/")[2];


  const countryOutbreaks = outbreaks[country]
  console.log(countryOutbreaks)

  countryOutbreaks.sort((a, b) => b.total_suspected_cases - a.total_suspected_cases)
  console.log(countryOutbreaks)

  const maxCases = countryOutbreaks[0].total_suspected_cases

  function getColor(numCases) {
    const a = Math.sqrt(maxCases + 1);
    const b = Math.sqrt(numCases);
    return colors[Math.floor(b / a * 7)];
  }

  function getRadius(cases) {
    // base this off of the max cases
    // max size should be 100000 px
    return cases / maxCases * 100000
  }


  // parse geojson file to get only the country that matches the country code
  const countryGeoJson = geojsonData.features.filter((feature) => feature.properties.ISO3 === country)[0];

  const centroid = turf.centroid(countryGeoJson);
  const [longitude, latitude] = centroid.geometry.coordinates;


  // #e4f1e1,#b4d9cc,#89c0b6,#63a6a0,#448c8a,#287274,#0d585f

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
    opacity: 0.25,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 5,
    // radiusMaxPixels: 10000,
    lineWidthMinPixels: 1,
    getPosition: d => [d.longitude, d.latitude],
    getRadius: d => getRadius(d.total_suspected_cases),
    getFillColor: d => getColor(d.total_suspected_cases),
    onClick: (info) => {
      console.log(info.object.total_suspected_cases)
      console.log(info)
      // navigate to outbreak page
    },
    
    
  });


  return (
    <div>
      <h1>Country {country}</h1>

      <DeckGL
        initialViewState={{longitude, latitude, zoom: 4}}
        controller={true}
        layers={[layer, points]}
        width="50%"
        height="80%"
        style={{"border": "1px solid red", "top": "10%", "left": "50%"}}
        />
        <ExponentialLegend colors={colors} max={maxCases} units="cases"/>
    </div>
  )

}






export default CountryMap;