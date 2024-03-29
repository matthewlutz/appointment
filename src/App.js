import React, {useState} from 'react';
import './css/index.css';
import logo from './common/logo.svg';
import './css/Main.css';
import {Route, Link, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './common/LoginPage';
import HomePage from './common/HomePage';
import RegistrationPage from './common/RegistrationPage';
//import UsersList from './admin/UsersList';
import BusinessDetailsForm from './service-providers/BusinessDetailsForm';
import ServiceDashboard from './service-providers/serviceDashboard';
import { AuthProvider, useAuth } from './authentication/Authenticator';
import LogoutModal from './common/LogoutModal';
import ServiceSettings from './service-providers/serviceSettings';
import AppointmentTrends from './service-providers/appointentTrends';
import AppointmentHistory from './service-providers/AppointmentHistory';
import ViewAppointments from './service-providers/viewServiceAppointments';
import UserDashboard from './users/userDashboard';
import BusinessPage from './common/businesses';
import ViewBusiness from './common/viewBusiness';
import Hours from './service-providers/serviceHours';
import { UserProvider } from './authentication/userContext';
//import ViewUserAppointments from './users/ViewUserAppointments'
import AddAppointment from './service-providers/addAppointment';

//This is the navbar which is shown at all times
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

//This method has all of the routing paths for the frontend
function App() {   
  return (
    <AuthProvider>
    <UserProvider>
    <BrowserRouter>
      <NavBar /> {/* Use the NavBar component */}
      <Routes>
        {/*<Route path="/users/ViewUserAppointments" element={<ViewUserAppointments />} />*/}
        <Route path="/service-providers/serviceHours" element={<Hours />} />
        <Route path="/common/viewBusiness/:businessId" element={<ViewBusiness />} />
        <Route path="/common/businesses" element={<BusinessPage />} />
        <Route path="/users/userDashboard" element={<UserDashboard />} />
        {/*<Route path="/service-providers/viewServiceAppointments" element={<ViewAppointments />} /> */}
        <Route path="/service-providers/addAppointment" element={<AddAppointment />} /> 
        <Route path="/service-providers/viewAppointments" element={<ViewAppointments />} /> 
        <Route path="/service-providers/AppointmentHistory" element={<AppointmentHistory />} />
        <Route path="/service-providers/appointmentTrends" element={<AppointmentTrends />} />
        <Route path="/service-providers/serviceSettings" element={<ServiceSettings />} />
        <Route path="/service-providers/serviceDashBoard" element={<ServiceDashboard />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/service-providers/BusinessDetailsForm" element={<BusinessDetailsForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/*<Route path="/users" element={<UsersList/>}/>*/}
        <Route path="/businesses" element={<BusinessPage />} />
        {/*<Route path="/users/ViewUserAppointments" element={<ViewUserAppointments/>}/>*/}
      </Routes>
    </BrowserRouter>
    </UserProvider>
  </AuthProvider>
  );
}


export default App;
