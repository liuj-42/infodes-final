import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root";
import Countries from "./routes/countries";
import Continent from './routes/continent.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Continent />,
      },
      {
        path: "/countries/:country",
        element: <Countries />,
      },
      {
        path: "/countries/:country/outbreaks/:outbreak",
        element: <div>outbreak info here</div>
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
