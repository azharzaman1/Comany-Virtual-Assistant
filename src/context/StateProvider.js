import React, { useContext, createContext, useReducer } from "react";

const CreatedContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  return (
    <CreatedContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </CreatedContext.Provider>
  );
};

export const useStateValue = () => useContext(CreatedContext);
