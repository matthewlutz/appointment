import React from 'react';
import CalendarComponent from './CalendarComponent';


function MedicalPage (){
    
    const titleStyle = {
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
    }

    return(
        <div className="container">
            <h1 style={titleStyle}> View Open Dates for Medical Appointment</h1>
            <CalendarComponent />
            
        </div>


    );
}

export default MedicalPage;