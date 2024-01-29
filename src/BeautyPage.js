import React from 'react';
import CalendarComponent from './CalendarComponent';


function BeautyPage (){

    const titleStyle = {
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif'
    }

    return(
        <div className="container">
            <h1 style={titleStyle}> View Open Dates for Beauty Appointment</h1>
            <CalendarComponent />
            
        </div>


    );
}

export default BeautyPage;