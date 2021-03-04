import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import API from './utils/API'
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
    </Router>
  );
}

export default App;
