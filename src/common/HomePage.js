import React from 'react';
import {Link} from 'react-router-dom';
import './HomePage.css';


function HomePage(){
    return (
        <div className="main-page">
            <div className="left-section">
                <h2>For Users</h2>
                <p>Find and book appointments with the best service providers in medical, beauty, and fitness.</p>
                <Link to="/userLogin" className="get-started-button">Get Started</Link>
                
            </div>

            <div className="right-section">
                <h2>For Service Providers</h2>
                <p>Join our network to connect with clients and grow your business.</p>
                <Link to="/serviceLogin" className="get-started-button">Join Us</Link>
                
            </div>
        </div>
    );
}

export default HomePage;