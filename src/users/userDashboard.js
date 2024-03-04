//Page that the users are brought to after logging in 


import React from 'react';
import { useNavigate } from 'react-router-dom';




function UserDashboard() {
    const navigate = useNavigate();

    const goToBusinessesPage = () => {
        navigate('/common/businesses');
    }

    const goToAppointments = () => {
        navigate('./userAppointment');
    }

    return (
        <div className="flex h-screen items-center justify-center flex-col">
            <h2 className="text-xl font-semibold mb-4">User Dashboard</h2>
            <button
                onClick={goToBusinessesPage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                View Businesses
            </button>
            <button
                onClick={goToAppointments}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                View Appointments
            </button>
        </div>
    );
}

export default UserDashboard;