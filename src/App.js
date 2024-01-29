import React from 'react';
import logo from './logo.svg';
import './Main.css';
import {Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';

function App() {   
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

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    {/* other routes */}
                </Routes>
            </div>
        </BrowserRouter>
  );
}


export default App;
