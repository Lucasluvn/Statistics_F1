import React from "react";
import App from "./App";
import "./index.css";
// importaçoes do React Router
import {BrowserRouter} from "react-router-dom";
import ReactDOM from "react-dom/client";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


