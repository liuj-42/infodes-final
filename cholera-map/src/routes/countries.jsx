
import { useLocation } from 'react-router-dom';


function Countries() {

  let location = useLocation();

  let country = location.pathname.split("/")[2];

  console.log("location:")

  console.log(location)

  console.log("country:")

  console.log(country)
  return (
    <div>
      <h1>Countries {country}</h1>
    </div>
  );
}






export default Countries;