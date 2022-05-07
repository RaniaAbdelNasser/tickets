
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useHistory,
} from "react-router-dom";
import { GenericNotFound } from "./containers/generaticNotFound";
import { GlobalProvider } from "./context/Provider";
import TicketsView from "./containers/ticket/TicketsView";

import './App.css';
import CreateTicket from './containers/ticket/CreateTicket';
import ViewEditTicket from './containers/ticket/ViewEditTicket';


function App() {

 
  return (
    <GlobalProvider>
      <Router>
        <Routes>

          <Route exact path="/" element={<TicketsView />} />
          <Route exact path="/createTicket" element={<CreateTicket/>} />
          <Route exact path="/viewTicket/:idTicket" element={<ViewEditTicket/>} />
          <Route element={<GenericNotFound />} />

        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
