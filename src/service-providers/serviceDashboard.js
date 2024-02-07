//Dashboard service providers are brought to after logging in. 

import React, {useState, useEffect} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
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
        <div className="flex h-screen">
            {/* Sidebar/dashboard */}
            <div className="w-1/5 min-h-screen bg-gray-800 p-5 border-r border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-100 mb-5">Dashboard</h2>
                <button className="text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Home
                </button>
                <button className="text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Appointments
                </button>
                <button className="text-left w-full text-white font-semibold rounded py-2 px-4 mb-3 bg-purple-500 hover:bg-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    Services
                </button>
                {/* Add more buttons as needed */}
            </div>

            {/* Main content */}
            <div className="w-4/5 p-5">
                <h2 className="text-2xl font-semibold mb-5">Welcome, {name}</h2>
                <h2 className="text-xl font-semibold mb-5">Today's Appointments</h2>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridDay"
                    slotMinTime="09:00:00"
                    slotMaxTime="17:00:00"
                    height="auto"
                    slotDuration="00:30:00"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridDay,dayGridWeek,dayGridMonth'
                    }}
                    allDaySlot={false}
                    expandRows={true}
                    stickyHeaderDates={true}
                    themeSystem='bootstrap' 
                    
                />
            </div>
        </div>
    );

}

export default ServiceDashboard;