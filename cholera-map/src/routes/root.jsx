import { Outlet } from "react-router-dom";

import "./root.css";


export default function Root() {
    return (
      <>
        <div id="main">
            <div id="header">
                <h1>Cholera Cases Visualizer</h1>
                <h2>Some description over here...</h2>
            </div>
            <Outlet/>
        </div>
      </>
    );
  }