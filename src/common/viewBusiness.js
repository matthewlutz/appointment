import React, { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';

function ViewBusiness() {
  //onst location = useLocation();
  //const business = location.state?.business;
  let { businessId } = useParams();
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/business-view/${businessId}`)
      .then(res => res.json())
      .then(data => {
        // Assuming the backend returns the business details directly
        setBusiness(data);
      })
      .catch(err => console.error("Failed to fetch business details:", err));
  }, [businessId]);

  if (!business) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">{business.businessName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={business.image || 'default-image-url.jpg'} alt={business.businessName} className="w-full h-auto rounded-lg" />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">About the Business</h3>
          <p className="text-gray-700 mb-4">{business.businessDescription}</p>
          <ul className="text-gray-700">
            <li><strong>Service Type:</strong> {business.serviceType}</li>
            <li><strong>Duration:</strong> {business.appointmentDuration}</li>
            <li><strong>Price:</strong> ${business.appointmentPrice}</li>
            <li><strong>Address:</strong> {business.businessAddress}</li>
            <li><strong>Email:</strong> {business.email}</li>
            <li><strong>Phone:</strong> {business.phone}</li>
            <li><strong>Website:</strong> <a href={business.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{business.website}</a></li>
          </ul>
          {/* Button or link to book an appointment */}
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200" >Book an Appointment</button>
        </div>
      </div>
    </div>
  );
}

export default ViewBusiness;