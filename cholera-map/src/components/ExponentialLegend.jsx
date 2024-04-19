import "./legend.css"


export default function ExponentialLegend({ colors, max, units}) {

  return (<div className="legend">
        {colors.map((color, index) => {
          const floor = Math.ceil((Math.sqrt(max)/7 * index)**2);
          const ceil = Math.ceil((Math.sqrt(max)/7 * (index + 1))**2);
          return (
            <div key={index} className="legend-row">
              <div
                style={{
                  background: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  width: "20px",
                  height: "20px",
                  margin: "5px",
                }}
              ></div>
              <p>{floor + (index == 0 ? 0 : 1)} - {ceil} {units? units : ""}</p>
            </div>
          );
        } )}
      </div>)
}