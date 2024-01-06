import React, { createContext, useContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
);

const StoreProvider = () => useContext(AppContext);

export default StoreProvider;
