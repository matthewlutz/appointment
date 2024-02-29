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
//import UsersList from './admin/UsersList';
import BusinessDetailsForm from './service-providers/BusinessDetailsForm';
import ServiceDashboard from './service-providers/serviceDashboard';
import { AuthProvider, useAuth } from './Authenticator';
import LogoutModal from './common/LogoutModal';
import ServiceSettings from './service-providers/serviceSettings';
import AppointmentTrends from './service-providers/appointentTrends';
import AppointmentHistory from './service-providers/AppointmentHistory';
import ViewAppointments from './service-providers/viewServiceAppointments';
import UserDashboard from './users/userDashboard';
import BusinessPage from './common/businesses';
import ViewBusiness from './common/viewBusiness';
import Hours from './service-providers/serviceHours';
import { UserProvider } from './userContext';
import ViewUserAppointments from './users/ViewUserAppointments'

function NavBar() {
  const {user, usersRole, logout} = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate('/');
    setIsLogoutModalOpen(false);
  }; //added async-may need to go back

  const handleCancel = async () => {
    setIsLogoutModalOpen(false);
  };

  console.log(`User Role: ${usersRole}`);

  return(
    <>
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to='/' className="text-3xl font-bold text-black hover:text-blue-600 transition duration-300">Appointment Booking System</Link>
          <div className="hidden md:flex space-x-4">
            {/*<Link to="/users" className='text-black hover:text-blue-600 transition duration-300'>Users List</Link>*/}

            {user ? (
              <>
                {/* logged in */}
                <span className="text-black">{user.name}</span>

                {usersRole === 'service-provider' ? (
                  <Link to="/service-providers/serviceDashboard" className="text-black hover:text-blue-600 transition duration-300">Dashboard</Link>
                ) : usersRole === 'user' ? (
                  <Link to="/users/userDashboard" className="text-black hover:text-blue-600 transition duration-300">Dashboard</Link>
                ) : null}
                {usersRole === 'service-provider' ? (
                  {/*<Link to="service-provider/ViewServiceAppointments" className="text-black hover:text-blue-600 transition duration-300">View Appointments</Link>*/}
                ) : usersRole === 'user' ? (
                  <Link to="users/ViewUserAppointments" className="text-black hover:text-blue-600 transition duration-300">View Appointments</Link>
                  ) : null}
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
    <UserProvider>
    <BrowserRouter>
      <NavBar /> {/* Use the NavBar component */}
      <Routes>
        <Route path="/service-providers/serviceHours" element={<Hours />} />
        <Route path="/common/viewBusiness/:businessId" element={<ViewBusiness />} />
        <Route path="/common/businesses" element={<BusinessPage />} />
        <Route path="/users/userDashboard" element={<UserDashboard />} />
        {/*<Route path="/service-providers/viewServiceAppointments" element={<ViewAppointments />} /> */}
        <Route path="/service-providers/AppointmentHistory" element={<AppointmentHistory />} />
        <Route path="/service-providers/appointmentTrends" element={<AppointmentTrends />} />
        <Route path="/service-providers/serviceSettings" element={<ServiceSettings />} />
        <Route path="/service-providers/serviceDashBoard" element={<ServiceDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/service-providers/BusinessDetailsForm" element={<BusinessDetailsForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/fitness" element={<FitnessPage />} />
        <Route path="/medical" element={<MedicalPage />} />
        <Route path="/beauty" element={<BeautyPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/*<Route path="/users" element={<UsersList/>}/>*/}
        <Route path="/businesses" element={<BusinessPage />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  </AuthProvider>
  );
}


export default App;
