import CountryMap from "../components/CountryMap";
import CountryStats from "../components/CountryStats";
import { useLocation, useNavigate } from "react-router-dom";


export default function Countries() {

  const location = useLocation();
  const navigate = useNavigate();

  let country = location.pathname.split("/")[2];

  return (
    <div>
      <button onClick={() => navigate("/")} style={{"zIndex": 2, "position": "absolute"
    }}>Back</button>
      <CountryStats country={country}/>
      <CountryMap country={country}/>
    </div>
  );
};