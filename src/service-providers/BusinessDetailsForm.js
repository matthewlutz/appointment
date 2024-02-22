import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

//import { Form } from 'react-router-dom';


function BusinessDetailsForm() {

    const [businessName, setBusinessName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [appointmentDuration, setAppointmentDuration] = useState('');
    const [appointmentPrice, setAppointmentPrice] = useState('');
    const [businessAddress, setBusinessAddress] = useState('');
    const [file, setFile] = useState(''); // For images
    const [businessDescription, setBusinessDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');

        const data = {
            businessName,
            serviceType,
            appointmentDuration,
            appointmentPrice,
            businessAddress,
            businessDescription,
            email,
            phone,
            website,
        };

        try{
            const response = await fetch('http://localhost:3001/api/business-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log("data sent: ", data);
            navigate('/service-providers/serviceDashBoard');
            if (!response.ok) throw new Error('Network response was not ok.');

        }catch (error){
            console.log("error sending form: ", error);
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Business Registration</h2>
            
            <div className="mb-4">
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
                <input type="text" id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>

            <div className="mb-4">
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
                <select id="serviceType" value={serviceType} onChange={(e) => setServiceType(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
                    <option value="Medical">Medical</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Beauty">Beauty</option>
                </select>            
            </div>

            <div className="mb-4">
                <label htmlFor="appointmentDuration"  className="block text-sm font-medium text-gray-700">Appointment Duration</label>
                <input type="text" id="appointmentDuration" value={appointmentDuration} onChange={(e) => setAppointmentDuration(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>

            <div className="mb-4">
                <label htmlFor="appointmentPrice" className="block text-sm font-medium text-gray-700">Appointment Price</label>
                <input type="text" id="appointmentPrice" value={appointmentPrice} onChange={(e) => setAppointmentPrice(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>

            <div className="mb-4">
                <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700">Business Address</label>
                <input type="text" id="businessAddress" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>

            <div className="mb-4">
                <label htmlFor="businessDescription" className="block text-sm font-medium text-gray-700">Business Description</label>
                <textarea id="businessDescription" value={businessDescription} onChange={(e) => setBusinessDescription(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="text" pattern="\d{10}" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>

            <div className="mb-4">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700">Website</label>
                <input type="text" pattern="https?://.*" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} required className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>

            <div className="mb-4">
                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input type="file" id="file" onChange={(e) => setFile(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
            </div>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
            </button>
        </form>
    </div>  
    );
}

export default BusinessDetailsForm;