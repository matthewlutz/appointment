import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../authentication/Authenticator';
import { jwtDecode } from 'jwt-decode';

function AddAppointment(){
    const today = new Date().toISOString().split('T')[0];
    const navigate = useNavigate();
    const [date, setDate] = useState(today);
    const [time, setTime] = useState('');
    const [purpose, setPurpose] = useState('');
    const [businessId, setBusinessId] = useState('');


    useEffect(() => {
        const storedId = localStorage.getItem('businessId');
        if (storedId) {
            setBusinessId(storedId);
        }
        console.log(storedId);
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!businessId) {
            console.error('No businessId found for the current user');
            return;
        }


        try {
            const response = await fetch('http://localhost:3001/api/addAppointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, time, purpose, businessId }),
            });

            if (response.ok) {
                console.log('Appointment added successfully');
                navigate('/serviceDashboard');
            } else {
                // Handle request failure
                console.error('Failed to add appointment');
            }
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <button onClick={() => navigate(-1)} className="mb-5 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 ease-in-out">
                    ← Back
                </button>
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Add New Appointment</h2>
                
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose</label>
                    <textarea
                        id="purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    ></textarea>
                </div>

                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add Appointment
                </button>
            </form>
        </div>
    );

}


export default AddAppointment;