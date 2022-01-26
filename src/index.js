import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MyRoutes from "./MyRoutes";

ReactDOM.render(
  <React.StrictMode>
    <MyRoutes />
  </React.StrictMode>,
  document.getElementById("root")
);
