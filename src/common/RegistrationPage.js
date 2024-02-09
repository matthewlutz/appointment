import React, {useState} from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import './styles/Registration.css';


function RegistrationPage (){
    const [showRegistration, setShowRegistration] = useState(false);
    const [regName, setName] = useState('');
    const [regEmail, setEmail] = useState('');
    const [regPassword, setPassword] = useState('');
    const [regConfirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const [role, setRole] = useState(location.state?.role || 'user'); 
    const navigate = useNavigate();
    const title = role === 'service-provider' ? 'Register as Service Provider' : 'Register as User';
    

    const emailRegex = /\S+@\S+\.\S+/ // email validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //password validation regex

    //validates the user entered valid forms of email and password
    const validateForm = () => {
        const registerErrorMsg = document.getElementById("registerErrorMsg")

        registerErrorMsg.innerHTML = "";
        registerErrorMsg.style.opacity = 0;
        
        if (!emailRegex.test(regEmail)) {
            //alert('Invalid email');
            registerErrorMsg.innerHTML = "Invalid Email"
            registerErrorMsg.style.opacity = 1;
            return false;
        }else if (!passwordRegex.test(regPassword)) {
            //alert('Password must contain at least 8 characters, including 1 letter and 1 number');
            registerErrorMsg.innerHTML = "Password must contain at least 8 characters, including 1 letter and 1 number"
            registerErrorMsg.style.opacity = 1;
            return false;
        }if (regPassword !== regConfirmPassword) {
            //alert('Passwords do not match');
            registerErrorMsg.innerHTML = "Passwords do not match"
            registerErrorMsg.style.opacity = 1;
            return false;
        }
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(!validateForm()) return;
        
        const userData = {
            name: regName,
            email: regEmail,
            password: regPassword,
            confirmPassword: regConfirmPassword,
            role,
        }
        try{
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if(response.ok){
                console.log(data.message + ' ' + data.role);
                if(role === 'service-provider'){
                    navigate('/service-providers/BusinessDetailsForm');
                }else if (role === 'user'){
                    navigate('/users/userDashboard');
                }
            }else{
                console.log(data.message);
            }
        }catch (error){
            console.log('Registration failed');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center">{title}</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div id="registerErrorMsg"></div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name:
                            <input
                                type="text"
                                value={regName}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email:
                            <input
                                type="email"
                                value={regEmail}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password:
                            <input
                                type="password"
                                value={regPassword}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Confirm Password:
                            <input
                                type="password"
                                value={regConfirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage
