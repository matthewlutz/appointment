import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import DayModal from './DayModal';
import './Cal.css';


function CalenderComponent(){
    //Use reacts hooks to manage states/events
    const [modalOpen, setModalOpen] = useState(false); //Modal closed by default
    const [selectedDate, setSelectedDate] = useState(null); //No date selected by default

    const handleDateClick = (arg) => {
        console.log("Clicked date:", arg.dateStr); 
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
                className="custom-calendar"
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView='timeGridWeek'
                slotMinTime="09:00:00"
                slotMaxTime="17:00:00"
                allDaySlot={false}
                dateClick={handleDateClick}
                height="auto"
                headerToolbar={{
                  center: 'dayGridMonth,timeGridWeek'
                }}
                buttonText={{
                  dayGridMonth: 'Monthly View ',
                  timeGridWeek: 'Weekly View'
                }}
                views={{
                  dayGridMonth: {
                    //month view
                    titleFormat: { year: 'numeric', month: 'long' },
                  },
                  timeGridWeek: {
                    // week view
                    slotDuration: '00:30:00',
                    slotLabelFormat: {
                      hour: 'numeric',
                      minute: '2-digit',
                      omitZeroMinute: false,
                      //meridiem: 'short'
                    },
                    businessHours: {
                      // Define business hours for week view
                      startTime: '07:00', 
                      endTime: '19:00', 
                    },
                    
                  }
                }}

            />


            <DayModal isOpen={modalOpen} onClose={closeModal}>
                <h2>Schedule for {selectedDate}</h2>
            </DayModal>
        </div>
    );
}

export default CalenderComponent;