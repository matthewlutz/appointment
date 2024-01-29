import React from 'react';

function HomePage(){
    return (
        <div className="container">
            <div id="medical" className="category">
                <h2>Medical Appointment</h2>
                <p>Book medical appointments here</p>
            </div>

            <div id="beauty" className="category">
                <h2>Beauty Services</h2>
                <p>Book beauty services here.</p>
            </div>

            <div id="fitness" className="category">
                <h2>Fitness Sessions</h2>
                <p>Book fitness sessions here.</p>
            </div>
        </div>
    );
}

export default HomePage;