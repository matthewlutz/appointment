import React from 'react';
import CalendarComponent from './CalendarComponent';


function FitnessPage(){


    return(
        <div className = "container">
            <h1> View Open Dates for Fitness Appointment</h1>
            <CalendarComponent />
        </div>

    );
}

export default FitnessPage;