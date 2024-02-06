import React, { useState, useEffect } from 'react';
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom';
import './styles/LoginPage.css';
//import { use } from '../backend/appointment-express/regBackend';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const location = useLocation();
    const title = location.state?.role === 'service-provider' ? 'Login as Service Provider' : 'Login as User';
    const navigate = useNavigate();

    //console.log(location.state);
    useEffect(() => {
        //console.log("Role from state:", location.state?.role);
        setRole(location.state?.role || 'user');
    }, [location]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Login logic
        console.log('Username:', username, 'Password:', password, 'Role:', role);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    role, 
                }),
            });

            const data = await response.json();
            if(response.ok){
                console.log('Login Succesful:', data.message);
                navigate('/service-providers/serviceDashBoard')// Redirect to dashboard
            
            }else{
                console.error('Login failed:', data.message);
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
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username:
                            </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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