import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import BookingModal from './BookingModal';


function ViewBusiness() {
  //onst location = useLocation();
  //const business = location.state?.business;
  let { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [appointmentSlots, setAppointmentSlots] = useState('');

  const handleBook =  async(bookingDetails) => {
    console.log('Booking details:', bookingDetails);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/business-view/${businessId}`)
      .then(res => res.json())
      .then(data => {
        // Assuming the backend returns the business details directly
        setBusiness(data);
      })
      .catch(err => console.error("Failed to fetch business details:", err));

    fetch(`http://localhost:3001/api/appointmentSlots/${businessId}`)
    .then(res => res.json())
    .then(slotsData => {
      setAppointmentSlots(slotsData);
     })
     .catch(err => console.error("Failed to fetch appointment slots:", err));
  }, [businessId]);

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-xl rounded-xl">
      <button onClick={() => navigate(-1)} className="mb-5 bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300">
        ← Back
      </button>
      <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">{business.businessName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="overflow-hidden rounded-lg">
          <img src={business.image || 'default-image-url.jpg'} alt={business.businessName} className="w-full h-full object-cover object-center transition duration-300 ease-in-out transform hover:scale-105" />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">About the Business</h3>
            <p className="text-gray-700 mb-4">{business.businessDescription}</p>
            <ul className="text-gray-700 space-y-2">
              <li><strong>Service Type:</strong> {business.serviceType}</li>
              <li><strong>Duration:</strong> {business.appointmentDuration}</li>
              <li><strong>Price:</strong> ${business.appointmentPrice}</li>
              <li><strong>Address:</strong> {business.businessAddress}</li>
              <li><strong>Email:</strong> {business.email}</li>
              <li><strong>Phone:</strong> {business.phone}</li>
              <li><strong>Website:</strong> <a href={business.website} className="text-blue-500 hover:text-blue-700 transition duration-300" target="_blank" rel="noopener noreferrer">{business.website}</a></li>
            </ul>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="self-start bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500">Book an Appointment</button>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Available Appointment Slots</h3>
        {appointmentSlots.length > 0 ? (
          <ul className="space-y-4">
            {appointmentSlots.map((slot) => (
              <li key={slot.id} className="p-4 bg-gray-50 rounded-md shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800"><strong>Start:</strong> {slot.appointmentStart}</p>
                    <p className="font-medium text-gray-600"><strong>For:</strong> {slot.Purpose}</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Book Slot
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No available slots.</p>
        )}
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBook={handleBook} businessId={businessId}/>
    </div>
  );
}

export default ViewBusiness;