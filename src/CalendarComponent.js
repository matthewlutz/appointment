import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


function CalanderComponent(){

    return(
        <FullCalendar
            plugins = {[dayGridPlugin]}
            initialView='dayGridMonth'

        />
    );
}

export default CalanderComponent;