import React from 'react';
import './index.css';
import logo from './common/logo.svg';
import './Main.css';
import {Route, Link, BrowserRouter, Routes } from 'react-router-dom';
import LoginPage from './common/LoginPage';
import HomePage from './common/HomePage';
import FitnessPage from './FitnessPage';
import MedicalPage from './MedicalPage';
import BeautyPage from './BeautyPage';
import RegistrationPage from './common/RegistrationPage';
import BusinessDetailsForm from './service-providers/BusinessDetailsForm';


function App() {   
  return (
    <BrowserRouter>
      <div>
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link to='/' className="text-3xl font-bold text-black hover:text-blue-600 transition duration-300">Appointment Booking System</Link>
              <div className="hidden md:flex space-x-4">
                <Link to="/medical" className="text-black hover:text-blue-600 transition duration-300">Medical</Link>
                <Link to="/beauty" className="text-black hover:text-blue-600 transition duration-300">Beauty</Link>
                <Link to="/fitness" className="text-black hover:text-blue-600 transition duration-300">Fitness</Link>
                <div className="flex-grow"></div> {/* pushes login buttons to the right */}
                <Link to="/login" state={{ role: 'service-provider' }} className="text-black hover:text-blue-600 transition duration-300 ">Login as Service Provider</Link>
                <Link to="/login" state={{ role: 'user' }} className="text-black hover:text-blue-600 transition duration-300">Login as User</Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service-providers/BusinessDetailsForm" element={<BusinessDetailsForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/fitness" element={<FitnessPage />} />
          <Route path="/medical" element={<MedicalPage />} />
          <Route path="/beauty" element={<BeautyPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          {/* Add additional routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
