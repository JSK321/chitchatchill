import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from 'react'
// import API from './utils/API'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar'
import ChatBox from './components/ChatBox'

function App() {
  return (
    <Router>
      <NavBar />

      <Switch>
        <Route exact path="/">
          <ChatBox />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
