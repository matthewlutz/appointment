import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Login logic
        console.log('Username:', username, 'Password:', password);
        if (role === 'user'){
            //user logic
        }else if (role === 'service-provider'){
        // After login logic 
        }
    };

    return (
        <div className = "login-container">
            <div className = "login-card">
                <h2>Login</h2>
                <form className="login-form" onSubmit = {handleSubmit}>
                    <div>
                        <label>
                            Role:
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="login-input">
                                <option value="user">User</option>
                                <option value="serviceProvider">Service Provider</option>
                            </select>
                        </label>
                    </div>
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
            </div>
        </div>
    );
}

export default LoginPage;