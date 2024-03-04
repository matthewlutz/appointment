import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Hours(){
    const navigate = useNavigate();
    const initialHours = {
        monday: { start: '09:00', end: '17:00', closed: false },
        tuesday: { start: '09:00', end: '17:00', closed: false },
        wednesday: { start: '09:00', end: '17:00', closed: false },
        thursday: { start: '09:00', end: '17:00', closed: false },
        friday: { start: '09:00', end: '17:00', closed: false },
        saturday: { start: '09:00', end: '17:00', closed: false },
        sunday: { start: '09:00', end: '17:00', closed: false },
    }

    const [hours, setHours] = useState(initialHours);

    const handleTimeChange = (day, startOrEnd, value) => {
        setHours(prevHours => ({
            ...prevHours,
            [day]: {
                ...prevHours[day],
                [startOrEnd]: value,
            },
        }));
    }

    const handleDayOffToggle = (day) => {
        setHours(prevHours => ({
            ...prevHours,
            [day]: {
                ...prevHours[day],
                closed: !prevHours[day].closed,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const adjustedHours = Object.fromEntries(
            Object.entries(hours).map(([day, { start, end, closed }]) => [
                day,
                { start: closed ? null : start, end: closed ? null : end, closed },
            ])
        );
        console.log(adjustedHours);
        try{
            const response = await fetch('http://localhost:3001/api/hours', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify({ businessId: yourBusinessId, hours: adjustedHours })
            });

            const data = await response.json();
            if (response.ok){
                console.log('hours entered successfully: ', data);
            }else{
                console.log('hours failed to connect');
            }   
        }catch (error){
            console.log("error connecting to hours: ", error);
        }
        navigate('/serviceDashboard');
    }

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return (
        <div className="min-h-screen ripple-background animated-background py-10">
            <div className="container max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                    <button onClick={() => navigate(-1)} className="mb-5 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200 ease-in-out">
                        ← Back
                    </button>
                    <h1 className="text-xl font-semibold leading-tight text-gray-900">Business Hours</h1>
                    <p className="mt-1 text-sm text-gray-600">Set the hours during which your business will be open.</p>

                    <form className="mt-6">
                        <div className="space-y-6 bg-gray-50 p-4 rounded-md">
                            {daysOfWeek.map(day => (
                                <div key={day} className="flex items-center justify-between">
                                    <label htmlFor={`${day}-checkbox`} className="flex items-center">
                                        <input
                                            id={`${day}-checkbox`}
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-600"
                                            checked={!hours[day].closed}
                                            onChange={() => handleDayOffToggle(day)}
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-700">
                                            {day.charAt(0).toUpperCase() + day.slice(1)}
                                        </span>
                                    </label>
                                    <div className="flex items-center">
                                        <input
                                            type="time"
                                            className="form-input block w-full sm:text-sm sm:leading-5"
                                            value={hours[day].start}
                                            onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                                            disabled={hours[day].closed}
                                        />
                                        <span className="mx-3 text-sm text-gray-500">to</span>
                                        <input
                                            type="time"
                                            className="form-input block w-full sm:text-sm sm:leading-5"
                                            value={hours[day].end}
                                            onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                                            disabled={hours[day].closed}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Save Business Hours
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default Hours;