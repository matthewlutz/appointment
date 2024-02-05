import React from 'react';
import logo from './common/logo.svg';
import './Main.css';
import {Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './common/LoginPage';
import HomePage from './common/HomePage';
import FitnessPage from './FitnessPage';
import MedicalPage from './MedicalPage';
import BeautyPage from './BeautyPage';
import RegistrationPage from './common/RegistrationPage';


function App() {   
  return (
    <BrowserRouter>
            <div>
                <div className="header">
                    <Link to='/' className="header-title">Appointment Booking System</Link>
                </div>

                <div className="nav-bar">
                    <Link to="/medical" className="medical" >Medical</Link>
                    <Link to="/beauty" className="beauty" >Beauty</Link>
                    <Link to="/fitness" className="fitness" >Fitness</Link>
                    <Link to="/login" state = {{role: 'service-provider'}} className="login">Login as Service Provider</Link>
                    <Link to="/login" state = {{role: 'user'}} className="login" >Login as User</Link>
                </div>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/fitness" element={<FitnessPage/>} />
                    <Route path="/medical" element={<MedicalPage/>} />
                    <Route path="/beauty" element={<BeautyPage/>} />
                    <Route path="/register" element={<RegistrationPage/>} />
                    
                </Routes>
            </div>
        </BrowserRouter>
  );
}


export default App;
