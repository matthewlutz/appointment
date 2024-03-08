import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import DayModal from './DayModal';
import './Cal.css';

// Define the Calendar component
function CalenderComponent(){
    //Use reacts hooks to manage states/events
    const [modalOpen, setModalOpen] = useState(false); //Modal closed by default
    const [selectedDate, setSelectedDate] = useState(null); //No date selected by default

    const handleDateClick = (arg) => {
        console.log("Clicked date:", arg.dateStr); // Log the clicked date
        setSelectedDate(arg.dateStr); // Update selected date
        setModalOpen(true); // Show the modal
    }

    
    //Function to close the modal
    const closeModal= () => {
        setModalOpen(false); // Hide the modal
    }
    

    return(
      <div>
          <FullCalendar 
              className="custom-calendar" // Custom class for styling
              plugins={[dayGridPlugin, timeGridPlugin]} // Plugins for day and time grid views
              initialView='timeGridWeek' // Default view when the calendar loads
              slotMinTime="09:00:00" // Minimum time displayed on the calendar
              slotMaxTime="17:00:00" // Maximum time displayed on the calendar
              allDaySlot={false} // Disable the all-day slot row
              dateClick={handleDateClick} // Function to handle date clicks
              height="auto" // Auto-adjust height based on content
              headerToolbar={{ // Custom toolbar configuration
                center: 'dayGridMonth,timeGridWeek' // Buttons for monthly and weekly views in the center
              }}
              buttonText={{ // Custom button text
                dayGridMonth: 'Monthly View ',
                timeGridWeek: 'Weekly View'
              }}
              views={{ // Custom views configuration
                dayGridMonth: { // Configuration for the month view
                  titleFormat: { year: 'numeric', month: 'long' },
                },
                timeGridWeek: { // Configuration for the week view
                  slotDuration: '00:30:00', // Duration of time slots
                  slotLabelFormat: { // Format for the slot labels
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                    //meridiem: 'short'
                  },
                  businessHours: { // Define business hours
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

export default CalenderComponent; // Export the CalendarComponent for use in other parts of the app
