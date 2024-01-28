import React from 'react';
import logo from './logo.svg';
import './Main.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {   
  return (
    <Router>
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
                    <Route path="/login" component={LoginPage} />
                    {/*define more routes as needed */}
                </Switch>

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
        </Router>
  );
}

export default App;
