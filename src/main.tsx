import React from "react";
import App from "./App";
import "./index.css";
import ReactDOM from "react-dom/client";

// O BrowserRouter já está dentro de App.tsx — não deve haver mais de um.
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


