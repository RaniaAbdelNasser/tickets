import React,{ useReducer, createContext } from "react";

import ticketInitialStatus from "./initialStatus/ticketInitialStatus";

import tickets from "./reducers/tickets";

export const GlobalContext = createContext({});
export const GlobalProvider = ({ children }) => {

  const [ticketsState, ticketsDispatch] = useReducer(tickets, ticketInitialStatus);


  return (
    <GlobalContext.Provider
      value={{
        ticketsState,
        ticketsDispatch,
      
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
