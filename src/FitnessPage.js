import React from 'react';
import CalendarComponent from './CalendarComponent';


function FitnessPage(){

    const titleStyle = {
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
    }

    return(
        <div className = "container">
            <h1 style={titleStyle}> View Open Dates for Fitness Appointment</h1>
            <CalendarComponent />
        </div>

    );
}

export default FitnessPage;