
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


function App() {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = () => {
    fetch('/api/tickets')
      .then((res) => res.json())
      .then((data) => setTickets(data.tickets))
      .catch((error) => console.log('Error fetching tickets', error));
  };
  console.log(tickets);
  return (
    <GlobalProvider>
      <Router>
        <Routes>

          <Route exact path="/" element={<TicketsView />} />
          {/* <Route exact path="/signup" element={SignUpContainer} /> */}
          <Route element={<GenericNotFound />} />

        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
