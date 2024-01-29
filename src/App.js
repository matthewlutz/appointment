import React from 'react';
import logo from './logo.svg';
import './Main.css';
import {Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import FitnessPage from './FitnessPage';
import MedicalPage from './MedicalPage';
import BeautyPage from './BeautyPage';


function App() {   
  return (
    <BrowserRouter>
            <div>
                <div className="header">
                    <h1>Appointment Booking System</h1>
                </div>

                <div className="nav-bar">
                    <Link to="/medical" className="medical" >Medical</Link>
                    <Link to="/beauty" classsName="beauty" >Beauty</Link>
                    <Link to="/fitness" className="fitness" >Fitness</Link>
                    <Link to="/login" className="login" >Login</Link>
                </div>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/fitness" element={<FitnessPage/>} />
                    <Route path="/medical" element={<MedicalPage/>} />
                    <Route path="/beauty" element={<BeautyPage/>} />
                    
                    {/* other routes */}
                </Routes>
            </div>
        </BrowserRouter>
  );
}


export default App;
