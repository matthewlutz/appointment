import React from 'react';
import logo from './logo.svg';
import './Main.css';
import { BrowserRouter as Route, Link, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

function Main() {   
  return (
    <BrowserRouter>
            <div>
                <div className="header">
                    <h1>Appointment Booking System</h1>
                </div>

                <div className="nav-bar">
                    <Link to="/medical">Medical</Link>
                    <Link to="/beauty">Beauty</Link>
                    <Link to="/fitness">Fitness</Link>
                    <Link to="/login" className="login">Login</Link>
                </div>

                <Switch>
                    <Route path="/login" component={LoginPage}/>
                   
                </Switch>

                <div className="container">
                    <div id="medical" className="category">
                        <h2>Medical Appointments</h2>
                        <p>Book medical appointments here.</p>
                    </div>

                    <div id="beauty" className="category">
                        <h2>Beauty Services</h2>
                        <p>Book beauty serrrvices here.</p>
                    </div>

                    <div id="fitness" className="category">
                        <h2>Fitness Sessions</h2>
                        <p>Book fitness sessions here.</p>
                    </div>
                </div>
            </div>
        </BrowserRouter>
  );
}


export default Main;
