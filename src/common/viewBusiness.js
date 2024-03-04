import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingModal from './BookingModal';



function ViewBusiness() {
  let { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(''); // State to capture selected service type
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [appointmentSlots, setAppointmentSlots] = useState('');

  const handleBook =  async(bookingDetails) => {
    console.log('Booking details:', bookingDetails);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/api/business-view/${businessId}`)
      .then(res => res.json())
      .then(data => setBusiness(data))
      .catch(err => console.error("Failed to fetch business details:", err));

    fetch(`http://localhost:3001/api/appointmentSlots/${businessId}`)
    .then(res => res.json())
    .then(slotsData => {
      setAppointmentSlots(slotsData);
     })
     .catch(err => console.error("Failed to fetch appointment slots:", err));
  }, [businessId]);

  const handleBook = async(details) => {
    console.log('Booking details:', details);
    setBookingDetails(details);
  }

  

  // Example services - replace with actual services from your backend
  const services = ['Service'];

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
        <div>
          <h3 className="text-xl font-semibold mb-2">About the Business</h3>
          <p className="text-gray-700 mb-4">{business.businessDescription}</p>
          {/* Services Section */}
          <div className="mb-4">
            <h4 className="font-semibold">Services:</h4>
            {services.map((service, index) => (
              <button key={index} onClick={() => setSelectedServiceType(service)} className="block text-left p-2 w-full text-gray-700 hover:bg-gray-100">
                {service}
              </button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200">Book an Appointment</button>
          <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBook={handleBook} businessId={businessId}/>
        </div>
      </div>
      {isModalOpen && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onBook={handleBook}
          businessId={businessId}
          selectedServiceType={selectedServiceType} // Pass the selected service type to BookingModal
        />
      )}
      {bookingDetails && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 border-t-2 border-gray-200">
          <h4 className="text-lg font-semibold">Appointment Details</h4>
          <ul>
            <li><strong>Date:</strong> {bookingDetails.date}</li>
            <li><strong>Time:</strong> {bookingDetails.time}</li>
            <li><strong>Service:</strong> {bookingDetails.serviceType || selectedServiceType}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewBusiness;
