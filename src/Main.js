import React from 'react';
import logo from './logo.svg';
import './Main.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {   
  return (
    <div>
      <div className="header">
        <h1>Appointment Booking System</h1>
      </div>

      <div className="nav-bar">
        <a href="#medical">Medical</a>
        <a href="#beauty">Beauty</a>
        <a href="#fitness">Fitness</a>
        <Link to="/login" className="login">Login</Link>
      </div>

      <div className="container">
        <div id="medical" className="category">
          <h2>Medical Appointments</h2>
          <p>Book medical appointments here.</p>
        </div>

        <div id="beauty" className="category">
          <h2>Beauty Services</h2>
          <p>Book beauty services here.</p>
        </div>

        <div id="fitness" className="category">
          <h2>Fitness Sessions</h2>
          <p>Book fitness sessions here.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
