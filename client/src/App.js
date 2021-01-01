import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavigationBar from './components/navbar.component';
import Userlist from './components/userlist.component';

function App(){
  return(
    <Router>
      <div className="container bg-dark">
        <NavigationBar />
        <br />
        <Route path="/userlist">
          <Userlist />
        </Route>
      </div>
    </Router>
  );
}

export default App;
