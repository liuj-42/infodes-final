import { useAtom } from "jotai";
import { outbreakAtom } from "../state/state";

import "../CountryStats.css";

const mappings = { "COG": "Democratic Republic of the Congo", 
"ZMB": "Zambia", 
"MLI": "Mali", 
"ETH": "Ethiopia", 
"BEN": "Benin", 
"COD": "Democratic Republic of the Congo", 
"NGA": "Nigeria", 
"GNB": "Guinea-Bissau", 
"ZWE": "Zimbabwe", 
"SSD": "South Sudan", 
"CMR": "Cameroon", 
"CIV": "C�te d'Ivoire", 
"SLE": "Sierra Leone", 
"MOZ": "Mozambique", 
"UGA": "Uganda", 
"GHA": "Ghana", 
"KEN": "Kenya", 
"NER": "Niger", 
"MWI": "Malawi", 
"TCD": "Chad", 
"NAM": "Namibia", 
"TZA": "United Republic of Tanzania", 
"GIN": "Guinea", 
"SOM": "Somalia", 
"AGO": "Angola"
}


function showOptions() {
  console.log('ueah')
  document.getElementById("filter-dropdown").classList.toggle("show");
}


function CountryStats({ country }) {
  const [outbreaks] = useAtom(outbreakAtom);

  const countryOutbreaks = outbreaks[country];

  // countryOutbreaks.sort((a, b) => { return new Date(b.start_date) - new Date(a.start_date) });
  countryOutbreaks.sort((a, b) => {
    return (
      new Date(b.total_suspected_cases) - new Date(a.total_suspected_cases)
    );
  });

  console.log(countryOutbreaks);

  return (
    <>
      <div id="outbreaks-sidebar">
        <div id="outbreaks-filter">
          <span id="filter-title">outbreaks in {mappings[country]}</span>
          <span style={{ "flex-grow": "1" }}></span>
          <button id="filter-button" onClick={() => {showOptions}}>
            <span className="material-symbols-outlined">sort</span>
            <span>Sort Outbreaks</span>
          </button>
          <div id="filter-dropdown" className="filter-item">
            <button>Start Date</button>
            <button>End Date</button>
            <button>Total Suspected Cases</button>
          </div>

        </div>
        {Object.entries(countryOutbreaks).map(([key, outbreak], index) => {
          return (
            <div key={index} className="outbreak-card" onClick={()=> {console.log(outbreak.location);console.log(outbreak.outbreak_number)}}>
              <div className="card-top">
                <h3>Outbreak {index + 1} </h3>
                <span style={{ "flex-grow": "1" }}></span>
                <p>
                  ({outbreak.start_date} - {outbreak.end_date})
                </p>
              </div>
              <div>
                <p>{outbreak.total_suspected_cases} suspected cases</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CountryStats;
