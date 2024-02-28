import React, { useState } from 'react';
import { useAuth } from './../Authenticator';
import { useNavigate } from 'react-router-dom';

function BookingModal ({isOpen, onClose, onBook, businessId}){
    const today = new Date().toISOString().split('T')[0];
    const [date, setDate] = useState(today);
    const [time, setTime] = useState('');
    const navigate = useNavigate();
    
    const {user} = useAuth();
    const userId = user;
    console.log('id: ', userId);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const appointmentDetails = {
          userId,
          businessId, 
          appointmentStart: `${date}T${time}:00.000Z`, 
          appointmentEnd: `${date}T${time}:00.000Z` //need to add start ti8me plus appmt duration
        };

        try{
          const response = await fetch('http://localhost:3001/api/book-appointment', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentDetails),
          })
          const data = await response.json();

          if(response.ok){
            onBook(data);
            onClose();
          }else{
            console.log("booking failed: ", data.message);
          }
        }catch (error){
          console.error('There was a problem with the fetch operation:', error.message);
        }

        onBook({ date, time });
        onClose(); 
    };

    if(!isOpen){
        return null;
    }
    
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <h3 className="text-lg font-semibold">Book an Appointment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today} // Set the min attribute to today's date
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                name="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 border rounded-md">Cancel</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md">Book</button>
            </div>
          </form>
        </div>
      </div>
    );

}

export default BookingModal;