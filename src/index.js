import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";

import App from './app.js';
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initalState";
import reducer from "./context/reducer";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
);