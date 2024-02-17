import React, {useState} from 'react';
import './index.css';
import logo from './common/logo.svg';
import './Main.css';
import {Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './common/LoginPage';
import HomePage from './common/HomePage';
import FitnessPage from './FitnessPage';
import MedicalPage from './MedicalPage';
import BeautyPage from './BeautyPage';
import RegistrationPage from './common/RegistrationPage';
import BusinessDetailsForm from './service-providers/BusinessDetailsForm';
import ServiceDashboard from './service-providers/serviceDashboard';
import { AuthProvider, useAuth } from './Authenticator';
import LogoutModal from './common/LogoutModal'
import ServiceSettings from './service-providers/serviceSettings';
import AppointmentTrends from './service-providers/appointentTrends';
import AppointmentHistory from './service-providers/AppointmentHistory';


function NavBar() {
  const {user, logout} = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  console.log(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    logout();
    setIsLogoutModalOpen(false);
  };

  const handleCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return(
    <>
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to='/' className="text-3xl font-bold text-black hover:text-blue-600 transition duration-300">Appointment Booking System</Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/medical" className="text-black hover:text-blue-600 transition duration-300">Medical</Link>
            <Link to="/beauty" className="text-black hover:text-blue-600 transition duration-300">Beauty</Link>
            <Link to="/fitness" className="text-black hover:text-blue-600 transition duration-300">Fitness</Link>

            {user ? (
              <>
                {/* logged in */}
                <span className="text-black">{user.name}</span>
                <Link to="/serviceProviders/serviceDashboard" className="text-black hover:text-blue-600 transition duration-300">Dashboard</Link>
                <Link to="/notifications" className="text-black hover:text-blue-600 transition duration-300">Notifications</Link>
                <button onClick={() => setIsLogoutModalOpen(true)} className="text-black hover:text-blue-600 transition duration-300">Logout</button>
                
              </>
            ) : (
              <>
                {/*not logged in*/}
                <Link to="/login" state={{ role: 'service-provider' }} className="text-black hover:text-blue-600 transition duration-300">Login as Service Provider</Link>
                <Link to="/login" state={{ role: 'user' }} className="text-black hover:text-blue-600 transition duration-300">Login as User</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
    <LogoutModal 
      isOpen={isLogoutModalOpen} 
      onClose={handleCancel} 
      onConfirm={handleLogout} 
    />
    </>
  );
}

function App() {   
  return (
    <AuthProvider>
    <BrowserRouter>
      <NavBar /> {/* Use the NavBar component */}
      <Routes>
        <Route path="service-provider/AppointmentHistory" element={<AppointmentHistory />} />
        <Route path="service-provider/appointmentTrends" element={<AppointmentTrends />} />
        <Route path="service-provider/serviceSettings" element={<ServiceSettings />} />
        <Route path="/service-providers/serviceDashBoard" element={<ServiceDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/service-providers/BusinessDetailsForm" element={<BusinessDetailsForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fitness" element={<FitnessPage />} />
        <Route path="/medical" element={<MedicalPage />} />
        <Route path="/beauty" element={<BeautyPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
}


export default App;
