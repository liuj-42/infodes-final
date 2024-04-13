import { useMemo, Fragment } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
// import letterFrequency, { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom } from '@visx/axis';
import { Text } from '@visx/text';



const outbreakStats = [{'country': 'NGA', 'outbreaks': 140}, {'country': 'GIN', 'outbreaks': 8}, {'country': 'TZA', 'outbreaks': 38}, {'country': 'UGA', 'outbreaks': 10}, {'country': 'ZMB', 'outbreaks': 2}, {'country': 'SSD', 'outbreaks': 31}, {'country': 'BEN', 'outbreaks': 7}, {'country': 'KEN', 'outbreaks': 16}, {'country': 'CIV', 'outbreaks': 3}, {'country': 'MLI', 'outbreaks': 3}, {'country': 'COG', 'outbreaks': 3}, {'country': 'NER', 'outbreaks': 24}, {'country': 'NAM', 'outbreaks': 1}, {'country': 'COD', 'outbreaks': 292}, {'country': 'SOM', 'outbreaks': 4}, {'country': 'ZWE', 'outbreaks': 2}, {'country': 'SLE', 'outbreaks': 30}, {'country': 'GHA', 'outbreaks': 10}, {'country': 'MOZ', 'outbreaks': 1}, {'country': 'GNB', 'outbreaks': 2}, {'country': 'TCD', 'outbreaks': 28}, {'country': 'MWI', 'outbreaks': 13}, {'country': 'AGO', 'outbreaks': 1}, {'country': 'ETH', 'outbreaks': 248}, {'country': 'CMR', 'outbreaks': 82}];
outbreakStats.sort((a, b) => b.outbreaks - a.outbreaks)
const topCountries = outbreakStats.slice(0, 10);
const verticalMargin = 120;

// accessors
const getCountry = (d) => d.country;
const getCountryOutbreaks = (d) => d.outbreaks;

function ContinentStats() {
  const height = 500;
  const width = 500;

  const xMax = width;
  const yMax = height - verticalMargin;

  const xScale = useMemo(
    () => 
    scaleBand({
      range: [0, xMax],
      domain: topCountries.map(getCountry),
      padding: 0.4,
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

  return (
    <svg width={width + 100} height={height}>
      <Group top={verticalMargin / 2}>
        {topCountries.map((d) => {
          const country = getCountry(d);
          const barHeight = xScale.bandwidth();
          const barWidth = yMax - (yScale(getCountryOutbreaks(d)) ?? 0);
          const barY = xScale(country);
          const barX = 100;

          return (
            <Fragment key={d.country}>
              <Bar
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill="rgba(233, 75, 59, .5)"
              />
              <Text
                x={barX -5} // Adjust this value as needed
                y={barY + barHeight / 2}
                verticalAnchor="middle"
                textAnchor='end'
                fill="#FFF"
              >
                {country}
              </Text>
            </Fragment>
          );
        })}
      </Group>
    </svg>
  );

  return (<>
    <svg width={width} height={height}>
      {/* <GradientTealBlue id="teal" /> */}
      {/* <rect width={width} height={height} rx={14} fill="url(#teal)" /> */}
      <Group top={verticalMargin / 2}>

          {topCountries.map((d) => {
            const country = getCountry(d);
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(getCountryOutbreaks(d)) ?? 0);
            const barX = xScale(country);
            const barY = yMax - barHeight;

            return (
              <Fragment key={d.country}>
                <Bar
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="rgba(233, 75, 59, .5)"
                />
              </Fragment>
            )
          })}

      </Group>

      <AxisBottom
          hideAxisLine={true}
          hideTicks={true}
          top={yMax+60}
          scale={xScale}
          stroke="#fff"
          tickStroke="#fff"
          tickLabelProps={{
            fill: "#FFF",
            fontSize: 11,
            textAnchor: 'middle',
          }}
          tickClassName="tick-label"
        />
    </svg>


  </>)
}

export default ContinentStats;  