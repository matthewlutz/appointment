import React, { useState, useEffect } from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';
import './styles/LoginPage.css';
//import { use } from '../backend/appointment-express/regBackend';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const location = useLocation

    useEffect(() => {
        setRole(location.state?.role || 'user');
    }, [location]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Login logic
        console.log('Username:', username, 'Password:', password);
        if (role === 'user'){
            //user logic
        }else if (role === 'service-provider'){
            //service provider logic
        }
    };

    return (
        <div className = "login-container">
            <div className = "login-card">
                <h2>Login</h2>
                <form className="login-form" onSubmit = {handleSubmit}>
                    <div>
                        <label>
                            Username: 
                            <input
                                type = "text"
                                value = {username}
                                onChange={(e) => setUsername(e.target.value)} 
                                className="login-input"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Password: 
                            <input
                                type="password"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                className="login-input"
                            />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className = "login-button">Login</button>
                    </div>
                </form>
                <div className="register-link">
                <Link to="/register" state={{role}}>Don't have an account? Register</Link>
            </div>
            </div>
        </div>
    );
}

export default LoginPage;