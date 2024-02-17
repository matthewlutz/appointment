//Dashboard service providers are brought to after logging in. 

import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import { Link } from 'react-router-dom';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import './../index.css'; 

function ServiceDashboard() {
    const [name, setName] = useState('');
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const response = await fetch('/api/service-provider/profile', {
                    method: 'GET',
                    headers: {
                      // Include authorization header if needed (e.g., bearer token)
                      'Authorization': 'Bearer your_token_here',
                    },
                  });

                  if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                  }

                  const data = await response.json();
                  setName(data.name);
            }catch (error){
                console.error('Failed to fetch profile:', error);
            }
        };
        fetchProfile();
    }, []);



    return (
        <div className=" h-screen">
            {/* Sidebar/dashboard */}
            <div className="w-1/5 min-h-screen bg-gray-800 p-5 border-r border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-100 mb-5">Dashboard</h2>
                <button className="block text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-blue-700 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Home
                </button>
                <Link to='/service-providers/viewAppointments' className="block text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Appointments
                </Link>
                <button className="block text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-purple-500 hover:bg-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Edit Services
                </button>
                <Link to='/service-providers/AppointmentHistory' className="block text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Appointment History
                </Link>
                <Link to="/service-providers/appointmentTrends" className="block text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-blue-400 hover:bg-blue-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Analytics/Trends
                </Link>

                <Link to='/service-providers/serviceSettings' className="block text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-gray-400 hover:bg-gray-400 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Settings
                </Link>
            </div>


            {/* Main content */}
            <div className="w-4/5 p-5">
                <h2 className="text-2xl font-semibold mb-5">Welcome, {name}</h2>
                <h2 className="text-xl font-semibold mb-5">Today's Appointments</h2>
                <div className="w-full max-w-sm">
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridDay"
                    slotMinTime="09:00:00"
                    slotMaxTime="17:00:00"
                    height="auto"
                    slotDuration="00:30:00"
                    nowIndicator={true}
                    allDaySlot={false}
                    expandRows={true}
                    stickyHeaderDates={true}
                    themeSystem='bootstrap'                     
                />
                </div>
            </div>
        </div>
    );

}

export default ServiceDashboard;