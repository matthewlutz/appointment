import React from 'react';
import {Link} from 'react-router-dom';
//import './styles/HomePage.css';


function HomePage(){
    return (
        <div className="min-h-screen ripple-background animated-background text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="mt-12 md:flex md:justify-center md:space-x-10 md:items-center">
                    <div className="md:w-1/2 text-center p-6">
                        <h2 className="text-2xl font-semibold mb-4">For Users</h2>
                        <p className="mb-6">Find and book appointments with the best service providers in medical, beauty, and fitness.</p>
                        <Link to="/register" state={{ role: 'user' }} className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">Get Started</Link>
                    </div>

                    <div className="md:w-1/2 text-center p-6 mt-10 md:mt-0">
                        <h2 className="text-2xl font-semibold mb-4">For Service Providers</h2>
                        <p className="mb-6">Join our network to connect with clients and grow your business.</p>
                        <Link to="/register" state={{role : 'service-provider'}} className="inline-block bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">Join Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;