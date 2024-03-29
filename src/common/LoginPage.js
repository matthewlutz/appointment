/*
This is for the login page and will be where the users log in
*/
import React, { useState, useEffect } from 'react';
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import { useAuth } from '../authentication/Authenticator';
import './styles/LoginPage.css';
import { jwtDecode } from "jwt-decode";
import { useUser } from '../authentication/userContext';

//import { use } from '../backend/appointment-express/regBackend';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const { login } = useAuth();
    const location = useLocation();
    const title = location.state?.role === 'service-provider' ? 'Login as Service Provider' : 'Login as User';
    const navigate = useNavigate();
    const { saveEmail } = useUser();
    const errorMsg = document.getElementById("ErrorMsg");

    
    useEffect(() => {
        setRole(location.state?.role || 'user');
    }, [location]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('E-mail:', email, 'Password:', password, 'Role:', role);
        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    role, 
                }),
            });

            const data = await response.json();
            console.log(data);
            const decodedToken = jwtDecode(data.token);
            console.log('decoded token: ', decodedToken);
            if(response.ok){
                console.log('Response ok:', data.message);
                login(decodedToken.userId, role);
                saveEmail(email);
                localStorage.setItem('businessId', decodedToken.businessId);
                localStorage.setItem('userEmail', email);
                if (role === 'service-provider') {
                    navigate('/service-providers/ServiceDashBoard'); // brings the service provider to the service provider dashboard
                } else if (role === 'user') {
                    navigate('/users/userDashboard'); // bring the user to the user dashboard 
                }
            }else{
                console.error('Login failed:', data.message);
                errorMsg.innerHTML = "Login failed";
            }
        }catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ripple-background">
            <div className="flex flex-col items-center w-full max-w-m m-4">
                <h2 className="text-center text-3xl font-extrabold text-white mb-6 whitesapce-nowrap">{title}</h2>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div id = "ErrorMsg"></div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email:
                            </label>
                        <input
                            id="username"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                            </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        </div>
                            <div className="flex items-center justify-between">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Login
                                </button>
                            </div>
                        </form>
                            <p className="text-center text-gray-600 text-s">
                                <Link to="/register" state={{role}} className="text-blue-500 hover:text-blue-800">
                                Don't have an account? Register
                                </Link>
                            </p>
                        </div>
                </div>
    );
}

export default LoginPage;