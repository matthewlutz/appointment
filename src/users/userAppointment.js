import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './../index.css';

function UserAppointment(){
    const [appointments, setAppointments] = useState([]);
    //const businessId = useParams();
    const [businessId, setBusinessid] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const storedId = localStorage.getItem('businessId');
        setBusinessid(storedId);
        console.log('busid:  ', businessId);
        const fetchAppointments = async () => {
            try{
                const response = await fetch('http://localhost:3001/api/appointments', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = await response.json();

                if(response.ok){
                    console.log("appointments successfully grabbed; ", data);
                    setAppointments(data);
                }else{
                    console.log("couldn't get appts");
                }
            }catch(error){
                console.log('error fetching: ', error);
            }
            
           
        }
        fetchAppointments();
    }, []);


    return(
            <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
                <button onClick={() => navigate(-1)} className="mb-5 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 ease-in-out">
                ← Back
            </button>
                <h1 className="text-2xl font-bold text-center mb-6">Your Appointments</h1>
                {appointments.length > 0 ? (
                    <ul>
                        {appointments.map((appointment) => (
                            <li key={appointment.id} className="mb-4 p-4 border-b border-gray-200">
                                <p><strong>Date:</strong> {appointment.date}</p>
                                <p><strong>Time:</strong> {appointment.time}</p>
                                <p><strong>Customer:</strong> {appointment.customerName}</p>
                                {/* Add more details as needed */}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No appointments found.</p>
                )}
            </div>
    );

}

export default UserAppointment;