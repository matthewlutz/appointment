import React, {useState} from 'react';
import { Form } from 'react-router-dom';


function BusinessDetailsForm() {

    const { businessName, setBusinessName } = useState('');
    const { serviceType, setServiceType } = useState('');
    const {appointmentDuration, setAppointmentDuration} = useState('');
    const {appointmentPrice, setAppointmentPrice} = useState('');
    const {businessAddress, setBusinessAddress} = useState('');
    const {file, setFile} = useState(''); //for images
    const {businessDescription, setBusinessDescription} = useState('');
    const {email, setEmail} = useState('');
    const {phone, setPhone} = useState('');
    const {website, setWebsite} = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
    }


    return (
        <form onSubmit={handleSubmit} className="business-details-form">
            <div>
                <label>
                    Business Name:
                    <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Service Type:
                    <input type="text" value={serviceType} onChange={(e) => setServiceType(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Appointment Duration:
                    <input type="text" value={appointmentDuration} onChange={(e) => setAppointmentDuration(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Appointment Price:
                    <input type="text" value={appointmentPrice} onChange={(e) => setAppointmentPrice(e.target.value)} />
                </label>   
            </div>
            <div>
                <label>
                    Business Address:
                    <input type="text" value={businessAddress} onChange={(e) => setBusinessAddress(e.target.value)} />
                </label>    
            </div>
            <div>
                <label>
                    Business Description:
                    <input type="text" value={businessDescription} onChange={(e) => setBusinessDescription(e.target.value)} />
                </label>   
            </div>
            <div>
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>   
            </div>
            <div>
                <label>
                    Phone:
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Website:
                    <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Upload Image:
                    <input type="file" value={file} onChange={(e) => setFile(e.target.value)} />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>       
    );
}

export default BusinessDetailsForm;