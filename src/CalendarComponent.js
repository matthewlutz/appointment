import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import DayModal from './DayModal';


function CalanderComponent(){
    //Use reacts hooks to manage states/events
    const [modalOpen, setModalOpen] = useState(false); //Modal closed by default
    const [selectedDate, setSelectedDate] = useState(null); //No date selected by default

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setModalOpen(true);
    }

    //Function to close the modal
    const closeModal= () => {
        setModalOpen(false);
    }

    return(
        <div>
            <FullCalendar
                plugins = {[dayGridPlugin]}
                initialView='dayGridMonth'
                dateClick = {handleDateClick}
            />
            <DayModal isOpen={modalOpen} onClose={closeModal}>
                <h2>Schedule for {selectedDate}</h2>
            </DayModal>
        </div>
    );
}

export default CalanderComponent;