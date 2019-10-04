import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import AdminPage from './pages/admin';
import Loader from './components/loader';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={HomePage}></Route>
        <Route path='/login' component={LoginPage}></Route>
        <Route path='/admin' component={AdminPage}></Route>
      </div>
      <Loader></Loader>
    </Router>
  );
}

export default App;
