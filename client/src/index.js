import React from "react";
import reactDOM from "react-dom";
import App from "./App";
import { AppContextProvider } from "./context/AppContext";

reactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
