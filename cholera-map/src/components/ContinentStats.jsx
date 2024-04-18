import { useMemo, Fragment } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
// import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisTop, AxisLeft } from '@visx/axis';
import { Text } from '@visx/text';

import "./ContinentStats.css";

const outbreakStats = [{'country': 'NGA', 'outbreaks': 140}, {'country': 'GIN', 'outbreaks': 8}, {'country': 'TZA', 'outbreaks': 38}, {'country': 'UGA', 'outbreaks': 10}, {'country': 'ZMB', 'outbreaks': 2}, {'country': 'SSD', 'outbreaks': 31}, {'country': 'BEN', 'outbreaks': 7}, {'country': 'KEN', 'outbreaks': 16}, {'country': 'CIV', 'outbreaks': 3}, {'country': 'MLI', 'outbreaks': 3}, {'country': 'COG', 'outbreaks': 3}, {'country': 'NER', 'outbreaks': 24}, {'country': 'NAM', 'outbreaks': 1}, {'country': 'COD', 'outbreaks': 292}, {'country': 'SOM', 'outbreaks': 4}, {'country': 'ZWE', 'outbreaks': 2}, {'country': 'SLE', 'outbreaks': 30}, {'country': 'GHA', 'outbreaks': 10}, {'country': 'MOZ', 'outbreaks': 1}, {'country': 'GNB', 'outbreaks': 2}, {'country': 'TCD', 'outbreaks': 28}, {'country': 'MWI', 'outbreaks': 13}, {'country': 'AGO', 'outbreaks': 1}, {'country': 'ETH', 'outbreaks': 248}, {'country': 'CMR', 'outbreaks': 82}];
outbreakStats.sort((a, b) => b.outbreaks - a.outbreaks)
const topCountries = outbreakStats.slice(0, 5);
const verticalMargin = 120;

const mappings = {
  "COD": "Democratic Republic of the Congo",
  "ETH": "Ethiopia",
  "NGA": "Nigeria",
  "CMR": "Cameroon",
  "TZA": "Tanzania"
}


import {outbreaks} from "../../public/outbreaks.json"

// accessors
const getCountry = (d) => d.country;
const getCountryOutbreaks = (d) => d.outbreaks;

function ContinentStats() {
  const height = 700;
  const width = 300;

  const xMax = width;
  const yMax = height - verticalMargin;

  const xScale = useMemo(
    () => 
    scaleBand({
      range: [0, xMax],
      domain: topCountries.map(getCountry),
      padding: 0.3,
    }),
    [xMax]
  )

  const yScale = useMemo(
    () => 
    scaleLinear({
      range: [yMax, 0],
      domain: [0, Math.max(...topCountries.map(getCountryOutbreaks))],
    }),
    [yMax]
  )

  function handleMouseEnter(e, ISO3) {
    e.target.style.fill = "#fc2e1c";
    document.getElementById("country-label").innerHTML = `
    <div>
      <h2>${mappings[ISO3]} (${ISO3})</h2>
      <h3>Population: 123</h3>
      <h3>Cholera cases: 123</h3>
      <h3>Cholera outbreaks: ${outbreaks[ISO3].length} </h3>
    </div>
    `
  }

  function handleMouseLeave(e, feature) {
    e.target.style.fill = "rgba(233, 75, 59, .5)"
  }

  return (

    <div
      className="continent-stats"
    >
      <h1>Top 5 countries with most cholera outbreaks</h1>
      <svg 
        width={height+50} 
        height={width}
        className="continent-stats-svg"
      >
        <Group>

          {topCountries.map((d) => {
            const country = getCountry(d);
            const barHeight = xScale.bandwidth();
            const barWidth = yMax - (yScale(getCountryOutbreaks(d)) ?? 0);

            const barY = xScale(country);
            const barX = 75;
            return (
              <Fragment key={d.country}>
                <Bar
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="rgba(233, 75, 59, .5)"
                  onMouseEnter={(e)=>{handleMouseEnter(e, d.country)}}
                  onMouseLeave={(e)=>{handleMouseLeave(e, d.country)}}
                  rx={8}
                />
                <Text
                  x={barX -5} // Adjust this value as needed
                  y={barY + barHeight / 2}
                  verticalAnchor="middle"
                  textAnchor='end'
                  
                >
                  {country}
                </Text>
                <Text
                  x={barX + barWidth + 5} // Position the label at the end of the bar
                  y={barY + barHeight / 2}
                  verticalAnchor="middle"
                  textAnchor="start" // Align the text to the start, i.e., left
                  
                >
                  {getCountryOutbreaks(d)} 
                </Text>
              </Fragment>
            );
          })}
        </Group>
        <Text
          x={0}
          y={0}
          dx={10} // Adjust this value as needed
          dy={220} // Adjust this value as needed
          verticalAnchor="start"
          textAnchor="start"
          transform="rotate(-90)"
          
        >
          Country Abbreviation
        </Text>

      </svg>
      <hr style={{"width": "100%"}}/>
      <div id="country-label"></div>
    </div>
  );

}

export default ContinentStats;