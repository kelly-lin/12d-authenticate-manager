import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavigationBar from './components/navbar.component';
import UserList from './components/user-list.component';
import LogList from './components/log-list.component';
import PendingList from './components/pending-list.component';
// import Metrics from './components/metrics.component';

function App(){
  return(
    <Router>
      <div className="container bg-dark">
        <NavigationBar />
        <br />
        <Route path="/userlist">
          <UserList />
        </Route>
        <Route path="/pending">
          <PendingList />
        </Route>
        <Route path="/log" perPage={10}>
          <LogList />
        </Route>
        <Route path="/metrics">
          {/* <Metrics /> */}
        </Route>
      </div>
    </Router>
  );
}

export default App;
