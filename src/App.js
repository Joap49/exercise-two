import React from 'react';
import { BrowserRouter as Router, Switch, Router } from 'react-router-dom';
import './App.css';

import Home from "./containers/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
        <Home />
      </Switch>
    </Router>
  );
}

export default App;
